const rewireSvgLoader = require("react-app-rewire-external-svg-loader");
const ramda = require("ramda");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireSvgLoader(config, env);

  config = ramda.mergeDeepWith(ramda.concat, config, {
    plugins: [
      new Dotenv({
        path: "./.env",
      }),
      new webpack.EnvironmentPlugin({
        DEV_API_HOST: process.env.DEV_API_HOST,
      }),
    ],
  });

  return config;
};
