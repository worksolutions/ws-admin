const moment = require("moment");
const { assoc } = require("ramda");

const { prepareUrl, makeProxy } = require("../../libs");
const { prepareArticleToFront } = require("../article/libs");
const matchStatusAndCode = require("./matches/matchStatusAndCode");
const matchCodeAndStatusForFront = require("./matches/matchCodeAndStatusForFront");
const matchCodeAndActions = require("./matches/matchCodeAndActions");

module.exports = (app) => {
  makeProxy(
    { realServerUrl: "/api/articles", expressMethodHandlerName: "get", handleUrl: "/api/articles/table" },
    app,
    {
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map((article) => ({
            id: article.id,
            announceImage: article.announceImage ? prepareUrl(article.announceImage.path) : null,
            name: {
              value: article.title,
              redirectReference: "/content/articles/" + article.id,
            },
            publishedAt: article.publishedAt ? moment.unix(article.publishedAt).format("DD MMMM YYYY") : "",
            status: matchCodeAndStatusForFront[article.status],
            actions: {
              type: "dropdown",
              list: [
                {
                  name: "Редактировать",
                  icon: "edit",
                  iconColor: "gray-blue/05",
                  action: {
                    type: "redirect",
                    options: {
                      reference: "/content/articles/" + article.id + "/edit",
                    },
                  },
                },
                matchCodeAndActions[article.status](article.id, "table"),
              ],
            },
          })),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
      modifyRequest: ({ requestParams: { params } }) => {
        let result = params;
        if (params.orderField === "publishedAt") result = assoc("orderField", "published_at", result);
        if (params.publishedAt)
          result = assoc("publishedAt", moment.utc(params.publishedAt, "DD.MM.YYYY").unix(), result);
        result = assoc("status", matchStatusAndCode[result.status], result);
        return { params: result };
      },
    },
  );

  makeProxy(
    { realServerUrl: "/api/articles", expressMethodHandlerName: "get", handleUrl: "/api/articles/simple-list" },
    app,
    {
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map(prepareArticleToFront),
          pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
        };
      },
      modifyRequest: ({ requestParams: { params } }) => {
        return { params: { ...params, orderDirection: "desc", orderField: "id" } };
      },
    },
  );
};
