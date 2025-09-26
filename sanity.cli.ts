import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  /**
   * Enable auto-updates for studios.
   * When set to `false`, you'll need to update manually or use `sanity update`.
   */
  autoUpdates: true,

  studioHost: 'mypip-cms', // This will create mypip-cms.sanity.studio
})