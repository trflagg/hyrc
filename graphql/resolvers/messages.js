module.exports = async db => {
  const argieMessageHandlers = await require('argie/handlers/messages')(db);

  const resolvers = {
    messageList: async () => {
      const messageList = await argieMessageHandlers.loadAllMessages();
      return messageList.map(message => {
        return objectToClient(message)
      });
    },

    createMessage: async req => {
      const newMessage = await argieMessageHandlers.createMessage(req.message);
      return objectToClient(newMessage);
    },

    updateMessage: async req => {
      const updatedMessage =
        await argieMessageHandlers.updateMessage(req.message);
      return objectToClient(updatedMessage);
    },

    createOrUpdateMessage: async req => {
      const newMessage =
        await argieMessageHandlers.createOrUpdateMessage(req.message);
      return objectToClient(newMessage);
    },

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
