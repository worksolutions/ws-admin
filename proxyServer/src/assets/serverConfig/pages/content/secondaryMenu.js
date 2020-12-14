module.exports = {
  type: "SecondarySideMenu",
  dataSource: {
    type: "static",
    options: {
      id: "secondary-menu",
      title: "Контент",
      reference: "/content",
      items: [
        {
          name: "Статьи",
          icon: "content-multiple",
          reference: "/content/articles",
          subElements: [],
        },
        {
          name: "Категории",
          icon: "notes",
          reference: "/content/categories",
          subElements: [],
        },
        {
          name: "Полезные статьи",
          icon: "content-multiple",
          reference: "/content/useful_articles",
          subElements: [],
        },
      ],
    },
    contextPath: "menu.secondary-menu-items",
  },
};
