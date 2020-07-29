const { makeProxy } = require("../../libs");

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
    ({ data }) => {
      const status = statusesByNumber[data.status];
      return {
        ...data,
        status: {
          title: status.title,
          badgeColor: status.color,
        },
      };
    },
  );
};
