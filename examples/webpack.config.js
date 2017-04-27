var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'dist');

module.exports = {
  entry: path.join(srcPath, 'index.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  watch: true,
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true,
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
        include: [srcPath],
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
