const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const moment = require("moment");
moment.locale("ru");

dotenv.config({ path: __dirname + "/../.env" });

const { error, makeProxy, configPath, removeConfigCache, prepareUserProfileToFront } = require("./libs");
const articlesCardsRouter = require("./routes/articles/cards");
const articlesTableRouter = require("./routes/articles/table");
const articleRouter = require("./routes/article");
const createArticleRouter = require("./routes/article/createAndUpdate");
const publishingRouter = require("./routes/article/publishing");
const categoriesRouter = require("./routes/categories");
const usersRouter = require("./routes/users");
const filesRouter = require("./routes/files");

module.exports = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => setTimeout(next, 200));

  app.get("/api/admin/config", (_req, res) => {
    res.json(require(configPath));
    removeConfigCache();
  });

  makeProxy({ handleUrl: "/api/users/profile", expressMethodHandlerName: "get" }, app, {
    modifyResponse: prepareUserProfileToFront,
  });

  makeProxy(
    { realServerUrl: "/api/users/update", expressMethodHandlerName: "post", handleUrl: "/api/admin/user/update" },
    app,
    {
      modifyResponse: prepareUserProfileToFront,
      modifyRequest: ({ requestParams: { data } }) => {
        const resultData = { ...data, active: !data.blocked };
        delete resultData.blocked;
        return { data: resultData };
      },
    },
  );

  articlesCardsRouter(app);
  articlesTableRouter(app);
  createArticleRouter(app);
  articleRouter(app);
  publishingRouter(app);
  categoriesRouter(app);
  usersRouter(app);
  filesRouter(app);

  makeProxy({ handleUrl: "/api", expressMethodHandlerName: "use" }, app);

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
};
