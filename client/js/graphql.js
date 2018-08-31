import { request } from 'graphql-request';

const BASE_URL = '/graphql';
const isProduction = (process.env.NODE_ENV === 'production');

export async function runQuery(query, variables = {}) {
  if (!isProduction) {
    console.log(`sending query: ${query}`);
    console.log(`with variables: ${JSON.stringify(variables)}`);
  }

  return request(BASE_URL, query, variables).then(data => {
    if (!isProduction) {
      console.log(`reply: ${JSON.stringify(data)}`);
    }
    return data;
  });
};
