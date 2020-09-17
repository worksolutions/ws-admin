/* eslint-disable max-lines */
module.exports = function (context, getActions) {
  return {
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
            context: `${context}.status`,
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
        type: "Tabs",
        options: [
          {
            title: "Атрибуты",
            block: {
              type: "RowFields/DynamicGroupedFieldsList",
              options: [
                {
                  title: "Основные",
                  fieldList: {
                    mode: "HORIZONTAL",
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
                              context: `${context}.title`,
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
                              context: `${context}.announce`,
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
                              context: `${context}.publishedAt`,
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
                          },
                          dataSource: {
                            type: "api:request",
                            options: {
                              reference: "/categories-list",
                              method: "get",
                              params: {
                                page: "1",
                                perPage: "100",
                              },
                            },
                          },
                          actions: {
                            change: {
                              type: "update-context",
                              context: `${context}.category`,
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
                          },
                          dataSource: {
                            type: "api:request",
                            options: {
                              reference: "/users-list",
                              method: "get",
                              params: {
                                page: "1",
                                perPage: "100",
                              },
                            },
                          },
                          actions: {
                            change: {
                              type: "update-context",
                              context: `${context}.author`,
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
                    mode: "HORIZONTAL",
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
                          actions: {
                            change: {
                              type: "update-context",
                              context: `${context}.code`,
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
                          actions: {
                            change: {
                              type: "update-context",
                              context: `${context}.tagTitle`,
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
                              context: `${context}.tagDescription`,
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
                              context: `${context}.keywords`,
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
                    mode: "VERTICAL",
                    fields: [
                      {
                        title: "Изображение анонса",
                        type: "image",
                        options: { reference: `=${context}.announceImage.path`, aspectRatio: 1.6 },
                      },
                      {
                        title: "Изображение заголовка",
                        type: "image",
                        options: { reference: `=${context}.contentImage.path`, aspectRatio: 1.6 },
                      },
                      {
                        title: "Фон",
                        type: "image",
                        options: { reference: `=${context}.background.path`, aspectRatio: 1.6 },
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
                value: `=${context}.content`,
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
    }),
  };
};
