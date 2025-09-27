import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },

  deployment: {
    appId: 'u5wvk73wi6qinbxgiqiftdyw',
    autoUpdates: true,
  },

  studioHost: 'mypip-cms', // This will create mypip-cms.sanity.studio
})