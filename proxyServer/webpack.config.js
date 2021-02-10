const ProgressPlugin = require("webpack").ProgressPlugin;

module.exports = function (config) {
  config.plugins.push(
    new ProgressPlugin({
      entries: false,
      modules: true,
      activeModules: false,
    }),
  );

  return config;
};
