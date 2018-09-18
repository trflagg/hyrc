const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [
          path.resolve(__dirname, 'client/js/'),
        ],
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client/js/'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'source-map-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      },
    ],
  },
};
