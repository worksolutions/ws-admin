const path = require("path");
const rewireSvgLoader = require("react-app-rewire-external-svg-loader");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const CopyPlugin = require("copy-webpack-plugin");

const customEditorFolder = path.join(__dirname, "node_modules", "edelgarat-ckeditor5-custom-build/build");
const buildFolder = "static/js";

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireSvgLoader(config, env);

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: path.join(customEditorFolder, "ckeditor.js"),
            to: path.join(buildFolder, "editor-custom-build.js"),
          },
        ],
      }),
    ],
  };
};
