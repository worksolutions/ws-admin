// module.exports = require("../testServer/app-middleware");

const { createProxyMiddleware } = require("http-proxy-middleware");

const isDev = process.env.NODE_ENV === "development";

const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : "80";

module.exports = function (app) {
  if (isDev) {
    app.use("/api", createProxyMiddleware({ target: `http://localhost:${port}` }));
    return;
  }

  throw new Error("The setupProxy.js dont work on production mode.");
};
