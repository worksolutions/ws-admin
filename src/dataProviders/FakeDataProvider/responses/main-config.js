/* eslint-disable */
module.exports = {
  title: "Тестирование административной панели WS",
  logo: "/logo.svg",
  sideMenu: {
    dataSource: {
      type: "static",
      options: [
        {
          code: "content/articles",
          name: "Контент",
          icon: "grid-plus-outline",
        },
        {
          code: "users/list",
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
                  externalReference: "{{screen:article.externalLink}}",
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
                                    type: "icon-link",
                                    options: {
                                      title: "{{screen:article.author.name}} {{screen:article.author.surname}}",
                                      imageReference: "{{screen:article.author.image.path}}",
                                      reference: "/user/{{screen:article.author.id}}",
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
                          type: "FormattedHTMLText",
                          options: {
                            value: "{{screen:article.content}}",
                          },
                        },
                      },
                      {
                        title: "Статьи по теме",
                        block: {
                          type: "DataView/Cards",
                          dataSource: {
                            type: "api:request",
                            options: {
                              reference: "/article/{{screen:articleId}}/related-articles",
                              method: "get",
                            },
                          },
                          options: {
                            imageConfig: { aspectRatio: 1.6 },
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
                        type: "redirect",
                        options: {
                          reference: "/test",
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
                            initialValue: "{{{screen:categories.sorting}}}",
                          },
                        },
                        dataSource: {
                          type: "api:request",
                          options: {
                            reference: "/categories",
                            method: "get",
                            params: {
                              page: "{{screen:categories.pagination.page}}",
                              perPage: "{{screen:categories.pagination.perPage}}",
                            },
                          },
                        },
                      },
                      searchOptions: {
                        placeholder: "Найти",
                        iconLeft: "search-big",
                        debounce: 600,
                        value: "{{screen:categories.search}}",
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
                            context: "screen:categories.pagination",
                          },
                        },
                      },
                      showMode: "table",
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: "Screen",
        options: {
          title: "Управление контентом",
          reference: "/users*",
        },
        blocks: [
          {
            type: "Screen",
            options: {
              title: "Пользователи",
              reference: "/users/list",
            },
            blocks: [
              {
                type: "Pages/DefaultPageWithList",
                options: { title: "Пользователи" },
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
                    type: "DataView/FormattedData",
                    options: {
                      id: "users",
                      tableView: {
                        options: {
                          selectable: false,
                          columns: [
                            {
                              title: "Имя",
                              field: "user",
                              type: "USER",
                              sortable: false,
                            },
                            {
                              title: "Должность",
                              field: "position",
                              type: "STRING",
                              sortable: false,
                            },
                            {
                              title: "E-mail",
                              field: "email",
                              type: "STRING",
                              sortable: false,
                            },
                            {
                              title: "Статус",
                              field: "status",
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
                            initialValue: "{{{screen:users.sorting}}}",
                          },
                        },
                        dataSource: {
                          type: "api:request",
                          options: {
                            reference: "/users",
                            method: "get",
                            params: {
                              page: "{{screen:users.pagination.page}}",
                              perPage: "{{screen:users.pagination.perPage}}",
                            },
                          },
                        },
                      },
                      searchOptions: {
                        placeholder: "Найти",
                        iconLeft: "search-big",
                        debounce: 600,
                        value: "{{screen:users.search}}",
                      },
                      paginationView: {
                        options: {
                          paginationItems: [8, 16, 32],
                        },
                        dataSource: {
                          type: "context",
                          options: {
                            key: "screen:users.pagination",
                          },
                        },
                        actions: {
                          change: {
                            type: "update-context",
                            context: "screen:users.pagination",
                          },
                        },
                      },
                      showMode: "table",
                    },
                  },
                },
              },
            ],
          },
          {
            type: "Screen",
            options: {
              title: "Пользователи",
              reference: "/users/me",
            },
            blocks: [
              {
                type: "Pages/DefaultPageWithList",
                options: { title: "Мой профиль" },
                slots: {
                  headingAction: {
                    type: "Actions/Button",
                    options: { name: "Редактировать", icon: "plus-big", buttonType: "SECONDARY" },
                    actions: {
                      click: {
                        type: "update-context",
                        context: "global:currentUser.name",
                      },
                    },
                  },
                  mainContent: {
                    type: "UserProfile",
                    dataSource: {
                      type: "context",
                      options: {
                        key: "global:currentUser",
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
};
