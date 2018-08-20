const path = require('path');
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.dev.js');

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// use webpack-dev-middle in dev
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
}

let port = 3000
if (process.env.NODE_ENV === 'production') {
  port = 80;
}

if (!module.parent) app.listen(port, () => console.log(`listening on ${port}!`));

