module.exports = {
  type: "Screen",
  options: {
    title: "Управление контентом",
    reference: "/content*",
  },
  blocks: [
    require("./secondaryMenu"),
    require("./articles"),
    require("./detailArticle"),
    require("./createArticle"),
    require("./categories"),
  ],
};
