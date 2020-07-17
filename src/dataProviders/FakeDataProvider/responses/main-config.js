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
                type: "Wrapper",
                options: {
                  padding: 24,
                  fullWidth: true,
                },
                blocks: [
                  {
                    type: "Column",
                    blocks: [
                      {
                        type: "Wrapper",
                        options: {
                          margin: "0 0 24px 0",
                        },
                        blocks: [
                          {
                            type: "Heading",
                            options: {
                              value: "Статьи",
                              actionBlockElements: [
                                {
                                  type: "Actions/Button",
                                  options: { name: "Написать статью", icon: "edit-small" },
                                  actions: {
                                    click: {
                                      type: "redirect",
                                      options: {
                                        reference: "/test",
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                      {
                        type: "ContextInitializer",
                        id: "articles-context",
                        options: [
                          { path: "screen:articles.search", value: "" },
                          { path: "screen:articles.sorting", value: { id: "published_at", direction: "asc" } },
                          { path: "screen:articles.pagination", value: { page: 1, perPage: 9 } },
                        ],
                      },
                      {
                        type: "DataView/FormattedData",
                        waitForId: "articles-context",
                        options: {
                          id: "articles-list",
                          tableView: {
                            dataSource: {
                              type: "static",
                              options: {
                                tableViewDefaultSizes: {
                                  minWidth: 100,
                                  width: 300,
                                  maxWidth: 400,
                                },
                                selectable: true,
                                columns: [
                                  { title: "ID", field: "id", sortable: true, width: 100 },
                                  { title: "Имя", field: "firstName" },
                                  {
                                    title: "Фамилия",
                                    field: "lastName",
                                  },
                                  {
                                    title: "Возраст",
                                    field: "age",
                                    type: "NUMBER",
                                  },
                                ],
                                data: [
                                  {
                                    id: {
                                      reference: "https://yandex.ru",
                                      value: "11141",
                                    },
                                    firstName: "Mehmet",
                                    lastName: "Baran",
                                    age: 34,
                                  },
                                  {
                                    id: {
                                      reference: "/auth",
                                      value: "11142",
                                    },
                                    firstName: "Дара",
                                    lastName: "Мара",
                                    age: 35,
                                  },
                                ],
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
                              clickRedirectToReference: "/content/articles/{{local:id}}",
                            },
                          },
                          controlPanel: {
                            blocks: [
                              {
                                type: "Actions/Input",
                                options: {
                                  placeholder: "Найти",
                                  iconLeft: "search-big",
                                  debounce: 600,
                                  initialValue: "{{screen:articles.search}}",
                                },
                                actions: {
                                  change: {
                                    type: "none",
                                    context: "screen:articles.search",
                                  },
                                },
                              },
                              {
                                type: "Wrapper",
                                options: {
                                  margin: "0 0 0 8px",
                                },
                                blocks: [
                                  {
                                    type: "Actions/Sorting",
                                    options: {
                                      title: "Сортировать:",
                                      items: [
                                        { title: "по дате создания", id: "id", hasDirection: true },
                                        { title: "по дате публикации", id: "published_at", hasDirection: true },
                                      ],
                                      initialValue: "{{{screen:articles.sorting}}}",
                                    },
                                    actions: {
                                      change: {
                                        type: "none",
                                        context: "screen:articles.sorting",
                                      },
                                    },
                                  },
                                ],
                              },
                              {
                                type: "FillEmptySpace",
                              },
                            ],
                          },
                          paginationView: {
                            options: {
                              enabled: true,
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
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "Screen",
            options: {
              title: "Детальная статья",
              reference: "/content/articles/:id",
            },
            blocks: [{ type: "SimpleText", options: { text: "Тест 123" } }],
          },
        ],
      },
    ],
  },
};
