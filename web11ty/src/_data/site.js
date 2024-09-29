/* eslint-disable @typescript-eslint/no-require-imports */
// _data/sanity.js
const { client, urlFor } = require('../helpers/sanity-client');

// Define your GROQ query to fetch the data
const query = `
  *[_type == "siteSettings"]{
    title,
    description,
    subtitle,
    _id,
    headerImages[]{
      asset
    },
  }
`;

// Fetch the data from Sanity during the build
module.exports = async function () {
  try {
    const [sanityData] = await client.fetch(query);

    const { headerImages, ...data } = sanityData;

    data.headerImages = headerImages.map((img) => {
      return urlFor(img.asset).height(500).url();
    });

    //console.log('Sanity data fetched successfully: ', data);

    data.curYear = new Date().getFullYear();

    return data;
  } catch (err) {
    console.error('Error fetching Sanity data: ', err);
    return []; // Return an empty array if something goes wrong
  }
};
