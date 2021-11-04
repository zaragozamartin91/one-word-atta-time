const path = require('path');

module.exports = {
  entry: './src/front.js',
  output: {
    path: path.resolve(__dirname, 'javascripts'),
    filename: 'front-bundle.js',
  },
};