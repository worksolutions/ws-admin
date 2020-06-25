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
  const data = success({
    title: "Контент",
    reference: "/content",
    items: [
      {
        name: "Структура сайта для раздела " + req.params.id,
        icon: "arrow-left",
        reference: "/content/structure",
        subElements: [],
      },
      {
        name: "SEO настройки",
        reference: "/content/seo",
        subElements: [],
      },
      {
        name: "Каталог товаров",
        icon: "arrow-up",
        reference: "/content/catalog",
        subElements: [
          {
            name: "Элементы",
            reference: "/content/catalog/elements",
          },
          {
            name: "Подарки",
            icon: "arrow-up",
            reference: "/content/catalog/gifts",
            subElements: [
              {
                name: "500 - 1000 руб",
                reference: "/content/catalog/gifts/500-1000",
                subElements: [
                  {
                    name: "Элементы",
                    reference: "/content/catalog/gifts/500-1000/elements",
                  },
                ],
              },
              {
                name: "До 500 руб.",
                reference: "/content/catalog/gifts/0-500",
                subElements: [
                  {
                    name: "Элементы с большим названием",
                    reference: "/content/catalog/gifts/0-500/elements",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  setTimeout(() => {
    res.json(data);
  }, 200);
});

app.get("/api/admin/background-tasks", (req, res) => {
  res.json(
    success([
      {
        name: "Импорт 1",
        status: "ACTIVE",
        text: "Импортировано 20 / 1933",
        percent: 0.6103,
      },
      {
        name: "Импорт 2",
        status: "COMPLETE",
      },
      {
        name: "Импорт 3",
        status: "ERROR",
        message: "Ошибка получения _id в базе данных",
      },
      {
        name: "Импорт 3",
        status: "ERROR",
        message: "Ошибка получения _id в базе данных",
      },
      {
        name: "Импорт 3",
        status: "ERROR",
        message: "Ошибка получения _id в базе данных",
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
