const moment = require("moment");
const { prop } = require("ramda");
const ramda = require("ramda");
const { makeProxy, convertServerErrorsToClientErrors } = require("../../libs");
const { modifyArticleResponse, parseContentWithReadAlsoEnhancers } = require("./libs");

const API_HOST = process.env.DEV_API_HOST;
const numbersByStatuses = {
  DRAFT: 0,
  PUBLISHED: 1,
  UN_PUBLISHED: 2,
};

function modifyRequest(data) {
  data.status = numbersByStatuses[data.status];
  if (data.publishedAt) data.publishedAt = moment(data.publishedAt, "DD.MM.YYYY").unix();
  if (data.keywords) data.keywords = data.keywords.map(prop("title")).join(", ");
  if (data.relatedArticles) data.relatedArticles = data.relatedArticles.map(prop("id"));
  return data;
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
        if (article.keywords) {
          article.keywords = article.keywords.split(", ").map((code) => ({ code, title: code }));
        }
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
      modifyRequest: ({ requestParams: { data } }) => {
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
      modifyRequest: ({ requestParams: { data } }) => {
        return { data: modifyRequest(data) };
      },
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    },
  );

  app.post("/api/content/articles/:articleId/convert-enhancers", async (req, res) => {
    const { content } = req.body;
    if (!content) res.end("");
    const enhancedContent = await parseContentWithReadAlsoEnhancers(content, {
      method: "GET",
      baseURL: API_HOST,
      params: req.query,
      data: req.body,
      headers: {
        ...ramda.omit(["host"], req.headers),
        origin: API_HOST,
      },
    });
    res.end(enhancedContent);
  });
};
