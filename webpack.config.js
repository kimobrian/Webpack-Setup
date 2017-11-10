const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
require('dotenv').config()

module.exports = {
  entry: __dirname + "/src/app/index.js",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
      rules: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: [
              /node_modules/
            ]
        },
          {
              test: /\.html/,
              loader: 'raw-loader'
          },
          {
            test: /\.(sass|scss)$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: __dirname + "/src/public/index.html",
          inject: 'body'
      }),
      new webpack.DefinePlugin({
          API_KEY: JSON.stringify(process.env.API_KEY)
      }),
      new DashboardPlugin()
  ],
  devServer: {
      contentBase: './src/public',
      port: 7700,
  }
};
