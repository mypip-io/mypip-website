import { Suspense } from 'react'
import { getLandingPageContent, getSiteSettings, defaultContent } from '@/lib/sanity-queries'
import HomePage from '@/components/HomePage'

// Server component to fetch data
export default async function Page() {
  // Fetch content from Sanity
  const [landingPageContent, siteSettings] = await Promise.all([
    getLandingPageContent(),
    getSiteSettings()
  ])

  // Merge with defaults
  const content = {
    hero: landingPageContent?.heroSection || defaultContent.hero,
    features: landingPageContent?.featuresSection || defaultContent.features,
    testimonials: landingPageContent?.testimonialsSection || null,
    caseStudies: landingPageContent?.caseStudiesSection || null,
    newsletter: landingPageContent?.newsletterSection || defaultContent.newsletter,
    seo: {
      title: landingPageContent?.seoTitle || siteSettings?.seoDefaults?.defaultTitle || 'MyPip',
      description: landingPageContent?.seoDescription || siteSettings?.seoDefaults?.defaultDescription || 'Build the Future with MyPip'
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage content={content} siteSettings={siteSettings} />
    </Suspense>
  )
}