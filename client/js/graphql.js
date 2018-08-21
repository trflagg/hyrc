import { request } from 'graphql-request';

const BASE_URL = '/graphql';

export async function runQuery(query) {
  console.log(`sending query: ${query}`);

  return request(BASE_URL, query).then(data => {
    console.log(`reply: ${JSON.stringify(data)}`);
    return data;
  });
};
