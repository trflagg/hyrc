
module.exports = async db => {

  const messageResolvers = await require('./resolvers/messages')(db);

  return {
    hello: () => {
      return 'Hello world!';
    },
    ...messageResolvers,
  };
}
