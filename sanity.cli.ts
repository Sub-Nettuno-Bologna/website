import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    // projectId: '31d7d4ws',
    projectId: 'h3gj11wn',
    dataset: 'production',
  },
  project: {
    basePath: '/admin'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
