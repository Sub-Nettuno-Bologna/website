import { client } from '../helpers/sanity-client.js';

const query = `
    *[_type == "home-block"]{
      ...
    }|order(orderRank)
  `;

export default async function () {
  try {
    const data = await client.fetch(query);

    return data;
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
}
