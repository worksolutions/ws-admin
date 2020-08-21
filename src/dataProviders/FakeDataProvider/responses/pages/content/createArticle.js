module.exports = {
  type: "Screen",
  options: {
    title: "Создание статьи",
    reference: "/content/create-article",
  },
  blocks: [
    {
      type: "ContextInitializer",
      id: "article-context",
      options: [{ path: "screen:article", value: { status: "UN_PUBLISHED" } }],
    },
    {
      type: "Pages/DefaultDetailEditPage",
      waitForId: "article-context",
      dataSource: {
        type: "context",
        options: { key: "screen:article" },
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
            value: "=screen:article.status",
          },
          actions: {
            change: {
              type: "update-context",
              context: "screen:article.status",
            },
          },
        },
        saveOptions: {
          context: "screen:article",
          requiredContextFields: ["screen:article.title"],
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
                          type: "edit:Text",
                          required: true,
                          options: {
                            inputOptions: {
                              width: "large",
                              size: "large",
                              context: "screen:article.title",
                            },
                            actions: {
                              change: {
                                type: "update-context",
                                context: "screen:article.title",
                              },
                            },
                          },
                        },
                        // {
                        //   title: "Текст анонса",
                        //   type: "edit:Text",
                        //   options: {
                        //     inputOptions: {
                        //       width: "large",
                        //       size: "large",
                        //       multiline: true,
                        //       value: "=screen:article.announce",
                        //     },
                        //     actions: {
                        //       change: {
                        //         type: "update-context",
                        //         context: "screen:article.announce",
                        //       },
                        //     },
                        //   },
                        // },
                        // {
                        //   title: "Дата публикации",
                        //   type: "edit:Date",
                        //   options: {
                        //     dateOptions: {
                        //       width: "large",
                        //       size: "large",
                        //       value: "=screen:article.publishedAt",
                        //     },
                        //     actions: {
                        //       change: {
                        //         type: "update-context",
                        //         context: "screen:article.publishedAt",
                        //       },
                        //     },
                        //   },
                        // },
                        // {
                        //   title: "Категория",
                        //   type: "text",
                        //   options: { value: "Выбор категории" },
                        // },
                        // {
                        //   title: "Автор",
                        //   type: "text",
                        //   options: { value: "Выбор автора" },
                        // },
                      ],
                    },
                  },
                  // {
                  //   title: "Мета",
                  //   fieldList: {
                  //     mode: "HORIZONTAL",
                  //     fields: [
                  //       {
                  //         title: "Символьный код",
                  //         type: "edit:Text",
                  //         required: true,
                  //         hint: "тест 132",
                  //         options: {
                  //           inputOptions: {
                  //             width: "large",
                  //             size: "large",
                  //             value: "=screen:article.code",
                  //           },
                  //           actions: {
                  //             change: {
                  //               type: "update-context",
                  //               context: "screen:article.code",
                  //             },
                  //           },
                  //         },
                  //       },
                  //       {
                  //         title: "Заголовок",
                  //         type: "edit:Text",
                  //         options: {
                  //           inputOptions: {
                  //             width: "large",
                  //             size: "large",
                  //             value: "=screen:article.tagTitle",
                  //           },
                  //           actions: {
                  //             change: {
                  //               type: "update-context",
                  //               context: "screen:article.tagTitle",
                  //             },
                  //           },
                  //         },
                  //       },
                  //       {
                  //         title: "Описание",
                  //         type: "edit:Text",
                  //         options: {
                  //           inputOptions: {
                  //             width: "large",
                  //             size: "large",
                  //             multiline: true,
                  //             value: "=screen:article.tagDescription",
                  //           },
                  //           actions: {
                  //             change: {
                  //               type: "update-context",
                  //               context: "screen:article.tagDescription",
                  //             },
                  //           },
                  //         },
                  //       },
                  //       {
                  //         title: "Ключевые слова",
                  //         type: "text",
                  //         options: { value: "Тут выбор ключевых слов" },
                  //       },
                  //     ],
                  //   },
                  // },
                  // {
                  //   title: "Изображения",
                  //   fieldList: {
                  //     mode: "VERTICAL",
                  //     fields: [
                  //       {
                  //         title: "Изображение анонса",
                  //         type: "image",
                  //         options: { reference: "=screen:article.announceImage.path", aspectRatio: 1.6 },
                  //       },
                  //       {
                  //         title: "Изображение заголовка",
                  //         type: "image",
                  //         options: { reference: "=screen:article.contentImage.path", aspectRatio: 1.6 },
                  //       },
                  //       {
                  //         title: "Фон",
                  //         type: "image",
                  //         options: { reference: "=screen:article.background.path", aspectRatio: 1.6 },
                  //       },
                  //     ],
                  //   },
                  // },
                ],
              },
            },
            {
              title: "Текст",
              block: {
                type: "FormattedHTMLText",
                options: {
                  value: "=screen:article.content",
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
      actions: {
        save: [
          {
            type: "api:request",
            options: {
              reference: "/create-article",
              method: "post",
              body: "=screen:article",
            },
          },
          {
            type: "redirect",
            options: {
              reference: "/content/articles/{{local:previousAction.id}}/edit",
            },
          },
        ],
        discard: {
          type: "redirect",
          options: {
            reference: "/content/articles",
          },
        },
      },
    },
  ],
};
