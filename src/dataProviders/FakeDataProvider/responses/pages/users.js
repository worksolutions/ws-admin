module.exports = {
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
                      initialValue: "=screen:users.sorting",
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
              options: { name: "Редактировать", icon: "edit", buttonType: "SECONDARY" },
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
};
