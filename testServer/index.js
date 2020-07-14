const express = require("express");
const path = require("path");

const appMiddleware = require("./app-middleware");

const app = express();

appMiddleware(app);

app.use(express.static(path.join(process.cwd(), "build")));

const port = 8080;

app.listen(port, () => {
  console.log("Ws admin listening on port", port);
});
