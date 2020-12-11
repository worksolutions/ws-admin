const articlesPage = require("./articles/articlesPage");
const detailPageArticle = require("./articles/detailArticlePage");
const editArticlePage = require("./articles/editArticlePage");
const createArticlesPage = require("./articles/createArticlesPage");

module.exports = {
  type: "Screen",
  options: {
    title: "Управление контентом",
    reference: "/content*",
  },
  blocks: [
    require("./secondaryMenu"),
    require("./categories"),
    articlesPage("articles"),
    articlesPage("useful_articles"),
    detailPageArticle("articles"),
    detailPageArticle("useful_articles"),
    editArticlePage("articles"),
    editArticlePage("useful_articles"),
    createArticlesPage("articles"),
    createArticlesPage("useful_articles"),
  ],
};
