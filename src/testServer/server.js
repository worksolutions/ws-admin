const express = require("express");
const mainConfig = require("../dataProviders/FakeDataProvider/responses/main-config.json");

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
