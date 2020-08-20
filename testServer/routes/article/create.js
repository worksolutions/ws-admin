const { makeProxy } = require("../../libs");

const numbersByStatuses = {
  UN_PUBLISHED: 0,
  PUBLISHED: 1,
};

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: () => "/api/articles/store",
      expressMethodHandlerName: "post",
      handleUrl: "/api/create-article",
    },
    app,
    async (...args) => {
      console.log(args);
      return null;
    },
    ({ data }) => {
      data.status = numbersByStatuses[data.status];
      return { data };
    },
  );
};
