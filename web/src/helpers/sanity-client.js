require('dotenv').config({ path: '../.env' });
const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

const projectId = process.env.SANITY_PROJECT;
const apiToken = process.env.SANITY_READ_TOKEN;

console.log('projectId', projectId);
console.log('apiToken', apiToken);

if (!projectId) {
  throw new Error('Missing env SANITY_PROJECT');
}

const client = createClient({
  apiVersion: '2021-08-31',
  dataset: 'production',
  projectId,
  token: apiToken,
  useCdn: true,
});
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

module.exports = {
  client,
  urlFor,
};
