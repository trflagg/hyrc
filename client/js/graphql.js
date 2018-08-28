import { request } from 'graphql-request';

const BASE_URL = '/graphql';

export async function runQuery(query, variables = {}) {
  console.log(`sending query: ${query}`);
  console.log(`with variables: ${JSON.stringify(variables)}`);

  return request(BASE_URL, query, variables).then(data => {
    console.log(`reply: ${JSON.stringify(data)}`);
    return data;
  });
};
