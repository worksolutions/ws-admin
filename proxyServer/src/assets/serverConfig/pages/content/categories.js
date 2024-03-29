module.exports = {
  type: "Screen",
  options: {
    title: "Категории",
    reference: "/content/categories",
  },
  blocks: [
    {
      type: "Pages/DefaultPageWithList",
      options: { title: "Категории" },
      slots: {
        headingAction: {
          type: "Actions/Button",
          options: { name: "Добавить", icon: "plus-big" },
          actions: {
            click: {
              type: "open-modal",
              options: {
                name: "create-category",
              },
            },
          },
        },
        mainContent: {
          type: "DataView/FormattedData",
          options: {
            id: "categories",
            tableView: {
              options: {
                selectable: false,
                columns: [
                  {
                    title: "Название",
                    field: "name",
                    type: "STRING",
                    sortable: false,
                  },
                  {
                    title: "Символьный код",
                    field: "code",
                    type: "STRING",
                    sortable: false,
                  },
                  {
                    title: "",
                    field: "actions",
                    type: "ACTIONS",
                    sortable: false,
                  },
                ],
                sortingOptions: {
                  initialValue: "=screen:categories.sorting",
                },
              },
              dataSource: {
                type: "api:request",
                options: {
                  id: "categories",
                  reference: "/categories",
                  method: "get",
                  body: {
                    page: "=screen:categories.pagination.page",
                    perPage: "=screen:categories.pagination.perPage",
                  },
                },
              },
            },
            paginationView: {
              options: {
                paginationItems: [8, 16, 32],
              },
              dataSource: {
                type: "context",
                options: {
                  key: "screen:categories.pagination",
                },
              },
              actions: {
                change: {
                  type: "update-context",
                  options: { context: "screen:categories.pagination" },
                },
              },
            },
            showMode: "table",
          },
        },
      },

      modals: {
        "create-category": {
          title: "Создание категории",
          block: {
            type: "RowFields/FieldsList",
            options: {
              mode: "vertical",
              fields: [
                {
                  type: "edit:Text",
                  options: {
                    inputOptions: {
                      width: "full-width",
                      size: "large",
                      placeholder: "Название",
                      contextPath: `screen:newCategory.title`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:newCategory.title` },
                      },
                    },
                  },
                },
                {
                  type: "edit:Text",
                  options: {
                    inputOptions: {
                      width: "full-width",
                      size: "large",
                      placeholder: "Символьный код",
                      contextPath: `screen:newCategory.code`,
                    },
                    modifier: {
                      type: "toggle",
                      title: "Генерировать символьный код из названия",
                      contextPath: `screen:newCategory.code-enableTransliteration`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:newCategory.code` },
                      },
                    },
                  },
                },
              ],
            },
          },
          actionBlock: {
            type: "Actions/Button",
            options: { name: "Создать", size: "LARGE", contextPath: `screen:newCategory.action` },
            actions: {
              click: [
                {
                  type: "api:request",
                  options: {
                    reference: "/categories/store",
                    method: "post",
                    body: {
                      code: "=screen:newCategory.code",
                      name: "=screen:newCategory.title",
                    },
                  },
                },
                {
                  type: "force-data-source-reload",
                  options: {
                    id: "categories",
                  },
                },
                {
                  type: "close-modal",
                },
              ],
            },
          },
        },
        "edit-category": {
          title: "Редактирование категории",
          block: {
            type: "RowFields/FieldsList",
            options: {
              mode: "vertical",
              fields: [
                {
                  type: "edit:Text",
                  options: {
                    inputOptions: {
                      width: "full-width",
                      size: "large",
                      placeholder: "Название",
                      contextPath: `screen:tempCategory.title`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:tempCategory.title` },
                      },
                    },
                  },
                },
                {
                  type: "edit:Text",
                  options: {
                    inputOptions: {
                      width: "full-width",
                      size: "large",
                      placeholder: "Символьный код",
                      contextPath: `screen:tempCategory.code`,
                    },
                    modifier: {
                      type: "toggle",
                      title: "Генерировать символьный код из названия",
                      contextPath: `screen:tempCategory.code-enableTransliteration`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:tempCategory.code` },
                      },
                    },
                  },
                },
              ],
            },
          },
          actionBlock: {
            type: "Actions/Button",
            options: { name: "Сохранить", size: "LARGE", contextPath: `screen:tempCategory.action` },
            actions: {
              click: [
                {
                  type: "api:request",
                  options: {
                    reference: "/categories/update",
                    method: "post",
                    body: {
                      id: "=screen:tempCategory.id",
                      code: "=screen:tempCategory.code",
                      name: "=screen:tempCategory.title",
                    },
                  },
                },
                {
                  type: "force-data-source-reload",
                  options: {
                    id: "categories",
                  },
                },
                {
                  type: "close-modal",
                },
              ],
            },
          },
        },
        "delete-category": {
          title: "Удаление категории",
          subTitle: "Вы уверены, что хотите удалить категорию «{{screen:tempCategory.title}}»?",
          actionBlock: {
            type: "Actions/Button",
            options: { name: "Удалить", size: "LARGE", contextPath: `screen:tempCategory.action` },
            actions: {
              click: [
                {
                  type: "api:request",
                  options: {
                    reference: "/categories/{{screen:tempCategory.id}}",
                    method: "delete",
                  },
                },
                {
                  type: "force-data-source-reload",
                  options: {
                    id: "categories",
                  },
                },
                {
                  type: "close-modal",
                },
              ],
            },
          },
        },
      },
    },
  ],
};
