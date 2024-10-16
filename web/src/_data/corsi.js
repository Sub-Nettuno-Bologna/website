import { client } from '../helpers/sanity-client.js';

const query = `
    *[_type == "corso"]{
      ...
    } | order(title asc)
  `;

export default async function () {
  try {
    const fetched = await client.fetch(query);

    //console.log('Sanity data fetched successfully: ', fetched);

    return fetched;
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
}
