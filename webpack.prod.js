const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const commonWebpackConfig = require('./webpack.common.js');

module.exports = Merge(commonWebpackConfig, {
  mode: 'productin',
  entry: {
    main: './client/js/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js/'),
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin(['dist/js']),
  ],
});

