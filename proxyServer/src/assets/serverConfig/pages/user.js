module.exports = {
  type: "Screen",
  options: {
    title: "Пользователь",
    reference: "/user/:userId",
  },
  blocks: [
    {
      type: "ContextInitializer",
      options: {
        static: [{ path: "screen:idUser", value: {} }],
        block: {
          type: "Pages/DefaultPageWithList",
          options: { title: "Профиль пользователя" },
          slots: {
            mainContent: {
              type: "UserProfile",
              dataSource: {
                type: "api:request",
                options: {
                  reference: "/users/{{screen:userId}}",
                  method: "get",
                  saveToContext: "screen:idUser",
                },
              },
            },
          },
        },
      },
    },
  ],
};
