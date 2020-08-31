const axios = require("axios");
const moment = require("moment");

const { prepareUrl } = require("../../libs");

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

const statusesByNumber = {
  0: "UN_PUBLISHED",
  1: "PUBLISHED",
  2: "UN_PUBLISHED",
};

module.exports = {
  async modifyArticleResponse(data, originalRequestParams) {
    data.status = statusesByNumber[data.status];
    if (data.publishedAt) data.publishedAt = moment.unix(data.publishedAt).format("DD.MM.YYYY");
    if (data.author && data.author.image) data.author.image.path = prepareUrl(data.author.image.path);
    if (data.announceImage) data.announceImage.path = prepareUrl(data.announceImage.path);
    if (data.contentImage) data.contentImage.path = prepareUrl(data.contentImage.path);
    if (data.background) data.background.path = prepareUrl(data.background.path);

    if (!data.content) return data;

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
};
