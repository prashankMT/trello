const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "app/scripts/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" }
      }
    ]
  },
  resolve: {
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js"
    }
  },
  devtool: "source-map"
};
