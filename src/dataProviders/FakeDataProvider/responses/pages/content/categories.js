module.exports = {
  type: "Screen",
  options: {
    title: "Категории",
    reference: "/content/categories",
  },
  blocks: [
    {
      type: "Pages/DefaultPageWithList",
      options: { title: "Категории" },
      slots: {
        headingAction: {
          type: "Actions/Button",
          options: { name: "Добавить", icon: "plus-big" },
          actions: {
            click: {
              type: "redirect",
              options: {
                reference: "/test",
              },
            },
          },
        },
        mainContent: {
          type: "DataView/FormattedData",
          options: {
            id: "categories",
            tableView: {
              options: {
                selectable: false,
                columns: [
                  {
                    title: "Название",
                    field: "name",
                    type: "STRING",
                    sortable: false,
                  },
                  {
                    title: "Символьный код",
                    field: "code",
                    type: "STRING",
                    sortable: false,
                  },
                  {
                    title: "",
                    field: "actions",
                    type: "ACTIONS",
                    sortable: false,
                  },
                ],
                sortingOptions: {
                  initialValue: "=screen:categories.sorting",
                },
              },
              dataSource: {
                type: "api:request",
                options: {
                  reference: "/categories",
                  method: "get",
                  body: {
                    page: "=screen:categories.pagination.page",
                    perPage: "=screen:categories.pagination.perPage",
                  },
                },
              },
            },
            paginationView: {
              options: {
                paginationItems: [8, 16, 32],
              },
              dataSource: {
                type: "context",
                options: {
                  key: "screen:categories.pagination",
                },
              },
              actions: {
                change: {
                  type: "update-context",
                  options: { context: "screen:categories.pagination" },
                },
              },
            },
            showMode: "table",
          },
        },
      },
    },
  ],
};
