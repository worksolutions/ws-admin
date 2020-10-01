const { assoc } = require("ramda");
const moment = require("moment");

const { makeProxy } = require("../../libs");
const { prepareArticleToFront } = require("../article/libs");
const matchStatusAndCode = require("./matchStatusAndCode");

module.exports = (app) => {
  makeProxy(
    { realServerUrl: "/api/articles", expressMethodHandlerName: "get", handleUrl: "/api/articles/cards" },
    app,
    {
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map(prepareArticleToFront),
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
};
