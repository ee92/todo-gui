const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development'

module.exports = [{
  mode: 'production',
  target: 'electron-main',
  entry: './main/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build', 'main')
  },
  module: {
    rules: [{
      test:/\.js$/,
      use: 'babel-loader'
    }]
  }
},
{
  mode: 'production',
  target: 'electron-renderer',
  entry: './render/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build', 'render')
  },
  module: {
    rules: [{
      test:/\.js$/,
      use: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [
        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './render/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
}];