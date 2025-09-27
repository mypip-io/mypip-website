import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'

import { newsletterSignupSchema } from './src/sanity/schemas/newsletterSignup'
import { blogPostSchema } from './src/sanity/schemas/blogPost'
import { landingPageSchema } from './src/sanity/schemas/landingPage'
import { siteSettingsSchema } from './src/sanity/schemas/siteSettings'
import { pageSchema } from './src/sanity/schemas/page'

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
            // Site Configuration
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            S.divider(),

            // Content Management
            S.listItem()
              .title('🏠 Landing Page')
              .child(
                S.document()
                  .schemaType('landingPage')
                  .documentId('landingPage')
              ),

            S.listItem()
              .title('📄 Pages')
              .child(
                S.documentTypeList('page')
                  .title('Pages')
                  .defaultOrdering([{ field: 'pageType', direction: 'asc' }])
              ),

            S.listItem()
              .title('📝 Blog Posts')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),

            S.divider(),

            // User Engagement
            S.listItem()
              .title('📧 Newsletter Signups')
              .child(
                S.documentTypeList('newsletterSignup')
                  .title('Newsletter Signups')
                  .defaultOrdering([{ field: 'subscribedAt', direction: 'desc' }])
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
                      .title('Signup Sources')
                      .child(
                        S.documentTypeList('newsletterSignup')
                          .title('Signups by Source')
                          .filter('_type == "newsletterSignup"')
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
                    S.listItem()
                      .title('Published Pages')
                      .child(
                        S.documentTypeList('page')
                          .title('Published Pages')
                          .filter('_type == "page" && isActive == true')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                  ])
              ),
          ])
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: [
      siteSettingsSchema,
      landingPageSchema,
      pageSchema,
      blogPostSchema,
      newsletterSignupSchema,
    ],
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