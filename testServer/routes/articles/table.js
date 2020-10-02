const moment = require("moment");
const { assoc } = require("ramda");

const { prepareUrl, makeProxy } = require("../../libs");
const { prepareArticleToFront } = require("../article/libs");
const matchStatusAndCode = require("./matchStatusAndCode");

module.exports = (app) => {
  makeProxy(
    { realServerUrl: "/api/articles", expressMethodHandlerName: "get", handleUrl: "/api/articles/table" },
    app,
    {
      modifyResponse: ({ data, meta }) => {
        return {
          list: data.map((article) => {
            const isPublished = article.status === 1;

            const result = {
              id: article.id,
              announceImage: article.announceImage ? prepareUrl(article.announceImage.path) : null,
              name: {
                value: article.title,
                redirectReference: "/content/articles/" + article.id,
              },
              publishedAt: article.publishedAt ? moment.unix(article.publishedAt).format("DD MMMM YYYY") : "",
              actions: [
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
              ],
            };

            if (isPublished) {
              result.status = {
                icon: {
                  color: "green/05",
                },
                value: "Опубликовано",
              };
              result.actions.push({
                name: "Снять с публикации",
                icon: "bolt-alt",
                iconColor: "orange/05",
                action: [
                  {
                    type: "api:request",
                    options: {
                      method: "post",
                      reference: "/article/" + article.id + "/unpublish",
                    },
                  },
                  {
                    type: "notify",
                    options: {
                      text: `Статья успешно снята с публикации`,
                    },
                  },
                  {
                    type: "force-data-source-reload",
                    options: {
                      id: `table`,
                    },
                  },
                ],
              });
            } else {
              result.status = {
                icon: {
                  color: "orange/05",
                },
                value: "Черновик",
              };
              result.actions.push({
                name: "Опубликовать",
                icon: "bolt-alt",
                iconColor: "green/05",
                action: [
                  {
                    type: "api:request",
                    options: {
                      method: "post",
                      reference: "/article/" + article.id + "/publish",
                    },
                  },
                  {
                    type: "notify",
                    options: {
                      text: `Статья успешно опубликована`,
                    },
                  },
                  {
                    type: "force-data-source-reload",
                    options: {
                      id: `table`,
                    },
                  },
                ],
              });
            }

            return result;
          }),
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
