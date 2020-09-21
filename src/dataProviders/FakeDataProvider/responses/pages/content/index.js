module.exports = {
  type: "Screen",
  options: {
    title: "Управление контентом",
    reference: "/content*",
  },
  blocks: [
    require("./secondaryMenu"),
    require("./articles"),
    require("./article/detailArticle"),
    require("./article/edit/create"),
    require("./article/edit/edit"),
    require("./categories"),
  ],
};
