const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const ramda = require("ramda");

dotenv.config({ path: __dirname + "/../.env" });

const mainConfig = require("../src/dataProviders/FakeDataProvider/responses/main-config");

function error(msg, errors = {}) {
  return {
    success: false,
    message: msg,
    errors,
  };
}

function prepareUrl(url) {
  return url.startsWith("http") ? url : process.env.DEV_API_HOST + url;
}

function makeProxy({ url, expressMethodHandlerName }, app, modifyResponse) {
  app[expressMethodHandlerName](url, (req, res) => {
    let chunks = "";
    req.on("data", (chunk) => {
      chunks += chunk;
    });
    req.on("end", async () => {
      try {
        const response = await axios(req.originalUrl, {
          method: req.method,
          baseURL: process.env.DEV_API_HOST,
          data: chunks,
          headers: {
            ...ramda.omit(["host"], req.headers),
            origin: process.env.DEV_API_HOST,
          },
        });
        if (modifyResponse) {
          const result = await modifyResponse(response.data, response.status);
          if (!ramda.isNil(result)) {
            response.data = result;
          }
        }
        res.status(response.status).send(response.data);
      } catch (e) {
        const { response } = e;
        if (!response) {
          console.log(e);
          res.status(500).json(error("proxy - internal server error"));
          return;
        }
        res.status(response.status).send(response.data);
      }
    });
  });
}

module.exports = (app) => {
  app.use(cookieParser());
  app.use((req, res, next) => setTimeout(next, 200));

  app.get("/api/admin/config", (_req, res) => res.json(mainConfig));

  makeProxy({ url: "/api/users/profile", expressMethodHandlerName: "get" }, app, ({ user }) => {
    if (!user.image) return;
    user.avatar = prepareUrl(user.image.path);
    user.name = `${user.name} ${user.surname} (${user.position})`;
    return user;
  });

  makeProxy({ url: "/api", expressMethodHandlerName: "use" }, app);

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
