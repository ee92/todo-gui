const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/render/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: {
    electron: 'require("electron")'
  },
  module: {
    rules: [{
      test:/\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};