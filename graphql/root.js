
module.exports = {
  hello: () => {
    return 'Hello world!';
  },
  messageList: () => {
    return [
      { name: 'hello' },
      { name: 'taylor' },
    ];
  },
  Message: {
    name: root => root.name,
    text: root => root.text,
  }
}
