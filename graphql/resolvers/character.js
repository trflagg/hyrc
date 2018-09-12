module.exports = async db => {
  const argieCharacterHandlers = await require('argie/handlers/character')(db);

  const resolvers = {
    character: async () => {
      try {
        const loadedCharacter = await argieCharacterHandlers.getCharacter();
        return objectToClient(loadedCharacter);
      } catch(e) {
        if (e.name === 'NotFoundError') {
          const newCharacter = argieCharacterHandlers.newCharacter();
          newCharacter.setFirstName('New');
          newCharacter.setLastName('Character');
          newCharacter.setGender('FEMALE');
          return objectToClient(newCharacter);
        } else {
          throw e;
        }
      }
    },

    updateCharacter: async req => {
      const character = await
        argieCharacterHandlers.createOrUpdateCharacter(req.character);
      console.log(JSON.stringify(character));
      return objectToClient(character);
    },

    restartGame: async req => {
      const character = await
        argieCharacterHandlers.restartGame(req.character);
      return objectToClient(character);
    }
  }

  return resolvers;
}

function objectToClient(character) {
  return {
    firstName: character.firstName(),
    lastName: character.lastName(),
    gender: character.gender(),
    lastResult: character.lastResult,
    id: character.id(),
  }
}


