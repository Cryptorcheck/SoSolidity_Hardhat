const baseConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: 8080,
    hot: true,
  },
});
