const { GraphQLError } = require('graphql');

// stolen from
// https://medium.com/@tarkus/validation-and-user-errors-in-graphql-mutations-39ca79cd00bf
module.exports = class ValidationError extends GraphQLError {
  constructor(errors, message) {
    super(message);
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
}
