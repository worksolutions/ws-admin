module.exports = {
  type: "Screen",
  options: {
    title: "Управление контентом",
    reference: "/content*",
  },
  blocks: [
    require("./secondaryMenu"),
    require("./articles"),
    require("./useful-articles"),
    require("./article/detailArticle"),
    require("./article/detailUsefulArticle"),
    require("./article/edit/create"),
    require("./article/edit/edit"),
    require("./article/edit/usefulEdit"),
    require("./categories"),
  ],
};
