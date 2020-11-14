const { createProxyMiddleware } = require("http-proxy-middleware");

const isDev = process.env.NODE_ENV === "development";

module.exports = function (app) {
  if (isDev) {
    app.use("/api", createProxyMiddleware({ target: `http://localhost:${process.env.NODE_PROXY_PORT}` }));
    return;
  }

  throw new Error("The setupProxy.js dont work on production mode.");
};
