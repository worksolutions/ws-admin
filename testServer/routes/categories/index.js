const { makeProxy } = require("../../libs");

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: (req) => "/api/categories/" + req.params.categoryId,
      expressMethodHandlerName: "get",
      handleUrl: "/api/category/:categoryId",
    },
    app,
    {
      modifyResponse: ({ data }) => ({
        id: data.id,
        title: data.name,
        code: data.code,
        "code-enableTransliteration": false,
      }),
    },
  );
  makeProxy({ realServerUrl: "/api/categories", expressMethodHandlerName: "get", handleUrl: "/api/categories" }, app, {
    modifyResponse: ({ data, meta }) => {
      return {
        list: data.map((category) => ({
          id: category.id,
          name: category.name,
          code: category.code,
          actions: {
            list: [
              {
                mode: "button",
                icon: "edit",
                iconColor: "gray-blue/07",
                action: [
                  {
                    type: "api:request",
                    options: {
                      reference: `/category/${category.id}`,
                      method: "get",
                      saveToContext: "screen:tempCategory",
                    },
                  },
                  {
                    type: "open-modal",
                    options: {
                      name: "edit-category",
                    },
                  },
                ],
              },
              {
                mode: "button",
                icon: "delete",
                iconColor: "gray-blue/07",
                action: [
                  {
                    type: "api:request",
                    options: {
                      reference: `/category/${category.id}`,
                      method: "get",
                      saveToContext: "screen:tempCategory",
                    },
                  },
                  {
                    type: "open-modal",
                    options: {
                      name: "delete-category",
                    },
                  },
                ],
              },
            ],
          },
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
