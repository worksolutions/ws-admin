const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const proxy = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env" });

const mainConfig = require("../src/dataProviders/FakeDataProvider/responses/main-config");

function error(msg, errors = {}) {
  return {
    success: false,
    message: msg,
    errors,
  };
}

module.exports = (app) => {
  app.use(cookieParser());
  app.use((req, res, next) => {
    setTimeout(next, 200);
  });

  app.get("/api/admin/config", (_req, res) => res.json(mainConfig));

  app.use(
    proxy.createProxyMiddleware("/api", {
      target: process.env.DEV_API_HOST,
      changeOrigin: true,
      logLevel: "debug",
    }),
  );

  app.get("/api/admin/secondary-menu-config/:id", (req, res) => {
    const data = {
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
    };
    setTimeout(() => {
      res.json(data);
    }, 200);
  });

  app.get("/api/admin/background-tasks", (req, res) => {
    res.json([
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
    ]);
  });

  app.get("/api/admin/user", (req, res) => {
    if (req.cookies.token !== "Bearer test-token") {
      return res.status(401).json(error("Нужно авторизоваться"));
    }

    res.json({
      name: "Пользователь 1",
      email: "test@gmail.com",
    });
  });

  app.post("/api/admin/user/auth", ({ body }, res) => {
    if (body.email !== "test@gmail.com") {
      res.status(401).json(error(null, { email: "Пользователь не найден" }));
      return;
    }
    if (body.password !== "1234") {
      res.status(401).json(error(null, { password: "Не верный пароль" }));
      return;
    }

    return res.json({
      name: "Пользователь 1",
      email: "test@gmail.com",
      token: "Bearer test-token",
    });
  });

  app.get("/api/admin/user/1", (_req, res) =>
    res.json({
      name: "Тестовый пользователь",
    }),
  );

  app.post("/api/admin/user/update", (req, res) =>
    res.json({
      name: "Обновленный пользователь",
    }),
  );
};
