
module.exports = async db => {

  const messageResolvers = await require('./resolvers/messages')(db);
  const characterResolvers = await require('./resolvers/character')(db);

  return {
    hello: () => {
      return 'Hello world!';
    },
    ...messageResolvers,
    ...characterResolvers,
  };
}
