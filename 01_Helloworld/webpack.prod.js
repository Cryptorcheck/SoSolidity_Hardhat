const baseConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
  mode: "production",
});
