const axios = require("axios");
const moment = require("moment");

const { makeProxy, prepareUrl } = require("../../libs");

const statusesByNumber = {
  0: "UN_PUBLISHED",
  1: "PUBLISHED",
  2: "UN_PUBLISHED",
};

module.exports = {
  article: (app) => {
    makeProxy(
      {
        realServerUrl: (req) => "/api/articles/" + req.params.articleId,
        expressMethodHandlerName: "get",
        handleUrl: "/api/article/:articleId",
      },
      app,
      {
        modifyResponse: async ({ data }, { originalRequestParams }) => {
          data.status = statusesByNumber[data.status];
          if (data.publishedAt) data.publishedAt = moment.unix(data.publishedAt).format("DD.MM.YYYY");
          if (data.author && data.author.image) data.author.image.path = prepareUrl(data.author.image.path);
          if (data.announceImage) data.announceImage.path = prepareUrl(data.announceImage.path);
          if (data.contentImage) data.contentImage.path = prepareUrl(data.contentImage.path);
          if (data.background) data.background.path = prepareUrl(data.background.path);

          data.content = data.content.replace(/\/storage/g, prepareUrl("/storage"));

          const articles = await getSubArticlesContent(data.content, (code) => {
            return axios("/api/blog/article/" + code, originalRequestParams);
          });

          const articlesData = articles.map((article) => article.data.data);

          let index = 0;

          data.content = data.content.replace(/#article:[\w-_]+#/g, () => {
            const article = articlesData[index];
            index++;
            return `#text-enhancer:ReadMore:${JSON.stringify({
              image: article.announceImageUrl ? prepareUrl(article.announceImageUrl) : null,
              imageAspectRatio: 1.6,
              text: article.title,
              reference: prepareUrl(`/blog/${article.code}`),
            })}#`;
          });
        },
      },
    );
  },
  relatedArticles: (app) => {
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
  },
};

async function getSubArticlesContent(text, getArticle) {
  const articleMatch = text.match(/#article:[\w-_]+#/g);
  if (!articleMatch) return [];

  return await Promise.all(
    articleMatch.map((match) => {
      const articleCodeText = match.split("#")[1];
      return getArticle(articleCodeText.split(":")[1]);
    }),
  );
}
