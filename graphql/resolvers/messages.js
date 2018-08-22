module.exports = db => {
  const argieMessageHandlers = require('argie/handlers/messages')(db);

  const resolvers = {
    messageList: async () => {
      const messageList = await argieMessageHandlers.loadAllMessages();
      return messageList.map(message => {
        return {
          name: message.getName(),
          text: message.getText(),
        };
      });
    },

    Message: {
      name: root => root.name,
      text: root => root.text,
    },
  };
  return resolvers;
}
