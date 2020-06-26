const cookieParser = require("cookie-parser");
const proxy = require("http-proxy-middleware");

const mainConfig = require("./dataProviders/FakeDataProvider/responses/main-config");

const apiHost = process.env.API_HOST || "http://localhost";

module.exports = (app) => {
  app.use(cookieParser());

  app.get("/api/admin/config", (_req, res) => res.json(mainConfig));

  app.use(
    proxy.createProxyMiddleware("/api", {
      target: apiHost,
      changeOrigin: true,
    }),
  );
};
