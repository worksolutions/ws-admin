module.exports = {
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
        },
        externalReference: "=screen:article.externalLink",
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
          options: { name: "Редактировать", icon: "edit-alt", type: "SECONDARY" },
          actions: {
            click: {
              type: "redirect",
              options: {
                reference: "/content/articles/{{screen:articleId}}/edit",
              },
            },
          },
        },
        mainContent: {
          type: "Tabs",
          options: {
            tabs: [
              {
                title: "Атрибуты",
                block: {
                  type: "RowFields/StaticGroupedFieldsList",
                  options: [
                    {
                      title: "Основные",
                      fieldList: {
                        mode: "HORIZONTAL",
                        fields: [
                          {
                            title: "Название",
                            type: "text",
                            options: { value: "=screen:article.title" },
                          },
                          {
                            title: "Текст анонса",
                            type: "text",
                            options: { value: "=screen:article.announce" },
                          },
                          {
                            title: "Дата публикации",
                            type: "text",
                            options: { value: "=screen:article.publishedAt" },
                          },
                          {
                            title: "Категория",
                            type: "text",
                            options: { value: "=screen:article.category.name" },
                          },
                          {
                            title: "Автор",
                            type: "icon-link",
                            options: {
                              title: "{{screen:article.author.name}} {{screen:article.author.surname}}",
                              imageReference: "=screen:article.author.image.path",
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
                            options: { value: "=screen:article.code" },
                          },
                          {
                            title: "Заголовок",
                            type: "text",
                            options: { value: "=screen:article.tagTitle" },
                          },
                          {
                            title: "Описание",
                            type: "text",
                            options: { value: "=screen:article.tagDescription" },
                          },
                          {
                            title: "Ключевые слова",
                            type: "text",
                            options: { value: "=screen:article.keywords" },
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
                            options: { reference: "=screen:article.announceImage.path", aspectRatio: 1.6 },
                          },
                          {
                            title: "Изображение заголовка",
                            type: "image",
                            options: { reference: "=screen:article.contentImage.path", aspectRatio: 1.6 },
                          },
                          {
                            title: "Фон",
                            type: "image",
                            options: { reference: "=screen:article.background.path", aspectRatio: 1.6 },
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
                  dataSource: {
                    type: "context",
                    options: {
                      key: "screen:article.enhancedContent",
                    },
                  },
                },
              },
              {
                title: "Статьи по теме",
                block: {
                  type: "Layout/DefaultContainer",
                  slots: {
                    mainContent: {
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
                },
              },
            ],
          },
        },
      },
    },
  ],
};
