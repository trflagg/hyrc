const requireText = require('require-text');
const { buildSchema } = require('graphql');

const schema = requireText('./schema.graphql', require);

module.exports = buildSchema(schema);
