module.exports = async db => {
  const argieMessageHandlers = await require('argie/handlers/messages')(db);
  const ValidationError = require('../validation-error');

  const resolvers = {
    messageList: async () => {
      const messageList = await argieMessageHandlers.loadAllMessages();
      return messageList.map(message => {
        return objectToClient(message)
      });
    },

    createMessage: async req => {
      const newMessage = await argieMessageHandlers.createMessage(req.message);
      return { id: newMessage.id().toString() };
    },

    updateMessage: async req => {
      try {
        const updatedMessage =
          await argieMessageHandlers.createOrUpdateMessage(req.message);
        return objectToClient(updatedMessage);
      } catch (error) {
        if (error.name === 'UserError') {
          throw new ValidationError(error.state, error.message);
        }
        throw error;
      }
    },

    deleteMessage: async req => {
      await argieMessageHandlers.deleteMessage(req.message);
      return req.message;
    }
  };
  return resolvers;
}

function objectToClient(message) {
  return {
    id: message.id(),
    name: message.getName(),
    text: message.getText(),
  }
}
