const { makeProxy } = require("../../libs");

module.exports = (app) => {
  makeProxy({ realServerUrl: "/api/categories", expressMethodHandlerName: "get", handleUrl: "/api/categories" }, app, {
    modifyResponse: ({ data, meta }) => {
      return {
        list: data.map((category) => ({
          id: category.id,
          name: category.name,
          code: category.code,
          actions: [
            {
              mode: "button",
              icon: "edit",
              iconColor: "gray-blue/07",
              type: "redirect",
              options: {
                reference: "/",
              },
            },
            {
              mode: "button",
              icon: "delete",
              iconColor: "gray-blue/07",
              type: "redirect",
              options: {
                reference: "/",
              },
            },
          ],
        })),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      };
    },
  });
  makeProxy(
    { realServerUrl: "/api/categories", expressMethodHandlerName: "get", handleUrl: "/api/categories-list" },
    app,
    {
      modifyResponse: ({ data }) => data.map((category) => ({ code: category.id, title: category.name })),
    },
  );
  makeProxy(
    { realServerUrl: "/api/categories/store", expressMethodHandlerName: "post", handleUrl: "/api/categories/store" },
    app,
    {
      modifyResponse: ({ data }) => ({ code: data.id, title: data.name }),
    },
  );
};
