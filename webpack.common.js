const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        include: [
          path.resolve(__dirname, 'client/js/'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
    ],
  },
};
