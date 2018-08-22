
module.exports = db => {

  const messageResolvers = require('./resolvers/messages')(db);

  return {
    hello: () => {
      return 'Hello world!';
    },
    ...messageResolvers,
  };
}
