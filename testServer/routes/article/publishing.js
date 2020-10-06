const axios = require("axios");
const { prop, omit, isNil, filter } = require("ramda");

const { makeProxy } = require("../../libs");

async function loadArticle(articleId, requestParams) {
  const {
    data: { data },
  } = await axios("/api/articles/" + articleId, {
    ...requestParams,
    method: "GET",
  });
  return filter((value) => !isNil(value), {
    ...omit(["createdBy", "updatedBy"], data),
    author: data.author?.id,
    tagDescription: data.tagDescription,
    category: data.category?.id,
    relatedArticles: data.relatedArticles?.map(prop("id")),
    contentImage: data.contentImage?.id,
    announceImage: data.announceImage?.id,
    background: data.background?.id,
    status: 1,
  });
}

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: () => "/api/articles/update",
      expressMethodHandlerName: "post",
      handleUrl: "/api/article/:articleId/publish",
    },
    app,
    {
      modifyRequest: async ({ urlParams, requestParams }) => {
        const article = await loadArticle(urlParams.articleId, requestParams);
        return {
          params: {},
          data: { ...article, status: 1 },
        };
      },
    },
  );
  makeProxy(
    {
      realServerUrl: () => "/api/articles/update",
      expressMethodHandlerName: "post",
      handleUrl: "/api/article/:articleId/unpublish",
    },
    app,
    {
      modifyRequest: async ({ urlParams, requestParams }) => {
        const article = await loadArticle(urlParams.articleId, requestParams);
        return {
          params: {},
          data: { ...article, status: 2 },
        };
      },
    },
  );
};