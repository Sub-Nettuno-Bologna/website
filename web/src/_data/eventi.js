import { client } from '../helpers/sanity-client.js';

const query = `
    *[_type == "event"]{
      ...
    } | order(date desc)
  `;

export default async function () {
  try {
    const events = await client.fetch(query);

    return events;
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
}
