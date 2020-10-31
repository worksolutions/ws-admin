const pageBuilder = require("./pageBuilder");

module.exports = {
  type: "Screen",
  options: {
    title: "Создание статьи",
    reference: "/content/create-article",
  },
  blocks: [
    {
      type: "ContextInitializer",
      options: {
        static: [{ path: "screen:article", value: { status: "UN_PUBLISHED" } }],
        block: pageBuilder("screen:article", (body) => ({
          save: [
            {
              type: "api:request",
              options: {
                reference: "/create-article",
                method: "post",
                body,
              },
            },
            {
              type: "redirect",
              options: {
                reference: "/content/articles/{{local:inputData.id}}/edit",
              },
            },
          ],
          close: {
            type: "redirect",
            options: {
              reference: "/content/articles",
            },
          },
        })),
      },
    },
  ],
};
