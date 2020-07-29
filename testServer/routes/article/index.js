const moment = require("moment");

const { makeProxy, prepareUrl } = require("../../libs");

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
      data.status = {
        title: status.title,
        badgeColor: status.color,
      };

      if (data.publishedAt) data.publishedAt = moment.unix(data.publishedAt).format("DD.MM.YYYY");
      if (data.author && data.author.image) data.author.image.path = prepareUrl(data.author.image.path);
      if (data.announceImage) data.announceImage.path = prepareUrl(data.announceImage.path);
      if (data.contentImage) data.contentImage.path = prepareUrl(data.contentImage.path);
      if (data.background) data.background.path = prepareUrl(data.background.path);
      return data;
    },
  );
};
