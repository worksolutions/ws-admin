const pageBuilder = require("../pageBuilder");

module.exports = function (url) {
  return {
    type: "Screen",
    options: {
      title: "Создание статьи",
      reference: `/content/create-${url}`,
    },
    blocks: [
      {
        type: "ContextInitializer",
        options: {
          static: [{ path: "screen:article", value: { status: "unpublished" } }],
          block: pageBuilder("screen:article", (body) => ({
            save: [
              {
                type: "api:request",
                options: {
                  reference: `/create-${url}`,
                  method: "post",
                  body,
                },
              },
              {
                type: "redirect",
                options: {
                  reference: `/content/${url}/{{local:inputData.id}}/edit`,
                },
              },
            ],
            close: {
              type: "redirect",
              options: {
                reference: `/content/${url}`,
              },
            },
          })),
        },
      },
    ],
  };
};
