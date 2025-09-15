const dotenv = require("dotenv");
dotenv.config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/connect_metamask/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/i,
      //   loader: ["style-loader", "css-loader"],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new webpack.DefinePlugin({
      "process.env.CONTRACT_ADDR": JSON.stringify(process.env.CONTRACT_ADDR),
    }),
  ],
};
