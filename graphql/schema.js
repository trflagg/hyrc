const requireText = require('require-text');
const { buildSchema } = require('graphql');

const schema = requireText('./schema.txt', require);

module.exports = buildSchema(schema);
