const pageBuilder = require("./pageBuilder");

module.exports = {
  type: "Screen",
  options: {
    title: "Редактирование статьи",
    reference: "/content/articles/:articleId/edit",
  },
  blocks: [
    {
      type: "ContextInitializer",
      dataSource: {
        type: "api:request",
        options: {
          reference: "/article/{{screen:articleId}}/edit",
          method: "get",
        },
        contextPath: "screen:article",
      },
      options: {
        block: pageBuilder("screen:article", (body) => ({
          save: [
            {
              type: "api:request",
              options: {
                reference: "/save-article",
                method: "post",
                body,
              },
            },
          ],
          discard: {
            type: "redirect",
            options: {
              reference: "/content/articles/{{screen:articleId}}",
            },
          },
        })),
      },
    },
  ],
};
