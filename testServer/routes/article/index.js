const axios = require("axios");
const moment = require("moment");

const { makeProxy, prepareUrl } = require("../../libs");
const { modifyArticleResponse } = require("./libs");

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: (req) => "/api/articles/" + req.params.articleId,
      expressMethodHandlerName: "get",
      handleUrl: "/api/article/:articleId",
    },
    app,
    {
      modifyResponse: async ({ data }, { originalRequestParams }) => {
        return await modifyArticleResponse(data, originalRequestParams);
      },
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
      modifyResponse: async ({ data }, { originalRequestParams }) => {
        const articles = await Promise.all(
          data.relatedArticles.map((article) => axios("/api/blog/article/" + article.code, originalRequestParams)),
        );
        return articles
          .map((article) => article.data.data)
          .map((article) => {
            const isPublished = article.status === 1;
            const result = {
              title: article.title,
              id: article.id,
              image: article.announceImageUrl ? prepareUrl(article.announceImageUrl) : null,
              redirectReference: "/content/articles/" + article.id,
            };

            if (isPublished) {
              result.heading = moment.unix(article.publishedAt).format("DD MMMM YYYY");
              result.statuses = [{ icon: "badge", color: "green/05", size: "SMALL" }];
            } else {
              result.heading = moment.unix(article.createdAt).format("DD MMMM YYYY");
              result.statuses = [{ icon: "badge", color: "orange/05", size: "SMALL" }];
            }

            return result;
          });
      },
    },
  );
};
