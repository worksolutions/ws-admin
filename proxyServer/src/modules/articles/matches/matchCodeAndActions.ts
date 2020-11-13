const getActionsForUnPublishedArticle = (articleId, dataSourceId) => ({
  name: "Опубликовать",
  icon: "bolt-alt",
  iconColor: "green/05",
  action: [
    {
      type: "api:request",
      options: {
        method: "post",
        reference: "/article/" + articleId + "/publish",
      },
    },
    {
      type: "notify",
      options: {
        text: `Статья успешно опубликована`,
      },
    },
    {
      type: "force-data-source-reload",
      options: {
        id: dataSourceId,
      },
    },
  ],
});

const getActionsForPublishedArticle = (articleId, dataSourceId) => ({
  name: "Снять с публикации",
  icon: "bolt-alt",
  iconColor: "orange/05",
  action: [
    {
      type: "api:request",
      options: {
        method: "post",
        reference: "/article/" + articleId + "/unpublish",
      },
    },
    {
      type: "notify",
      options: {
        text: `Статья успешно снята с публикации`,
      },
    },
    {
      type: "force-data-source-reload",
      options: {
        id: dataSourceId,
      },
    },
  ],
});

export default {
  0: getActionsForUnPublishedArticle,
  1: getActionsForPublishedArticle,
  2: getActionsForUnPublishedArticle,
};
