/* eslint-disable */
module.exports = {
  title: "Тестирование административной панели WS",
  logo: "/logo.svg",
  sideMenu: {
    dataSource: {
      type: "list",
      options: [
        {
          code: "categories",
          name: "Категории",
          icon: "grid-plus-outline",
        },
        // {
        //   code: "content",
        //   name: "Контент",
        //   icon: "grid-plus-outline",
        // },
        // {
        //   code: "site",
        //   name: "Сайт",
        //   icon: "website",
        // },
        // {
        //   code: "marketing",
        //   name: "Маркетинг",
        //   icon: "bullseye-arrow",
        // },
        // {
        //   code: "stores",
        //   name: "Магазин",
        //   icon: "cart",
        // },
        // {
        //   code: "clients",
        //   name: "Клиенты",
        //   icon: "account-multiple-outline",
        // },
      ],
    },
  },
  userAuthenticate: {
    dataSource: {
      type: "api:request",
      options: {
        url: "/users/profile",
        method: "get",
      },
    },
    setTokenCookieFromFrontend: {
      dataSourceTokenField: "accessToken",
      cookieName: "accessToken",
      headerName: "authorization",
      tokenType: "jwt",
    },
    actions: {
      authenticate: {
        type: "api:request",
        options: {
          url: "/login",
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
  mainReference: "/articles",
  screens: [
    {
      reference: "/",
      blocks: [],
    },
    {
      reference: "/categories*",
      title: "Категории",
      blocks: [
        {
          type: "TableView",
          options: {
            tableViewDefaultSizes: {
              minWidth: 100,
              width: 300,
              maxWidth: 400,
            },
          },
          // dataSource: {
          //   type: "api:request",
          //   options: {
          //     url: "/categories",
          //     method: "get",
          //     params: {
          //       page: "1",
          //       perPage: "10",
          //     },
          //   },
          // },
          dataSource: {
            type: "list",
            options: {
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
      ],
    },
    // {
    //   reference: "/content*",
    //   title: "Контент",
    //   blocks: [
    //     {
    //       type: "SecondarySideMenu",
    //       dataSource: {
    //         type: "api:request",
    //         options: {
    //           url: "/admin/secondary-menu-config/content",
    //           method: "get",
    //         },
    //         context: "menu.secondary-menu-items",
    //       },
    //     },
    //     {
    //       type: "Column",
    //       blocks: [
    //         {
    //           type: "BackgroundTasks",
    //           dataSource: {
    //             type: "api:request",
    //             options: {
    //               url: "/admin/background-tasks",
    //               method: "get",
    //             },
    //           },
    //         },
    //         {
    //           type: "CurrentScreenBreadcrumbs",
    //           dataSource: {
    //             type: "context",
    //             options: {
    //               key: "{{menu.secondary-menu-items}}",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   reference: "/test*",
    //   title: "Тест",
    //   blocks: [
    //     {
    //       type: "CurrentScreenBreadcrumbs",
    //       dataSource: {
    //         type: "context",
    //         options: {
    //           key: "{{menu.secondary-menu-items}}",
    //         },
    //       },
    //     },
    //   ],
    // },
    // {
    //   pageUrl: "/deep",
    //   title: "Тестирование блоков",
    //   blocks: [
    //     {
    //       name: "TestBlock1",
    //       type: "TestBlock",
    //       dataSource: {
    //         type: "list",
    //         options: {
    //           data: "test.name",
    //         },
    //       },
    //       blocks: [
    //         {
    //           name: "TestBlock2",
    //           type: "TestBlock",
    //           blocks: [],
    //           actions: {
    //             inc: {
    //               type: "redirect",
    //               options: {
    //                 url: "/user/{{login}}",
    //               },
    //             },
    //           },
    //           dataSource: {
    //             type: "list",
    //             options: {
    //               data: "получилось???",
    //             },
    //             context: "test.name",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   pageUrl: "/list",
    //   title: "Тестирование административной панели WS",
    //   blocks: [
    //     {
    //       type: "List",
    //       permissions: {
    //         allow: ["*"],
    //         deny: ["guest"],
    //       },
    //       dataSource: {
    //         type: "list",
    //         options: {
    //           data: {
    //             columns: [
    //               { title: "Name", field: "name" },
    //               { title: "Surname", field: "surname" },
    //               {
    //                 title: "Birth Year",
    //                 field: "birthYear",
    //                 type: "numeric",
    //               },
    //               {
    //                 title: "Birth Place",
    //                 field: "birthCity",
    //                 lookup: { "34": "İstanbul", "63": "Şanlıurfa" },
    //               },
    //             ],
    //             data: [
    //               {
    //                 id: "11141",
    //                 name: "Mehmet",
    //                 surname: "Baran",
    //                 birthYear: 1987,
    //                 birthCity: 63,
    //               },
    //               {
    //                 name: "Zerya Betül",
    //                 surname: "Baran",
    //                 birthYear: 2017,
    //                 birthCity: 34,
    //               },
    //             ],
    //           },
    //         },
    //       },
    //       actions: {
    //         view: {
    //           type: "redirect",
    //           options: {
    //             url: "/user/{{login}}",
    //           },
    //         },
    //         delete: {
    //           permissions: {
    //             allow: ["admin"],
    //             deny: ["*"],
    //           },
    //           type: "api:request",
    //           options: {
    //             url: "/admin/user/delete",
    //             method: "delete",
    //             params: {
    //               id: "{{id}}",
    //             },
    //           },
    //         },
    //         create: {
    //           permissions: {
    //             allow: ["*"],
    //             deny: ["guest"],
    //           },
    //           type: "api:request",
    //           options: {
    //             url: "/admin/user/create",
    //             method: "post",
    //             params: {
    //               id: "{{name}}",
    //             },
    //           },
    //         },
    //         update: {
    //           permissions: {
    //             allow: ["*"],
    //             deny: ["guest"],
    //           },
    //           type: "redirect",
    //           options: {
    //             url: "admin/user/update/{{id}}",
    //           },
    //         },
    //       },
    //       config: {
    //         pagination: {
    //           countOnPage: 20,
    //         },
    //       },
    //     },
    //   ],
    // },
    // {
    //   pageUrl: "/detail/:pageId",
    //   title: "Детальная страница пользователя",
    //   blocks: [
    //     {
    //       type: "DetailView",
    //       dataSource: {
    //         type: "api",
    //         options: {
    //           url: "/admin/user/{{page:#pageId}}",
    //         },
    //         context: "global:#page.user",
    //       },
    //       actions: {
    //         delete: {
    //           permissions: {
    //             allow: ["admin"],
    //             deny: ["*"],
    //           },
    //           type: "api:request",
    //           options: {
    //             url: "/admin/user/delete",
    //             method: "get",
    //             params: {
    //               id: "{{page.user.id}}",
    //             },
    //           },
    //         },
    //         update: {
    //           permissions: {
    //             allow: ["*"],
    //             deny: ["guest"],
    //           },
    //           type: "api:request",
    //           options: {
    //             url: "/admin/user/update",
    //             method: "post",
    //             params: {
    //               id: "{{id}}",
    //             },
    //           },
    //           context: "global:#page.user",
    //         },
    //       },
    //       config: {
    //         fields: [
    //           {
    //             title: "ФИО:",
    //             type: "Input",
    //             config: {
    //               validations: ["text", "length > 3"],
    //             },
    //             value: "{{global:#page.user.name}}",
    //           },
    //           {
    //             title: "ФИО1:",
    //             type: "Input",
    //             config: {
    //               validations: ["text", "length > 3"],
    //             },
    //             value: "{{global:#page.user.name}}",
    //           },
    //           {
    //             title: "Изображение профиля:",
    //             type: "ImageViewer",
    //             config: {
    //               multiFiles: false,
    //               validations: ["type:jpg,png", "sizeLessThen:10mb"],
    //             },
    //             value:
    //               "https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg",
    //           },
    //           {
    //             title: "Приглашен пользователем:",
    //             type: "Dropdown",
    //             value: "{{isInvitedBy}}",
    //             dataSource: {
    //               alias: "dpAllUsers",
    //               type: "api",
    //               options: {
    //                 url: "/admin/users",
    //               },
    //             },
    //             config: {
    //               suggests: {
    //                 dataSource: {
    //                   type: "list",
    //                   options: {
    //                     data: "{{dpAllUsers}}",
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
  ],
};
