/* eslint-disable max-lines */
module.exports = {
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
              type: "open-modal",
              options: {
                name: "create-user",
              },
            },
          },
        },
        mainContent: {
          type: "ContextInitializer",
          options: {
            static: [{ path: "screen:temp-data", value: {} }],
            block: {
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
                    context: "screen:users",
                    options: {
                      reference: "/users",
                      method: "get",
                      body: {
                        page: "=screen:users.pagination.page",
                        perPage: "=screen:users.pagination.perPage",
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
                      options: { context: "screen:users.pagination" },
                    },
                  },
                },
                showMode: "table",
              },
            },
          },
        },
      },
      modals: {
        "edit-user-profile": {
          title: "Редактирование пользователя",
          block: {
            type: "RowFields/FieldsList",
            options: {
              mode: "vertical",
              fields: [
                {
                  type: "edit:Avatar",
                  options: {
                    imageOptions: {
                      aspectRatio: 1,
                      context: `screen:temp-data.user.image`,
                    },
                    actions: {
                      upload: {
                        type: "api:uploadFile",
                        options: {
                          reference: "/file_storage/store",
                        },
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
                      placeholder: "Имя",
                      context: `screen:temp-data.user.name`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.user.name` },
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
                      placeholder: "Фамилия",
                      context: `screen:temp-data.user.surname`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.user.surname` },
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
                      placeholder: "Должность",
                      context: `screen:temp-data.user.position`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.user.position` },
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
                      placeholder: "E-mail",
                      context: `screen:temp-data.user.email`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.user.email` },
                      },
                    },
                  },
                },
                {
                  type: "edit:Checkbox",
                  options: {
                    checkboxOptions: {
                      width: "full-width",
                      size: "large",
                      text: "Заблокировать",
                      context: `screen:temp-data.user.blocked`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: "screen:temp-data.user.blocked" },
                      },
                    },
                  },
                },
              ],
            },
          },
          actionBlock: {
            type: "Actions/Button",
            options: { name: "Сохранить", size: "LARGE" },
            actions: {
              click: [
                {
                  type: "api:request",
                  options: {
                    reference: "/users/update",
                    method: "post",
                    body: {
                      id: "=screen:temp-data.user.id",
                      name: "=screen:temp-data.user.name",
                      surname: "=screen:temp-data.user.surname",
                      email: "=screen:temp-data.user.email",
                      position: "=screen:temp-data.user.position",
                      password: "=screen:temp-data.user.password",
                      password_confirmation: "=screen:temp-data.user.passwordConfirmation",
                      imageId: "=screen:temp-data.user.image.id",
                      blocked: "=screen:temp-data.user.blocked",
                    },
                  },
                },
                {
                  type: "close-modal",
                },
                {
                  type: "api:request",
                  options: {
                    reference: "/users",
                    method: "get",
                    body: {
                      page: "=screen:users.pagination.page",
                      perPage: "=screen:users.pagination.perPage",
                    },
                    saveToContext: "screen:users",
                  },
                },
              ],
            },
          },
        },
        "create-user": {
          title: "Создание пользователя",
          block: {
            type: "BlocksList",
            blocks: [
              {
                type: "RowFields/FieldsList",
                options: {
                  mode: "vertical",
                  fields: [
                    {
                      type: "edit:Avatar",
                      options: {
                        imageOptions: {
                          aspectRatio: 1,
                          context: `screen:newUser.avatar`,
                        },
                        actions: {
                          upload: {
                            type: "api:uploadFile",
                            options: {
                              reference: "/file_storage/store",
                            },
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
                          placeholder: "Имя",
                          context: `screen:newUser.firstName`,
                        },
                        actions: {
                          change: {
                            type: "update-context",
                            options: { context: `screen:newUser.firstName` },
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
                          placeholder: "Фамилия",
                          context: `screen:newUser.lastName`,
                        },
                        actions: {
                          change: {
                            type: "update-context",
                            options: { context: `screen:newUser.lastName` },
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
                          placeholder: "Должность",
                          context: `screen:newUser.position`,
                        },
                        actions: {
                          change: {
                            type: "update-context",
                            options: { context: `screen:newUser.position` },
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
                          placeholder: "E-mail",
                          context: `screen:newUser.email`,
                        },
                        actions: {
                          change: {
                            type: "update-context",
                            options: { context: `screen:newUser.email` },
                          },
                        },
                      },
                    },
                    {
                      type: "edit:Password",
                      options: {
                        inputOptions: {
                          width: "full-width",
                          size: "large",
                          valueContext: `screen:newUser.password`,
                          confirmationContext: `screen:newUser.passwordConfirmation`,
                        },
                        actions: {
                          valueChange: {
                            type: "update-context",
                            options: { context: `screen:newUser.password` },
                          },
                          confirmationChange: {
                            type: "update-context",
                            options: { context: `screen:newUser.passwordConfirmation` },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
          actionBlock: {
            type: "Actions/Button",
            options: { name: "Создать", size: "LARGE", context: `screen:newUser.action` },
            actions: {
              click: [
                {
                  type: "api:request",
                  options: {
                    reference: "/users/store",
                    method: "post",
                    body: {
                      name: "=screen:newUser.firstName",
                      surname: "=screen:newUser.lastName",
                      email: "=screen:newUser.email",
                      position: "=screen:newUser.position",
                      password: "=screen:newUser.password",
                      password_confirmation: "=screen:newUser.passwordConfirmation",
                      imageId: "=screen:newUser.avatar.id",
                      blocked: "0",
                    },
                  },
                },
                {
                  type: "append-context",
                  options: { context: "screen.users.list", takeIncomeDataFromPreviousAction: true },
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
