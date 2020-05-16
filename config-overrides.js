const rewireSvgLoader = require("react-app-rewire-external-svg-loader");
const ramda = require("ramda");
const Dotenv = require("dotenv-webpack");

module.exports = function override(config, env) {
  config = rewireSvgLoader(config, env, {});
  config = ramda.mergeDeepWith(ramda.concat, config, {
    plugins: [
      new Dotenv({
        path: "./.env",
        safe: true,
      }),
    ],
  });

  return config;
};
