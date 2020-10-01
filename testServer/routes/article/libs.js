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

function convertImage(image) {
  image.path = prepareUrl(image.path);
  image.name = image.originalName + "." + image.path.split(".").pop();
  return image;
}

module.exports = {
  statusesByNumber,
  async modifyArticleResponse(data, originalRequestParams) {
    data.status = statusesByNumber[data.status];
    if (data.publishedAt) data.publishedAt = moment.unix(data.publishedAt).format("DD.MM.YYYY");
    if (data.author && data.author.image) data.author.image.path = prepareUrl(data.author.image.path);
    if (data.announceImage) data.announceImage = convertImage(data.announceImage);
    if (data.contentImage) data.contentImage = convertImage(data.contentImage);
    if (data.background) data.background = convertImage(data.background);
    if (data.relatedArticles) {
      const relatedArticles = await module.exports.modifyRelatedArticleResponse(data, originalRequestParams);
      data.relatedArticles = data.relatedArticles.map((article, index) => {
        const isPublished = statusesByNumber[article.status] === "PUBLISHED";
        const relatedArticle = relatedArticles[index];

        return {
          id: article.id,
          heading: moment.unix(article[isPublished ? "publishedAt" : "createdAt"]).format("DD MMMM YYYY"),
          statuses: [
            {
              icon: "badge",
              color: isPublished ? "green/05" : "orange/05",
              size: "SMALL",
            },
          ],
          title: article.title,
          image: relatedArticle.image,
          redirectReference: "/content/articles/" + article.id,
          actions: [],
        };
      });
    }

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
  async modifyRelatedArticleResponse(data, originalRequestParams) {
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
  prepareArticleToFront(article) {
    const isPublished = statusesByNumber[article.status] === "PUBLISHED";
    const result = {
      title: article.title,
      id: article.id,
      image: article.announceImage ? prepareUrl(article.announceImage.path) : null,
      redirectReference: "/content/articles/" + article.id,
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
      result.heading = moment.unix(article.publishedAt).format("DD MMMM YYYY");
      result.statuses = [{ icon: "badge", color: "green/05", size: "SMALL" }];
      // result.actions.push({ name: "Снять с публикации", icon: "bolt-alt", iconColor: "orange/05" });
    } else {
      result.heading = moment.unix(article.createdAt).format("DD MMMM YYYY");
      result.statuses = [{ icon: "badge", color: "orange/05", size: "SMALL" }];
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
              text: `Статья "{{local:title}}" успешно опубликована`,
            },
          },
        ],
      });
    }

    return result;
  },
};
