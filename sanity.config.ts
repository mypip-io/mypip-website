import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'

import { emailSchema } from './src/sanity/schemas/email'
import { blogPostSchema } from './src/sanity/schemas/blogPost'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'mypip-studio',
  title: 'MyPip CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('MyPip Content')
          .items([
            // Email Submissions Section
            S.listItem()
              .title('📧 Email Submissions')
              .child(
                S.documentTypeList('email')
                  .title('Email Submissions')
                  .defaultOrdering([{ field: 'subscribedAt', direction: 'desc' }])
              ),

            S.divider(),

            // Blog Content Section
            S.listItem()
              .title('📝 Blog Posts')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),

            S.divider(),

            // Analytics Section
            S.listItem()
              .title('📊 Analytics')
              .child(
                S.list()
                  .title('Analytics')
                  .items([
                    S.listItem()
                      .title('Email Sources')
                      .child(
                        S.documentTypeList('email')
                          .title('Emails by Source')
                          .filter('_type == "email"')
                          .defaultOrdering([{ field: 'source', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('Featured Posts')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Featured Blog Posts')
                          .filter('_type == "blogPost" && featured == true')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                  ])
              ),
          ])
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: [emailSchema, blogPostSchema],
  },

  document: {
    // Hide 'Settings' from new document types
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'settings')
      }
      return prev
    },
  },

})