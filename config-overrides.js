const rewireSvgLoader = require("react-app-rewire-external-svg-loader");
const rewireStyledComponents = require("react-app-rewire-styled-components");

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireSvgLoader(config, env);

  return config;
};
