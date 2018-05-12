const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./app/index.tmpl.ejs"),
      cache: true,
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve("./app/vendors"),
        to: path.resolve("./dist/vendors")
      },
      {
        from: path.resolve("./app/styles"),
        to: path.resolve("./dist/styles")
      }
    ])
  ],
  devServer: {
    port: 9000,
    historyApiFallback: true,
    disableHostCheck: true
  },
  devtool: "source-map"
};
