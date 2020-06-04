const express = require("express");

const mainConfig = require("../src/dataProviders/FakeDataProvider/responses/main-config");

const app = express();
const port = 8080;

function success(data) {
  return {
    success: true,
    data,
  };
}
function error(msg) {
  return {
    success: false,
    message: msg,
  };
}

app.get("/api/admin/config", (_req, res) => res.json(success(mainConfig)));

app.get("/api/admin/secondary-menu-config/:id", (req, res) => {
  res.json(
    success([
      {
        name: "Структура сайта для раздела " + req.params.id,
        icon: "arrow-left",
        to: "/content/structure",
        subElements: [],
      },
      {
        name: "SEO настройки",
        to: "/content/seo",
        subElements: [],
      },
      {
        name: "Каталог товаров",
        icon: "arrow-up",
        to: "/content/catalog",
        subElements: [
          {
            name: "Элементы",
            to: "/content/catalog/elements",
          },
          {
            name: "Подарки",
            icon: "arrow-up",
            to: "/content/catalog/gifts",
            subElements: [
              {
                name: "500 - 1000 руб",
                to: "/content/catalog/gifts/500-1000",
                subElements: [
                  {
                    name: "Элементы",
                    to: "/content/catalog/gifts/500-1000/elements",
                  },
                ],
              },
              {
                name: "До 500 руб.",
                to: "/content/catalog/gifts/0-500",
                subElements: [
                  {
                    name: "Элементы",
                    to: "/content/catalog/gifts/0-500/elements",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]),
  );
});

app.get("/api/admin/user/1", (_req, res) =>
  res.json(
    success({
      name: "Тестовый пользователь",
    }),
  ),
);

app.post("/api/admin/user/update", (req, res) =>
  res.json(
    success({
      name: "Обновленный пользователь",
    }),
  ),
);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
