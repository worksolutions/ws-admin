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
                type: "Pages/DefaultPageWithList",
                slots: {
                  heading: {
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
                  mainContent: {
                    type: "Column",
                    blocks: [
                      {
                        type: "ContextInitializer",
                        id: "articles-context",
                        options: [
                          { path: "screen:articles.search", value: "" },
                          { path: "screen:articles.sorting", value: { id: "published_at", direction: "asc" } },
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
                            searchOptions: {
                              placeholder: "Найти",
                              iconLeft: "search-big",
                              debounce: 600,
                              initialValue: "{{screen:articles.search}}",
                            },
                            sortingOptions: {
                              title: "Сортировать:",
                              items: [
                                { title: "по дате создания", id: "id", hasDirection: true },
                                { title: "по дате публикации", id: "published_at", hasDirection: true },
                              ],
                              initialValue: "{{{screen:articles.sorting}}}",
                            },
                          },
                          paginationView: {
                            options: {
                              enabled: true,
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
              reference: "/content/articles/:id",
            },
            blocks: [{ type: "SimpleText", options: { text: "Тест 123" } }],
          },
        ],
      },
    ],
  },
};
