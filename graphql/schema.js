const requireText = require('require-text');
const { buildSchema } = require('graphql');

const schema = requireText('./schema.txt', require);

console.log(schema);
module.exports = buildSchema(schema);
