const { assoc } = require("ramda");
const moment = require("moment");

const { prepareUrl, makeProxy } = require("../../libs");

module.exports = (app) => {
  makeProxy(
    { realServerUrl: "/api/articles", expressMethodHandlerName: "get", handleUrl: "/api/articles/cards" },
    app,
    ({ data, meta }) => {
      return {
        list: data.map((article) => {
          const isPublished = article.status === 1;
          const action = {
            type: "redirect",
            options: {
              reference: "/",
            },
          };

          const result = {
            title: article.title,
            id: article.id,
            image: article.announceImage ? prepareUrl(article.announceImage.path) : null,
            redirectReference: "/content/articles/" + article.id,
            actions: [
              {
                name: "Редактировать",
                icon: "edit",
                iconColor: "gray-blue/05",
                action,
              },
            ],
          };

          if (isPublished) {
            result.heading = moment.unix(article.publishedAt).format("DD MMMM YYYY");
            result.statuses = [{ icon: "badge", color: "green/05", size: "SMALL", alternativeText: "Опубликовано" }];
            result.actions.push({ name: "Снять с публикации", icon: "bolt-alt", iconColor: "orange/05", action });
          } else {
            result.heading = moment.unix(article.createdAt).format("DD MMMM YYYY");
            result.statuses = [{ icon: "badge", color: "orange/05", size: "SMALL", alternativeText: "Черновик" }];
            result.actions.push({ name: "Опубликовать", icon: "bolt-alt", iconColor: "green/05", action });
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
