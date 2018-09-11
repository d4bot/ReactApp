const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/client.js'),
  output: {
    path: path.join(__dirname, 'src/static/js'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        //exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  watch: true
};