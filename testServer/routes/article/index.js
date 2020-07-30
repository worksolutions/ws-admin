const axios = require("axios");
const moment = require("moment");

const { makeProxy, prepareUrl } = require("../../libs");

const statusesByNumber = {
  0: {
    color: "orange/05",
    title: "Не опубликовано",
  },
  1: {
    color: "green/05",
    title: "Опубликовано",
  },
  2: {
    color: "orange/05",
    title: "Не опубликовано",
  },
};

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: (req) => {
        return "/api/articles/" + req.params.articleId;
      },
      expressMethodHandlerName: "get",
      handleUrl: "/api/article/:articleId",
    },
    app,
    async ({ data }, { originalRequestParams }) => {
      const status = statusesByNumber[data.status];
      data.status = {
        title: status.title,
        badgeColor: status.color,
      };

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

      return data;
    },
  );
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
