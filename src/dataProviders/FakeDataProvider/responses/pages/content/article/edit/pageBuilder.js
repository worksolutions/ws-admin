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
                { badgeColor: "gray-blue/05", code: "UN_PUBLISHED", title: "Не опубликовано" },
                { badgeColor: "green/05", code: "PUBLISHED", title: "Опубликовано" },
                { badgeColor: "orange/05", code: "DRAFT", title: "Черновик" },
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
                    contextPath: `${context}.code-enableTransliteration`,
                  },
                  options: { contextPath: `${context}.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "transliteration",
                  enableTrigger: {
                    type: "if-context-true-value",
                    contextPath: `${context}.code-enableTransliteration`,
                  },
                  options: { fromContextPath: `${context}.title`, toContextPath: `${context}.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: { type: "if-context-true-value", contextPath: `${context}.tagTitle-takeFromTitle` },
                  options: { contextPath: `${context}.tagTitle` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "copy-context",
                  enableTrigger: { type: "if-context-true-value", contextPath: `${context}.tagTitle-takeFromTitle` },
                  options: { fromContextPath: `${context}.title`, toContextPath: `${context}.tagTitle` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "exclude-array-items-by-id-from-context",
                  enableTrigger: { type: "always" },
                  options: {
                    fromContextPath: `${context}.relatedArticles`,
                    toContextPath: `${relatedArticlesContext}.list`,
                  },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "transliteration",
                  enableTrigger: {
                    type: "if-context-true-value",
                    contextPath: `screen:newCategory.code-enableTransliteration`,
                  },
                  options: { fromContextPath: `screen:newCategory.title`, toContextPath: `screen:newCategory.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-true-value",
                    contextPath: `screen:newCategory.code-enableTransliteration`,
                  },
                  options: { contextPath: `screen:newCategory.code` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-false-value",
                    mode: "or",
                    contextPath: [`screen:newCategory.title`, `screen:newCategory.code`],
                  },
                  options: { contextPath: `screen:newCategory.action` },
                },
              },
              {
                type: "Actions/Modifiers/ContextModifier",
                options: {
                  type: "model-disabler",
                  enableTrigger: {
                    type: "if-context-false-value",
                    mode: "or",
                    contextPath: [
                      `screen:newUser.firstName`,
                      `screen:newUser.lastName`,
                      "screen:newUser.email",
                      "screen:newUser.position",
                      "screen:newUser.password",
                      "screen:newUser.passwordConfirmation",
                    ],
                  },
                  options: { contextPath: `screen:newUser.action` },
                },
              },
              {
                type: "Tabs",
                options: {
                  tabs: [
                    {
                      title: "Атрибуты",
                      block: {
                        type: "RowFields/GroupedFieldsOnEdit",
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
                                    alignOptions: {
                                      titleAlign: "top",
                                    },
                                    inputOptions: {
                                      width: "large",
                                      size: "large",
                                      contextPath: `${context}.title`,
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
                                      contextPath: `${context}.announce`,
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
                                      contextPath: `${context}.publishedAt`,
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
                                      contextPath: `${context}.category`,
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
                                      contextPath: `${context}.author`,
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
                                      contextPath: `${context}.code`,
                                    },
                                    modifier: {
                                      type: "toggle",
                                      title: "Генерировать символьный код из названия",
                                      contextPath: `${context}.code-enableTransliteration`,
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
                                      contextPath: `${context}.tagTitle`,
                                    },
                                    modifier: {
                                      type: "toggle",
                                      title: "Заголовок из названия",
                                      contextPath: `${context}.tagTitle-takeFromTitle`,
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
                                      contextPath: `${context}.tagDescription`,
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
                                      contextPath: `${context}.keywords`,
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
                                      contextPath: `${context}.announceImage`,
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
                                      contextPath: `${context}.contentImage`,
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
                                      contextPath: `${context}.background`,
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
                              preview: [
                                {
                                  type: "update-context",
                                  options: { context: `${tempContext}.editor.isPreviewMode` },
                                },
                                {
                                  type: "open-modal",
                                  options: {
                                    name: "content-preview-modal",
                                  },
                                },
                              ],
                              change: [
                                {
                                  type: "update-context",
                                  options: { context: `${context}.content` },
                                },
                                {
                                  type: "update-context",
                                  options: { context: `${context}.enhancedContent` },
                                },
                              ],
                              upload: {
                                type: "api:uploadFile",
                                options: {
                                  reference: "/file_storage/store",
                                },
                              },
                            },
                            options: {
                              visibilityMode: { contextPath: `${tempContext}.editor.isPreviewMode` },
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
                                  contextPath: relatedArticlesContext,
                                  selectedItems: { contextPath: `${context}.relatedArticles` },
                                  buttonOptions: { name: "Добавить статью", icon: "plus-big" },
                                  searchInputOptions: { contextPath: `${relatedArticlesContext}.search` },
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
                    type: "append-context",
                    options: { contextPath: `${tempContext}.categories` },
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
                    options: { contextPath: `${tempContext}.users` },
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
                    contextPath: `${tempContext}.editor.articles-link`,
                    selectedItem: { contextPath: `${tempContext}.editor.selected-article-link` },
                    searchInputOptions: { contextPath: `${tempContext}.editor.search` },
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
                      contextPath: `${context}.content`,
                    },
                  },
                  {
                    type: "close-modal",
                  },
                ],
              },
            },
          },
          "content-preview-modal": {
            title: "Предпросмотр",
            size: "FULL_WIDTH",
            block: {
              type: "FormattedHTMLText",
              dataSource: {
                type: "api:request",
                contextPath: `${context}.enhancedContent`,
                options: {
                  reference: "/content/articles/{{screen:articleId}}/convert-enhancers",
                  method: "post",
                  body: {
                    content: `=${context}.content`,
                  },
                },
              },
            },
            actions: {
              close: [
                {
                  type: "modify-output-data-context",
                  options: {
                    resultValue: "",
                  },
                },
                {
                  type: "update-context",
                  options: {
                    context: `${tempContext}.editor.isPreviewMode`,
                    takeIncomeDataFromPreviousAction: true,
                  },
                },
              ],
            },
          },
        },
      },
    },
  };
};
