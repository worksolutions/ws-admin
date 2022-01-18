const articlesPage = require("./articles/articlesPage");
const detailPageArticle = require("./articles/detailArticlePage");
const editUsefulArticlePage = require("./articles/editUsefulArticlePage");
const editArticlePage = require("./articles/editArticlePage");
const createArticlesPage = require("./articles/createArticlesPage");
const createUsefulArticlesPage = require("./articles/createUsefulArticlesPage");

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
    editUsefulArticlePage("useful_articles"),
    createArticlesPage("articles"),
    createUsefulArticlesPage("useful_articles"),
  ],
};
