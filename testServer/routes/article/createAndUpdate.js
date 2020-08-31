const moment = require("moment");
const { makeProxy, convertServerErrorsToClientErrors } = require("../../libs");
const { modifyArticleResponse } = require("./libs");

const numbersByStatuses = {
  UN_PUBLISHED: 0,
  PUBLISHED: 1,
};

function modifyRequest(data) {
  const newData = JSON.parse(data);
  newData.status = numbersByStatuses[newData.status];
  if (newData.publishedAt) newData.publishedAt = moment(newData.publishedAt, "DD.MM.YYYY").unix();
  return newData;
}

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: (req) => "/api/articles/" + req.params.articleId,
      expressMethodHandlerName: "get",
      handleUrl: "/api/article/:articleId/edit",
    },
    app,
    {
      modifyResponse: async ({ data }, { originalRequestParams }) => {
        const article = await modifyArticleResponse(data, originalRequestParams);
        if (article.category) {
          article.category = article.category.id;
        }
        if (article.author) {
          article.author = article.author.id;
        }
        return article;
      },
    },
  );
  makeProxy(
    {
      realServerUrl: () => "/api/articles/store",
      expressMethodHandlerName: "post",
      handleUrl: "/api/create-article",
    },
    app,
    {
      modifyResponse: async ({ data }) => ({ id: data.id }),
      modifyRequest: ({ data }) => {
        return { data: modifyRequest(data) };
      },
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    },
  );
  makeProxy(
    {
      realServerUrl: () => "/api/articles/update",
      expressMethodHandlerName: "post",
      handleUrl: "/api/save-article",
    },
    app,
    {
      modifyResponse: async ({ data }) => null,
      modifyRequest: ({ data }) => {
        return { data: modifyRequest(data) };
      },
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    },
  );
};
