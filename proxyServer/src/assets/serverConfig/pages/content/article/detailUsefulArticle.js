module.exports = {
  type: "Screen",
  options: {
    title: "Детальная статья",
    reference: "/content/useful_articles/:usefulArticleId",
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
              { badgeColor: "orange/05", code: "unpublished", title: "Не опубликовано" },
              { badgeColor: "green/05", code: "published", title: "Опубликовано" },
              { badgeColor: "gray-blue/05", code: "draft", title: "Черновик" },
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
          reference: "/useful_article/{{screen:usefulArticleId}}",
          method: "get",
        },
        contextPath: "screen:useful-article",
      },
      slots: {
        headingAction: {
          type: "Actions/Button",
          options: { name: "Редактировать", icon: "edit-alt", type: "SECONDARY" },
          actions: {
            click: {
              type: "redirect",
              options: {
                reference: "/content/useful_articles/{{screen:usefulArticleId}}/edit",
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
                  type: "RowFields/GroupedFieldsList/GroupedFieldsOnView",
                  options: [
                    {
                      title: "Основные",
                      fieldList: {
                        mode: "vertical",
                        fields: [
                          {
                            title: "Название",
                            type: "text",
                            options: { value: "=screen:useful-article.title" },
                          },
                          {
                            title: "Текст анонса",
                            type: "text",
                            options: { value: "=screen:useful-article.announce" },
                          },
                          {
                            title: "Дата публикации",
                            type: "text",
                            options: { value: "=screen:useful-article.publishedAt" },
                          },
                          {
                            title: "Категория",
                            type: "text",
                            options: { value: "=screen:useful-article.category.name" },
                          },
                          {
                            title: "Автор",
                            type: "icon-link",
                            options: {
                              title: "{{screen:useful-article.author.name}} {{screen:useful-article.author.surname}}",
                              imageReference: "=screen:useful-article.author.image.path",
                              reference: "/user/{{screen:useful-article.author.id}}",
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
                            type: "text",
                            options: { value: "=screen:useful-article.code" },
                          },
                          {
                            title: "Заголовок",
                            type: "text",
                            options: { value: "=screen:useful-article.tagTitle" },
                          },
                          {
                            title: "Описание",
                            type: "text",
                            options: { value: "=screen:useful-article.tagDescription" },
                          },
                          {
                            title: "Ключевые слова",
                            type: "text",
                            options: { value: "=screen:useful-article.keywords" },
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
                            type: "image",
                            options: { reference: "=screen:useful-article.announceImage.path", aspectRatio: 1.6 },
                          },
                          {
                            title: "Изображение заголовка",
                            type: "image",
                            options: { reference: "=screen:useful-article.contentImage.path", aspectRatio: 1.6 },
                          },
                          {
                            title: "Фон",
                            type: "image",
                            options: { reference: "=screen:useful-article.background.path", aspectRatio: 1.6 },
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
                      key: "screen:useful-article.enhancedContent",
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
                          reference: "/article/{{screen:usefulArticleId}}/related-articles",
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
