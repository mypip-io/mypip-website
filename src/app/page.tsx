import { Suspense } from 'react'
import { sanityFetch } from '@/sanity/lib/live'
import { defaultContent } from '@/lib/sanity-queries'
import HomePage from '@/components/HomePage'

// Server component to fetch data
export default async function Page() {
  // Fetch content from Sanity using live API
  const landingPageQuery = `*[_type == "landingPage"][0]{
    heroSection{
      headline,
      subheadline,
      ctaText,
      ctaUrl,
      backgroundImage{
        asset->{
          _id,
          url
        }
      }
    },
    featuresSection{
      title,
      subtitle,
      features[]{
        title,
        description,
        icon,
        image{
          asset->{
            _id,
            url
          }
        }
      }
    },
    testimonialsSection{
      title,
      testimonials[]{
        quote,
        author,
        authorTitle,
        authorImage{
          asset->{
            _id,
            url
          }
        },
        rating
      }
    },
    caseStudiesSection{
      title,
      caseStudies[]{
        title,
        summary,
        metrics[]{
          label,
          value
        },
        image{
          asset->{
            _id,
            url
          }
        },
        link
      }
    },
    newsletterSection{
      title,
      description,
      buttonText,
      placeholderText
    },
    seoTitle,
    seoDescription,
    ogImage{
      asset->{
        _id,
        url
      }
    }
  }`

  const siteSettingsQuery = `*[_type == "siteSettings"][0]{
    companyInfo{
      companyName,
      tagline,
      description,
      logo{
        asset->{
          _id,
          url
        }
      },
      favicon{
        asset->{
          _id,
          url
        }
      }
    },
    contactInfo{
      email,
      phone,
      address,
      supportEmail
    },
    socialMedia,
    navigation{
      headerLinks[]{
        label,
        url,
        isExternal
      },
      footerLinks[]{
        section,
        links[]{
          label,
          url,
          isExternal
        }
      }
    },
    footerContent{
      copyrightText,
      aboutText,
      newsletterTitle,
      newsletterDescription
    },
    seoDefaults{
      defaultTitle,
      titleTemplate,
      defaultDescription,
      defaultOgImage{
        asset->{
          _id,
          url
        }
      },
      twitterHandle
    },
    analytics{
      googleAnalyticsId,
      postHogKey,
      postHogHost
    },
    legalPages{
      privacyPolicyUrl,
      termsOfServiceUrl,
      cookiePolicyUrl
    }
  }`

  const [{ data: landingPageContent }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: landingPageQuery }),
    sanityFetch({ query: siteSettingsQuery })
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