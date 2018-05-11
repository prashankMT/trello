const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "app/scripts/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /vendors/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[ext]"
            }
          }
        ]
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
