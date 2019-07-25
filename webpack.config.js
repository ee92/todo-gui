const path = require('path');

module.exports = {
  entry: './src/render/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};