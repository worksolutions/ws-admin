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
                    contextPath: "screen:users",
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
                      contextPath: `screen:temp-data.image`,
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
                      contextPath: `screen:temp-data.name`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.name` },
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
                      contextPath: `screen:temp-data.surname`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.surname` },
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
                      contextPath: `screen:temp-data.position`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.position` },
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
                      contextPath: `screen:temp-data.email`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: `screen:temp-data.email` },
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
                      contextPath: `screen:temp-data.blocked`,
                    },
                    actions: {
                      change: {
                        type: "update-context",
                        options: { context: "screen:temp-data.blocked" },
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
                      id: "=screen:temp-data.id",
                      name: "=screen:temp-data.name",
                      surname: "=screen:temp-data.surname",
                      email: "=screen:temp-data.email",
                      position: "=screen:temp-data.position",
                      imageId: "=screen:temp-data.image.id",
                      blocked: "=screen:temp-data.blocked",
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
                          contextPath: `screen:newUser.avatar`,
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
                          contextPath: `screen:newUser.firstName`,
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
                          contextPath: `screen:newUser.lastName`,
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
                          contextPath: `screen:newUser.position`,
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
                          contextPath: `screen:newUser.email`,
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
                          valueContextPath: `screen:newUser.password`,
                          confirmationContextPath: `screen:newUser.passwordConfirmation`,
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
            options: { name: "Создать", size: "LARGE", contextPath: `screen:newUser.action` },
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
                  options: { contextPath: "screen.users.list", takeIncomeDataFromPreviousAction: true },
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
