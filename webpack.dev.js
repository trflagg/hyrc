const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');

const commonWebpackConfig = require('./webpack.common');

module.exports = Merge(commonWebpackConfig, {
  mode: 'development',
  entry: {
    main: './client/js/main.js',
  },
  devtool: 'inline-source-map',
  plugins: [
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
  },
});
