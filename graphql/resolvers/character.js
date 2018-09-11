module.exports = async db => {
  const ValidationError = require('../validation-error');

  const resolvers = {
    character: async () => {
      return {
        id: '1234567890',
        name: 'Taylor the Bold',
        gender: 'FEMALE',
      }
    }
  }

  return resolvers;
}


