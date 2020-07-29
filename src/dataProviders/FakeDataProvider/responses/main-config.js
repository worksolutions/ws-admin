/* eslint-disable */
module.exports = {
  title: "Тестирование административной панели WS",
  logo: "/logo.svg",
  sideMenu: {
    dataSource: {
      type: "static",
      options: [
        {
          code: "content",
          name: "Контент",
          icon: "grid-plus-outline",
        },
        {
          code: "categories",
          name: "Пользователь",
          icon: "account-multiple-outline",
        },
      ],
    },
  },
  userAuthenticate: {
    dataSource: {
      type: "api:request",
      options: {
        reference: "/users/profile",
        method: "get",
      },
    },
    authTokenSaveStrategy: {
      dataSourceTokenField: "accessToken",
      defaultPipe: [
        { type: "send-cookie-to-header", options: { cookieName: "accessToken", headerName: "authorization" } },
      ],
      authenticationPipe: [
        { type: "modify-token", options: { tokenType: "jwt" } },
        { type: "set-cookie", options: { cookieName: "accessToken" } },
      ],
      removePipe: [{ type: "remove-cookie", options: { cookieName: "accessToken" } }],
    },
    actions: {
      authenticate: {
        type: "api:request",
        options: {
          reference: "/login",
          method: "post",
        },
      },
      resetPassword: {
        type: "redirect",
        options: {
          reference: "/auth/reset-password",
        },
      },
      logout: {
        type: "redirect",
        options: {
          reference: "/auth",
        },
      },
    },
    topImage: "/ws-logo-mono-color.svg",
    rightImage: "/right-auth-image.png",
    title: "Work Solutions",
  },
  mainReference: "/content/articles",
  mainBlock: {
    type: "Screen",
    options: {
      reference: "*",
    },
    blocks: [
      {
        type: "Screen",
        options: {
          reference: "/test*",
          title: "Тестовая страница",
        },
        blocks: [{ type: "Test" }],
      },
      {
        type: "Screen",
        options: {
          title: "Управление контентом",
          reference: "/content*",
        },
        blocks: [
          {
            type: "SecondarySideMenu",
            dataSource: {
              type: "static",
              options: {
                id: "secondary-menu",
                title: "Контент",
                reference: "/content",
                items: [
                  {
                    name: "Статьи",
                    icon: "content-multiple",
                    reference: "/content/articles",
                    subElements: [],
                  },
                  {
                    name: "Категории",
                    icon: "book-open",
                    reference: "/content/categories",
                    subElements: [],
                  },
                ],
              },
              context: "menu.secondary-menu-items",
            },
          },
          {
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
                          reference: "/test",
                        },
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
                          { path: "screen:articles.search", value: "" },
                          { path: "screen:articles.sorting", value: { id: "publishedAt", direction: "desc" } },
                        ],
                      },
                      {
                        type: "DataView/FormattedData",
                        waitForId: "articles-context",
                        options: {
                          id: "articles-list",
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
                              rowsConfig: {
                                paddingConfig: "SMALL",
                              },
                              sortingOptions: {
                                initialValue: "{{{screen:articles.sorting}}}",
                              },
                            },
                            dataSource: {
                              type: "api:request",
                              options: {
                                reference: "/articles/table",
                                method: "get",
                                params: {
                                  title: "{{screen:articles.search}}",
                                  page: "{{screen:articles.pagination.page}}",
                                  perPage: "{{screen:articles.pagination.perPage}}",
                                  orderDirection: "{{screen:articles.sorting.direction}}",
                                  orderField: "{{screen:articles.sorting.id}}",
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
                                  title: "{{screen:articles.search}}",
                                  page: "{{screen:articles.pagination.page}}",
                                  perPage: "{{screen:articles.pagination.perPage}}",
                                  orderDirection: "{{screen:articles.sorting.direction}}",
                                  orderField: "{{screen:articles.sorting.id}}",
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
                                initialValue: "{{{screen:articles.sorting}}}",
                              },
                            },
                          },
                          searchOptions: {
                            placeholder: "Найти",
                            iconLeft: "search-big",
                            debounce: 600,
                            value: "{{screen:articles.search}}",
                          },
                          paginationView: {
                            options: {
                              paginationItems: [8, 16, 32],
                            },
                            dataSource: {
                              type: "context",
                              options: {
                                key: "{{screen:articles.pagination}}",
                              },
                            },
                            actions: {
                              change: {
                                type: "none",
                                context: "screen:articles.pagination",
                              },
                            },
                          },
                        },
                        actions: {
                          search: {
                            type: "none",
                            context: "screen:articles.search",
                          },
                          sorting: {
                            type: "none",
                            context: "screen:articles.sorting",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          {
            type: "Screen",
            options: {
              title: "Детальная статья",
              reference: "/content/articles/:articleId",
            },
            blocks: [
              {
                type: "Pages/DefaultDetailPage",
                options: {
                  title: "Статья",
                  status: {
                    title: "{{screen:article.status.title}}",
                    badgeColor: "{{screen:article.status.badgeColor}}",
                  },
                  externalReference: "https://yandex.ru",
                },
                dataSource: {
                  type: "api:request",
                  options: {
                    reference: "/article/{{screen:articleId}}",
                    method: "get",
                  },
                  context: "screen:article",
                },
                slots: {
                  headingAction: {
                    type: "Actions/Button",
                    options: { name: "Редактировать", icon: "edit-alt", buttonType: "SECONDARY" },
                    actions: {
                      click: {
                        type: "redirect",
                        options: {
                          reference: "/test",
                        },
                      },
                    },
                  },
                  mainContent: {
                    type: "Tabs",
                    options: [
                      {
                        title: "Атрибуты",
                        block: {
                          type: "RowFields/GroupedFields",
                          options: [
                            {
                              title: "Основные",
                              fieldList: {
                                mode: "HORIZONTAL",
                                fields: [
                                  {
                                    title: "Название",
                                    type: "text",
                                    options: { value: "{{screen:article.title}}" },
                                  },
                                  {
                                    title: "Текст анонса",

                                    type: "text",
                                    options: { value: "{{screen:article.announce}}" },
                                  },
                                  {
                                    title: "Дата публикации",
                                    type: "text",
                                    options: { value: "{{screen:article.publishedAt}}" },
                                  },
                                  {
                                    title: "Категория",
                                    type: "text",
                                    options: { value: "{{screen:article.category.name}}" },
                                  },
                                  {
                                    title: "Автор",
                                    type: "text",
                                    options: {
                                      value: "{{screen:article.author.name}} {{screen:article.author.surname}}",
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              title: "Мета",
                              fieldList: {
                                mode: "HORIZONTAL",
                                fields: [
                                  {
                                    title: "Символьный код",
                                    type: "text",
                                    options: { value: "{{screen:article.code}}" },
                                  },
                                  {
                                    title: "Заголовок",
                                    type: "text",
                                    options: { value: "{{screen:article.tagTitle}}" },
                                  },
                                  {
                                    title: "Описание",
                                    type: "text",
                                    options: { value: "{{screen:article.tagDescription}}" },
                                  },
                                  {
                                    title: "Ключевые слова",
                                    type: "text",
                                    options: { value: "{{screen:article.keywords}}" },
                                  },
                                ],
                              },
                            },
                            {
                              title: "Изображения",
                              fieldList: {
                                mode: "VERTICAL",
                                fields: [
                                  {
                                    title: "Изображение анонса",
                                    type: "image",
                                    options: { reference: "{{screen:article.announceImage.path}}", aspectRatio: 1.6 },
                                  },
                                  {
                                    title: "Изображение заголовка",
                                    type: "image",
                                    options: { reference: "{{screen:article.contentImage.path}}", aspectRatio: 1.6 },
                                  },
                                  {
                                    title: "Фон",
                                    type: "image",
                                    options: { reference: "{{screen:article.background.path}}", aspectRatio: 1.6 },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        title: "Текст",
                        block: {
                          type: "SimpleText",
                          options: {
                            value: "текст 213",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
