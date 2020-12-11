const pageBuilder = require("./pageBuilder");

module.exports = {
  type: "Screen",
  options: {
    title: "Редактирование статьи",
    reference: "/content/useful_articles/{{screen:usefulArticleId}}/edit",
  },
  blocks: [
    {
      type: "ContextInitializer",
      dataSource: {
        type: "api:request",
        options: {
          reference: "/useful-articles/{{screen:articleUsefulId}}/edit",
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
          close: {
            type: "redirect",
            options: {
              reference: "/content/useful-articles/{{screen:usefulArticleId}}",
            },
          },
        })),
      },
    },
  ],
};
