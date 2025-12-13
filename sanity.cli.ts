import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    // TODO: temporary hardcoded values
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "r56dtkaq",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  },
  project: {
    basePath: "/admin",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    // TODO: temporary hardcoded values
    appId: process.env.SANITY_APP_ID || "t65rttw0xvavgd4lpvh14qt1",
    autoUpdates: true,
  },
});
