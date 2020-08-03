const moment = require("moment");
const { assoc } = require("ramda");

const { prepareUrl, makeProxy } = require("../../libs");

module.exports = (app) => {
  makeProxy(
    { realServerUrl: "/api/articles", expressMethodHandlerName: "get", handleUrl: "/api/articles/table" },
    app,
    ({ data, meta }) => {
      return {
        list: data.map((article) => {
          const isPublished = article.status === 1;

          const result = {
            id: article.id,
            announceImage: article.announceImage ? prepareUrl(article.announceImage.path) : null,
            name: {
              value: article.title,
              redirectReference: "/content/articles/" + article.id,
            },
            publishedAt: moment.unix(article.publishedAt).format("DD MMMM YYYY"),
            actions: [
              {
                mode: "dropdown",
                items: [
                  {
                    name: "Редактировать",
                    icon: "edit",
                    iconColor: "gray-blue/05",
                    type: "redirect",
                    options: {
                      reference: "/",
                    },
                  },
                ],
              },
            ],
          };

          if (isPublished) {
            result.status = {
              icon: {
                color: "green/05",
              },
              value: "Опубликовано",
            };
            result.actions[0].items.push({
              name: "Снять с публикации",
              icon: "bolt-alt",
              iconColor: "orange/05",
              type: "redirect",
              options: {
                reference: "/",
              },
            });
          } else {
            result.status = {
              icon: {
                color: "orange/05",
              },
              value: "Черновик",
            };
            result.actions[0].items.push({
              name: "Опубликовать",
              icon: "bolt-alt",
              iconColor: "green/05",
              type: "redirect",
              options: {
                reference: "/",
              },
            });
          }

          return result;
        }),
        pagination: { pagesCount: meta.last_page, itemsCount: meta.total },
      };
    },
    ({ params }) => {
      if (params.orderField === "publishedAt") return { params: assoc("orderField", "published_at", params) };
      return {};
    },
  );
};
