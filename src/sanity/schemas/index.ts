import { newsletterSignupSchema } from './newsletterSignup'
import { blogPostSchema } from './blogPost'
import { landingPageSchema } from './landingPage'
import { siteSettingsSchema } from './siteSettings'
import { pageSchema } from './page'

const schemas = [
  siteSettingsSchema,
  landingPageSchema,
  pageSchema,
  blogPostSchema,
  newsletterSignupSchema,
]

export {
  schemas,
  newsletterSignupSchema,
  blogPostSchema,
  landingPageSchema,
  siteSettingsSchema,
  pageSchema
}
export default schemas