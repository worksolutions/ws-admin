const { makeProxy, prepareUrl } = require("../../libs");

module.exports.users = (app) => {
  makeProxy(
    { realServerUrl: "/api/users", expressMethodHandlerName: "get", handleUrl: "/api/users" },
    app,
    ({ data, meta }) => {
      return {
        list: data.map((user) => ({
          id: user.id,
          user: {
            avatarReference: user.image.path ? prepareUrl(user.image.path) : null,
            name: user.name + " " + user.surname,
            reference: "/users/list/" + user.id,
          },
          position: user.position,
          email: user.email,
          status: user.active ? "Активный" : "Заблокирован",
          actions: [
            {
              mode: "button",
              icon: "edit",
              iconColor: "gray-blue/07",
              type: "redirect",
              options: {
                reference: "/",
              },
            },
          ],
        })),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      };
    },
  );
};