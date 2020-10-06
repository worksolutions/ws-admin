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
          icon: "book-open",
          reference: "/content/categories",
          subElements: [],
        },
      ],
    },
    contextPath: "menu.secondary-menu-items",
  },
};
