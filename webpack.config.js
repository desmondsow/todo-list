const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
      mode: "development",

    entry: {
        background : './src/background/background.js',
        popup : './src/popup/main.js',
        test : './src/popup/test.js',
        stat: './src/stat/stat.js',
    },
    output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/[name].js",
    },
    devtool: "source-map",
    
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
   plugins: [
    new CleanWebpackPlugin(["dist"]),
     new HtmlWebpackPlugin({
      template: "src/popup/index.html",
      filename: "popup/index.html",
      chunks: ["popup"],
      inject : false
    }),new HtmlWebpackPlugin({
      template: "src/stat/stat.html",
      filename: "stat/stat.html",
      chunks: ["stat"], inject:false
    }),
    new HtmlWebpackPlugin({
      template: "src/background/background.html",
      filename: "background/background.html",
      chunks: ["background"], inject: false    }),
    new CopyWebpackPlugin([
      { from: "./src/manifest.json", to: "./manifest.json" },
      { from: "./src/assets", to: "./assets" },
      { from: "./src/popup/styles.css", to: "./popup/styles.css" },

    ]),
  ],
};