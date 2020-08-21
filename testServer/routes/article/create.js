const { makeProxy, convertServerErrorsToClientErrors } = require("../../libs");

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
    {
      modifyResponse: async (...args) => {
        console.log(args);
        return null;
      },
      modifyRequest: ({ data }) => {
        data.status = numbersByStatuses[data.status];
        return { data };
      },
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    },
  );
};
