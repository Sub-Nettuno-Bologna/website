// sanity.cli.js
import { defineCliConfig } from 'sanity/cli';

require('dotenv').config({ path: '../.env' });

export default defineCliConfig({
  api: {
    dataset: process.env.GATSBY_SANITY_DATASET,
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  },
});
