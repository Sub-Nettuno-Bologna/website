import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.SANITY_PROJECT;
const apiToken = process.env.SANITY_READ_TOKEN;

console.log('projectId', projectId);
console.log('apiToken', apiToken);

if (!projectId) {
  throw new Error('Missing env SANITY_PROJECT');
}

export const client = createClient({
  apiVersion: '2021-08-31',
  dataset: 'production',
  projectId,
  token: apiToken,
  useCdn: true,
});
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
