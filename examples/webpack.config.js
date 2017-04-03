var webpack = require('webpack');
var path = require('path');
var examplesPath = path.join(__dirname, 'examples');

module.exports = {
  entry: path.join(examplesPath, 'index.js'),
  output: {
    path: examplesPath,
    filename: 'bundle.js',
  },
  watch: true,
  devServer: {
    contentBase: examplesPath,
    compress: true,
    host: '0.0.0.0',
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { presets: ['es2015', 'react'] },
        //exclude: [/node_modules/],
        include: [examplesPath],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
};
