module.exports = {
  type: "Screen",
  options: {
    title: "Статьи",
    reference: "/content/articles",
  },
  blocks: [
    {
      type: "Pages/DefaultPageWithList",
      options: { title: "Статьи" },
      slots: {
        headingAction: {
          type: "Actions/Button",
          options: { name: "Добавить", icon: "plus-big" },
          actions: {
            click: {
              type: "redirect",
              options: {
                reference: "/content/create-article",
              },
            },
          },
        },
        subHeading: {
          type: "Filter",
          waitForId: "articles-context",
          options: [
            {
              name: "Фильтр",
              fields: [
                {
                  title: "Статус",
                  type: "edit:RadioGroup",
                  options: {
                    radioGroupOptions: {
                      context: "screen:articles.filter.status",
                    },
                    dataSource: {
                      type: "static",
                      options: [
                        { code: "any", title: "Любое значение" },
                        { code: "draft", title: "Черновик" },
                        { code: "published", title: "Опубликовано" },
                        { code: "unpublished", title: "Не опубликовано" },
                      ],
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        context: "screen:articles.filter.status",
                      },
                    },
                  },
                },
                {
                  title: "Дата публикации",
                  type: "edit:Date",
                  options: {
                    dateOptions: {
                      cleanable: true,
                      size: "medium",
                      context: "screen:articles.filter.publishedAt",
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        context: "screen:articles.filter.publishedAt",
                      },
                    },
                  },
                },
              ],
            },
          ],
          dataSource: {
            type: "context",
            options: {
              key: "screen:articles.filter",
            },
          },
          actions: {
            clear: {
              type: "update-context",
              context: "screen:articles.filter",
            },
          },
        },
        mainContent: {
          type: "BlocksList",
          blocks: [
            {
              type: "ContextInitializer",
              id: "articles-context",
              options: [
                { path: "screen:articles.filter.status", value: "any" },
                { path: "screen:articles.filter.publishedAt", value: null },
                { path: "screen:articles.search", value: "" },
                { path: "screen:articles.sorting", value: { id: "publishedAt", direction: "desc" } },
              ],
            },
            {
              type: "DataView/FormattedData",
              waitForId: "articles-context",
              options: {
                id: "articles",
                tableView: {
                  options: {
                    selectable: false,
                    columns: [
                      {
                        title: "",
                        field: "announceImage",
                        type: "IMAGE",
                        resizable: false,
                        sortable: false,
                        options: {
                          imageConfig: {
                            heightConfig: "LARGE",
                            aspectRatio: 1.6,
                          },
                        },
                      },
                      {
                        title: "Название",
                        field: "name",
                        type: "STRING",
                        sortable: false,
                      },
                      {
                        title: "Дата",
                        field: "publishedAt",
                        type: "DATE",
                        resizable: false,
                        sortable: true,
                      },
                      {
                        title: "Статус",
                        field: "status",
                        type: "STATUS-STRING",
                        sortable: false,
                        sizes: {
                          minWidth: 135,
                        },
                      },
                      {
                        title: "",
                        field: "actions",
                        type: "ACTIONS",
                        resizable: false,
                        sortable: false,
                      },
                    ],
                    sortingOptions: {
                      initialValue: "=screen:articles.sorting",
                    },
                  },
                  dataSource: {
                    type: "api:request",
                    options: {
                      reference: "/articles/table",
                      method: "get",
                      params: {
                        title: "=screen:articles.search",
                        page: "=screen:articles.pagination.page",
                        perPage: "=screen:articles.pagination.perPage",
                        orderDirection: "=screen:articles.sorting.direction",
                        orderField: "=screen:articles.sorting.id",
                        status: "=screen:articles.filter.status",
                        publishedAt: "=screen:articles.filter.publishedAt",
                      },
                    },
                  },
                },
                cardsView: {
                  dataSource: {
                    type: "api:request",
                    options: {
                      reference: "/articles/cards",
                      method: "get",
                      params: {
                        title: "=screen:articles.search",
                        page: "=screen:articles.pagination.page",
                        perPage: "=screen:articles.pagination.perPage",
                        orderDirection: "=screen:articles.sorting.direction",
                        orderField: "=screen:articles.sorting.id",
                        status: "=screen:articles.filter.status",
                        publishedAt: "=screen:articles.filter.publishedAt",
                      },
                    },
                  },
                  options: {
                    imageConfig: {
                      aspectRatio: 1.6,
                    },
                    sortingOptions: {
                      title: "Сортировать:",
                      items: [
                        { title: "по дате создания", id: "id", hasDirection: true },
                        { title: "по дате публикации", id: "publishedAt", hasDirection: true },
                      ],
                      initialValue: "=screen:articles.sorting",
                    },
                  },
                },
                searchOptions: {
                  placeholder: "Найти",
                  context: "screen:articles.search",
                },
                paginationView: {
                  options: {
                    paginationItems: [8, 16, 32],
                  },
                  dataSource: {
                    type: "context",
                    options: {
                      key: "screen:articles.pagination",
                    },
                  },
                  actions: {
                    change: {
                      type: "update-context",
                      context: "screen:articles.pagination",
                    },
                  },
                },
                showMode: "all",
              },
              actions: {
                search: {
                  type: "update-context",
                  context: "screen:articles.search",
                },
                sorting: {
                  type: "update-context",
                  context: "screen:articles.sorting",
                },
              },
            },
          ],
        },
      },
    },
  ],
};
