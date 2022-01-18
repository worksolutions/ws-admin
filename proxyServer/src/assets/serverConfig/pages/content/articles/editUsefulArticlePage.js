const pageBuilder = require("../pageBuilder");

module.exports = function (url) {
  return {
    type: "Screen",
    options: {
      title: "Редактирование статьи",
      reference: `/content/${url}/:articleId/edit`,
    },
    blocks: [
      {
        type: "ContextInitializer",
        dataSource: {
          type: "api:request",
          options: {
            reference: `/${url}/{{screen:articleId}}/edit`,
            method: "get",
          },
          contextPath: "screen:article",
        },
        options: {
          block: pageBuilder("screen:article", [`screen:article.title`, `screen:article.code`], (body) => ({
            save: [
              {
                type: "api:request",
                options: {
                  reference: `/save-${url}`,
                  method: "post",
                  body,
                },
              },
            ],
            close: {
              type: "redirect",
              options: {
                reference: `/content/${url}/{{screen:articleId}}`,
              },
            },
          })),
        },
      },
    ],
  };
};
