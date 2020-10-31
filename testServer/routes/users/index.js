const { makeProxy, prepareUrl } = require("../../libs");
const { assoc } = require("ramda");

module.exports = (app) => {
  makeProxy({ realServerUrl: "/api/users", expressMethodHandlerName: "get", handleUrl: "/api/users" }, app, {
    modifyResponse: ({ data, meta }) => {
      return {
        list: data.map((user) => ({
          id: user.id,
          user: {
            avatarReference: user.image ? prepareUrl(user.image.path) : null,
            name: user.name + " " + user.surname,
          },
          position: user.position,
          email: user.email,
          status: user.active ? "Активный" : "Заблокирован",
          actions: [
            {
              mode: "button",
              icon: "edit",
              iconColor: "gray-blue/07",
              action: [
                {
                  type: "api:request",
                  options: {
                    reference: `/users/${user.id}`,
                    method: "get",
                    saveToContext: "screen:temp-data",
                  },
                },
                {
                  type: "open-modal",
                  options: {
                    name: "edit-user-profile",
                  },
                },
              ],
            },
          ],
        })),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      };
    },
  });
  makeProxy(
    {
      realServerUrl: (req) => "/api/users/" + req.params.userId,
      expressMethodHandlerName: "get",
      handleUrl: "/api/users/:userId",
    },
    app,
    {
      modifyResponse: ({ user: { active, ...userData } }) => {
        const user = { ...userData, blocked: !active };
        if (!user.image) return { user };
        return { user: assoc("image", assoc("path", prepareUrl(user.image.path), user.image), user) };
      },
    },
  );
  makeProxy({ realServerUrl: "/api/users", expressMethodHandlerName: "get", handleUrl: "/api/users-list" }, app, {
    modifyResponse: ({ data }) => {
      return data.map((user) => ({
        code: user.id,
        title: user.name + " " + user.surname,
        leftContent: user.image ? prepareUrl(user.image.path) : null,
        subTitle: `${user.position} • ${user.email}`,
        blocked: !user.active,
      }));
    },
  });
  makeProxy(
    { realServerUrl: "/api/users/store", expressMethodHandlerName: "post", handleUrl: "/api/users/store" },
    app,
    {
      modifyResponse: ({ user }) => ({
        code: user.id,
        title: user.name + " " + user.surname,
        leftContent: user.image ? prepareUrl(user.image.path) : null,
        subTitle: `${user.position} • ${user.email}`,
        blocked: !user.active,
      }),
    },
  );
  makeProxy(
    { realServerUrl: "/api/users/update", expressMethodHandlerName: "post", handleUrl: "/api/users/update" },
    app,
    {
      modifyResponse: ({ user: { active, ...userData } }) => ({
        ...userData,
        blocked: !active,
      }),
      modifyRequest: ({ requestParams: { data } }) => {
        const resultData = { ...data, active: !data.blocked };
        delete resultData.blocked;
        return { data: resultData };
      },
    },
  );
};
