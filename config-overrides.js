const rewireSvgLoader = require("react-app-rewire-external-svg-loader");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const ProgressPlugin = require("webpack").ProgressPlugin;

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireSvgLoader(config, env);
  config.plugins.push(
    new ProgressPlugin({
      entries: false,
      modules: true,
      activeModules: false,
    }),
  );

  return config;
};
