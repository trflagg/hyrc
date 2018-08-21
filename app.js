const path = require('path');
const express = require('express');

const graphqlHTTP = require('express-graphql');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.dev.js');

const Db = require('argieDB/db');

const graphQLSchema = require('./graphql/schema.js');
const graphQLRoot = require('./graphql/root.js');

const app = express()

// set up db connection
let environment = require('./db-environment-default');
if (process.env.DB_ENV === 'compose') {
  environment = require('./db-environment-compose');
}

let hiddenDBString = environment.db.URL.replace(/:\/\/.*:(.*)@/, 'XXXXXXXXX');
console.log(`Connecting to ${hiddenDBString}`);
const db = new Db(environment);
console.log('Connected');

// use webpack-dev-middle in dev
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
}

// serve static files out of /dist
app.use(express.static('dist'));


// handler
const useGraphiQL = (process.env.NODE_ENV !== 'development');
app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLRoot,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// start it up
let port = 3000
if (process.env.NODE_ENV === 'production') {
  port = 80;
}

if (!module.parent) app.listen(port, () => console.log(`listening on ${port}!`));

