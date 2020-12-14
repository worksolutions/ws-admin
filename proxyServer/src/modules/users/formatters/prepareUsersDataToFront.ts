import prepareUrl from "libs/prepareUrl";

export default function ({ data, meta }) {
  return {
    list: data.map((user) => ({
      id: user.id,
      user: {
        avatarReference: user.image ? prepareUrl(user.image.path) : null,
        name: user.name + " " + user.surname,
        reference: "/user/" + user.id,
      },
      position: user.position,
      email: user.email,
      status: user.active ? "Активный" : "Заблокирован",
      actions: {
        list: [
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
      },
    })),
    pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
  };
}
