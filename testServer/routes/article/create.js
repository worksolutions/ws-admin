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
      modifyResponse: async ({ data }) => ({ id: data.id }),
      modifyRequest: ({ data }) => {
        const newData = JSON.parse(data);
        newData.status = numbersByStatuses[newData.status];
        return { data: newData };
      },
      modifyError: (err) => {
        err.errors = convertServerErrorsToClientErrors(err.errors);
      },
    },
  );
};
