const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client/js/'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'client/sass/'),
        ],
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
