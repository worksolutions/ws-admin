/* eslint-disable max-lines */
module.exports = function (context, getActions) {
  const tempContext = `screen:temp-article`;
  const relatedArticlesContext = `${tempContext}.related-articles`;

  return {
    type: "ContextInitializer",
    options: {
      static: [
        { path: context, value: {} },
        { path: `${relatedArticlesContext}.list`, value: [] },
        { path: `${tempContext}.categories`, value: [] },
        { path: `${tempContext}.users`, value: [] },
      ],
      actions: {
        loadCategories: {
          type: "api:request",
          options: {
            reference: "/categories-list",
            method: "get",
            body: {
              page: "1",
              perPage: "100",
            },
            saveToContext: `${tempContext}.categories`,
          },
        },
        loadUsers: {
          type: "api:request",
          options: {
            reference: "/users-list",
            method: "get",
            body: {
              page: "1",
              perPage: "100",
            },
            saveToContext: `${tempContext}.users`,
          },
        },
      },
      block: {
        type: "Pages/DefaultDetailEditPage",
        dataSource: {
          type: "context",
          options: { key: context },
        },
        options: {
          title: "Статья",
          status: {
            dataSource: {
              type: "static",
              options: [
                { badgeColor: "orange/05", code: "UN_PUBLISHED", title: "Не опубликовано" },
                { badgeColor: "green/05", code: "PUBLISHED", title: "Опубликовано" },
              ],
            },
            options: {
              value: `=${context}.status`,
            },
            actions: {
              change: {
                type: "update-context",
                options: { context: `${context}.status` },
              },
            },
          },
          saveOptions: {
            context: "screen:article",
            requiredContextFields: [`${context}.title`, `${context}.code`, `${context}.category`, `${context}.author`],
          },
        },
        slots: {
          mainContent: {
            type: "BlocksList",
            blocks: [
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-true-value",
                    context: `${context}.code-enableTransliteration`,
                  },
                  options: { context: `${context}.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "transliteration",
                  enableTrigger: {
                    type: "if-context-true-value",
                    context: `${context}.code-enableTransliteration`,
                  },
                  options: { fromContext: `${context}.title`, toContext: `${context}.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: { type: "if-context-true-value", context: `${context}.tagTitle-takeFromTitle` },
                  options: { context: `${context}.tagTitle` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "copy-context",
                  enableTrigger: { type: "if-context-true-value", context: `${context}.tagTitle-takeFromTitle` },
                  options: { fromContext: `${context}.title`, toContext: `${context}.tagTitle` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "exclude-array-items-by-id-from-context",
                  enableTrigger: { type: "always" },
                  options: {
                    fromContext: `${context}.relatedArticles`,
                    toContext: `${relatedArticlesContext}.list`,
                  },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "transliteration",
                  enableTrigger: {
                    type: "if-context-true-value",
                    context: `screen:newCategory.code-enableTransliteration`,
                  },
                  options: { fromContext: `screen:newCategory.title`, toContext: `screen:newCategory.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-true-value",
                    context: `screen:newCategory.code-enableTransliteration`,
                  },
                  options: { context: `screen:newCategory.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-false-value",
                    mode: "or",
                    context: [`screen:newCategory.title`, `screen:newCategory.code`],
                  },
                  options: { context: `screen:newCategory.action` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-false-value",
                    mode: "or",
                    context: [
                      `screen:newUser.firstName`,
                      `screen:newUser.lastName`,
                      "screen:newUser.email",
                      "screen:newUser.position",
                      "screen:newUser.password",
                      "screen:newUser.passwordConfirmation",
                    ],
                  },
                  options: { context: `screen:newUser.action` },
                },
              },
              {
                type: "Tabs",
                options: {
                  tabs: [
                    {
                      title: "Атрибуты",
                      block: {
                        type: "RowFields/GroupedFieldsList",
                        options: [
                          {
                            title: "Основные",
                            fieldList: {
                              mode: "vertical",
                              fields: [
                                {
                                  title: "Название",
                                  required: true,
                                  type: "edit:Text",
                                  options: {
                                    inputOptions: {
                                      width: "large",
                                      size: "large",
                                      context: `${context}.title`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.title` },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Текст анонса",
                                  type: "edit:Text",
                                  options: {
                                    inputOptions: {
                                      width: "large",
                                      size: "large",
                                      multiline: true,
                                      context: `${context}.announce`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.announce` },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Дата публикации",
                                  type: "edit:Date",
                                  options: {
                                    dateOptions: {
                                      width: "large",
                                      size: "large",
                                      context: `${context}.publishedAt`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.publishedAt` },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Категория",
                                  required: true,
                                  type: "edit:Dropdown",
                                  options: {
                                    dropdownOptions: {
                                      width: "small",
                                      size: "large",
                                      context: `${context}.category`,
                                      optionalActionButton: {
                                        title: "Добавить категорию",
                                        icon: "plus-big",
                                      },
                                    },
                                    dataSource: {
                                      type: "context",
                                      options: {
                                        key: `${tempContext}.categories`,
                                      },
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.category` },
                                      },
                                      optionalAction: {
                                        type: "open-modal",
                                        options: {
                                          name: "create-category",
                                        },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Автор",
                                  required: true,
                                  type: "edit:Dropdown",
                                  options: {
                                    dropdownOptions: {
                                      width: "small",
                                      size: "large",
                                      context: `${context}.author`,
                                      optionalActionButton: {
                                        title: "Добавить автора",
                                        icon: "plus-big",
                                      },
                                    },
                                    dataSource: {
                                      type: "context",
                                      options: {
                                        key: `${tempContext}.users`,
                                      },
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: {
                                          context: `${context}.author`,
                                        },
                                      },
                                      optionalAction: {
                                        type: "open-modal",
                                        options: {
                                          name: "create-user",
                                        },
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            title: "Мета",
                            fieldList: {
                              mode: "vertical",
                              fields: [
                                {
                                  title: "Символьный код",
                                  required: true,
                                  type: "edit:Text",
                                  hint: "Допустимы только символы английского алфавита, цифры и дефис",
                                  options: {
                                    inputOptions: {
                                      width: "large",
                                      size: "large",
                                      context: `${context}.code`,
                                    },
                                    modifier: {
                                      type: "toggle",
                                      title: "Генерировать символьный код из названия",
                                      context: `${context}.code-enableTransliteration`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.code` },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Заголовок",
                                  type: "edit:Text",
                                  options: {
                                    inputOptions: {
                                      width: "large",
                                      size: "large",
                                      context: `${context}.tagTitle`,
                                    },
                                    modifier: {
                                      type: "toggle",
                                      title: "Заголовок из названия",
                                      context: `${context}.tagTitle-takeFromTitle`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.tagTitle` },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Описание",
                                  type: "edit:Text",
                                  options: {
                                    inputOptions: {
                                      width: "large",
                                      size: "large",
                                      multiline: true,
                                      context: `${context}.tagDescription`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.tagDescription` },
                                      },
                                    },
                                  },
                                },
                                {
                                  title: "Ключевые слова",
                                  type: "edit:Tokens",
                                  options: {
                                    tokenOptions: {
                                      width: "large",
                                      context: `${context}.keywords`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.keywords` },
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            title: "Изображения",
                            fieldList: {
                              mode: "horizontal",
                              fields: [
                                {
                                  title: "Изображение анонса",
                                  type: "edit:Image",
                                  options: {
                                    imageOptions: {
                                      aspectRatio: 1.6,
                                      context: `${context}.announceImage`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.announceImage` },
                                      },
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
                                  title: "Изображение заголовка",
                                  type: "edit:Image",
                                  options: {
                                    imageOptions: {
                                      aspectRatio: 1.6,
                                      context: `${context}.contentImage`,
                                    },
                                    actions: {
                                      change: {
                                        type: "update-context",
                                        options: { context: `${context}.contentImage` },
                                      },
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
                                  title: "Фон",
                                  type: "edit:Image",
                                  options: {
                                    imageOptions: {
                                      aspectRatio: 1.6,
                                      context: `${context}.background`,
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
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      title: "Текст",
                      block: {
                        type: "ContextInitializer",
                        options: {
                          block: {
                            type: "HTMLEditor",
                            actions: {
                              change: {
                                type: "update-context",
                                options: { context: `${context}.content` },
                              },
                              upload: {
                                type: "api:uploadFile",
                                options: {
                                  reference: "/file_storage/store",
                                },
                              },
                            },
                            options: {
                              blocks: [
                                {
                                  type: "Actions/ButtonPopUp",
                                  options: {
                                    buttonOptions: { icon: "snowflake" },
                                    listItems: [
                                      {
                                        title: "Внутренняя статья",
                                        code: "add-inner-article-link-in-content",
                                        leftContent: "dashboard",
                                        action: {
                                          type: "open-modal",
                                          options: {
                                            name: "add-inner-article-link-in-content",
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            dataSource: {
                              type: "context",
                              options: {
                                key: `${context}.content`,
                              },
                            },
                          },
                        },
                      },
                    },
                    {
                      title: "Статьи по теме",
                      block: {
                        type: "Layout/DefaultContainer",
                        slots: {
                          headerContent: {
                            type: "ContextInitializer",
                            options: {
                              static: [{ path: `${relatedArticlesContext}.search`, value: "" }],
                              block: {
                                type: "Actions/PopupListSelector",
                                options: {
                                  context: relatedArticlesContext,
                                  selectedItems: { context: `${context}.relatedArticles` },
                                  buttonOptions: { name: "Добавить статью", icon: "plus-big" },
                                  searchInputOptions: { context: `${relatedArticlesContext}.search` },
                                },
                                actions: {
                                  select: {
                                    type: "update-context",
                                    options: { context: `${context}.relatedArticles` },
                                  },
                                  search: {
                                    type: "update-context",
                                    options: { context: `${relatedArticlesContext}.search` },
                                  },
                                },
                                dataSource: {
                                  type: "api:request",
                                  contextPath: relatedArticlesContext,
                                  options: {
                                    reference: "/articles/simple-list",
                                    method: "get",
                                    body: {
                                      title: `=${relatedArticlesContext}.search`,
                                      page: "1",
                                      perPage: "20",
                                    },
                                  },
                                },
                              },
                            },
                          },
                          mainContent: {
                            type: "DataView/Cards",
                            dataSource: {
                              type: "context",
                              options: {
                                key: `${context}.relatedArticles`,
                              },
                            },
                            options: {
                              imageConfig: { aspectRatio: 1.6 },
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        actions: getActions({
          id: `=${context}.id`,
          title: `=${context}.title`,
          announce: `=${context}.announce`,
          author: `=${context}.author`,
          category: `=${context}.category`,
          code: `=${context}.code`,
          externalLink: `=${context}.externalLink`,
          keywords: `=${context}.keywords`,
          relatedArticles: `=${context}.relatedArticles`,
          status: `=${context}.status`,
          tagDescription: `=${context}.tagDescription`,
          tagTitle: `=${context}.tagTitle`,
          publishedAt: `=${context}.publishedAt`,
          background: `=${context}.background.id`,
          contentImage: `=${context}.contentImage.id`,
          announceImage: `=${context}.announceImage.id`,
          content: `=${context}.content`,
        }),
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
                        context: `screen:newCategory.title`,
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
                        context: `screen:newCategory.code`,
                      },
                      modifier: {
                        type: "toggle",
                        title: "Генерировать символьный код из названия",
                        context: `screen:newCategory.code-enableTransliteration`,
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
              options: { name: "Создать", size: "LARGE", context: `screen:newCategory.action` },
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
                    type: "append-context",
                    options: { context: `${tempContext}.categories` },
                  },
                  {
                    type: "close-modal",
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
                        active: "1",
                      },
                    },
                  },
                  {
                    type: "append-context",
                    options: { context: `${tempContext}.users` },
                  },
                  {
                    type: "close-modal",
                  },
                ],
              },
            },
          },
          "add-inner-article-link-in-content": {
            title: "Ссылка на статью",
            size: "ADJUST_CONTENT",
            block: {
              type: "ContextInitializer",
              options: {
                static: [
                  { path: `${tempContext}.editor.search`, value: "" },
                  { path: `${tempContext}.editor.selected-article-link`, value: "" },
                ],
                block: {
                  type: "Actions/ListSelector",
                  options: {
                    context: `${tempContext}.editor.articles-link`,
                    selectedItem: { context: `${tempContext}.editor.selected-article-link` },
                    searchInputOptions: { context: `${tempContext}.editor.search` },
                  },
                  actions: {
                    select: {
                      type: "update-context",
                      options: { context: `${tempContext}.editor.selected-article-link` },
                    },
                    search: {
                      type: "update-context",
                      options: { context: `${tempContext}.editor.search` },
                    },
                  },
                  dataSource: {
                    type: "api:request",
                    contextPath: `${tempContext}.editor.articles-link`,
                    options: {
                      reference: "/articles/simple-list",
                      method: "get",
                      body: {
                        title: `=${tempContext}.editor.search`,
                        page: "1",
                        perPage: "32",
                      },
                    },
                  },
                },
              },
            },
            actionBlock: {
              type: "Actions/Button",
              options: { name: "Добавить", size: "LARGE" },
              actions: {
                click: [
                  {
                    type: "modify-output-data-context",
                    options: {
                      resultOutput: `#article:{{${tempContext}.editor.selected-article-link}}#`,
                    },
                  },
                  {
                    type: "append-context",
                    options: {
                      context: `${context}.content`,
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
    },
  };
};
