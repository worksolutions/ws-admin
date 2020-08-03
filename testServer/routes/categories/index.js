const { makeProxy } = require("../../libs");

module.exports = (app) => {
  makeProxy(
    { realServerUrl: "/api/categories", expressMethodHandlerName: "get", handleUrl: "/api/categories" },
    app,
    ({ data, meta }) => {
      return {
        list: data.map((category) => ({
          id: {
            value: category.id,
          },
          name: {
            value: category.name,
          },
          code: {
            value: category.code,
          },
          actions: {
            value: [
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
          },
        })),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      };
    },
  );
};
