const server = require("../testServer/server");

module.exports = (app) => {
  server(app);
};

if (process.env.NODE_ENV === "production") {
  const express = require("express");
  const app = express();
  app.use(express.static(__dirname + "/../build"));
  server(app);
  app.listen(8080, () => console.log("listen at 8080"));
}
