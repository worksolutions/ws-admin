const { makeProxy } = require("../../libs");
const { modifyArticleResponse, modifyRelatedArticleResponse } = require("./libs");

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: (req) => "/api/articles/" + req.params.articleId,
      expressMethodHandlerName: "get",
      handleUrl: "/api/article/:articleId",
    },
    app,
    {
      modifyResponse: async ({ data }, { originalRequestParams }) => modifyArticleResponse(data, originalRequestParams),
    },
  );

  makeProxy(
    {
      realServerUrl: (req) => "/api/articles/" + req.params.articleId,
      expressMethodHandlerName: "get",
      handleUrl: "/api/article/:articleId/related-articles",
    },
    app,
    {
      modifyResponse: async ({ data }, { originalRequestParams }) =>
        modifyRelatedArticleResponse(data, originalRequestParams),
    },
  );
};
