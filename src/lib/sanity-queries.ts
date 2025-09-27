import { sanityClient } from './sanity'

// Landing Page Queries
export async function getLandingPageContent() {
  const query = `*[_type == "landingPage"][0]{
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

  try {
    const content = await sanityClient.fetch(query)
    return content
  } catch (error) {
    console.error('Error fetching landing page content:', error)
    return null
  }
}

// Site Settings Queries
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
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

  try {
    const settings = await sanityClient.fetch(query)
    return settings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Page Queries
export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug && isActive == true][0]{
    title,
    slug,
    pageType,
    pageHeader{
      headline,
      subheadline,
      backgroundImage{
        asset->{
          _id,
          url
        }
      }
    },
    content[]{
      _type,
      _type == "textBlock" => {
        title,
        content
      },
      _type == "imageBlock" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        caption,
        size
      },
      _type == "featuresGrid" => {
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
      _type == "pricingSection" => {
        title,
        subtitle,
        plans[]{
          name,
          price,
          period,
          description,
          features,
          ctaText,
          ctaUrl,
          isPopular
        }
      },
      _type == "ctaSection" => {
        title,
        description,
        buttonText,
        buttonUrl,
        backgroundImage{
          asset->{
            _id,
            url
          }
        }
      }
    },
    seoTitle,
    seoDescription,
    ogImage{
      asset->{
        _id,
        url
      }
    },
    publishedAt
  }`

  try {
    const page = await sanityClient.fetch(query, { slug })
    return page
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function getAllPages() {
  const query = `*[_type == "page" && isActive == true] | order(pageType asc, title asc){
    title,
    slug,
    pageType,
    seoTitle,
    seoDescription,
    publishedAt
  }`

  try {
    const pages = await sanityClient.fetch(query)
    return pages
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

// Blog Queries
export async function getAllBlogPosts() {
  const query = `*[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    publishedAt,
    author{
      name,
      bio,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    mainImage{
      asset->{
        _id,
        url
      }
    },
    categories[]->{
      title,
      slug
    },
    tags,
    featured,
    seoTitle,
    seoDescription
  }`

  try {
    const posts = await sanityClient.fetch(query)
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    author{
      name,
      bio,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    mainImage{
      asset->{
        _id,
        url
      }
    },
    categories[]->{
      title,
      slug
    },
    tags,
    featured,
    seoTitle,
    seoDescription,
    ogImage{
      asset->{
        _id,
        url
      }
    },
    estimatedReadingTime
  }`

  try {
    const post = await sanityClient.fetch(query, { slug })
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getFeaturedBlogPosts(limit: number = 3) {
  const query = `*[_type == "blogPost" && featured == true && publishedAt <= now()] | order(publishedAt desc)[0...$limit]{
    title,
    slug,
    excerpt,
    publishedAt,
    author{
      name
    },
    mainImage{
      asset->{
        _id,
        url
      }
    },
    categories[]->{
      title,
      slug
    }
  }`

  try {
    const posts = await sanityClient.fetch(query, { limit: limit - 1 })
    return posts
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

// Newsletter Signup Queries
export async function getNewsletterSignups() {
  const query = `*[_type == "newsletterSignup"] | order(subscribedAt desc){
    email,
    source,
    subscribedAt,
    utmSource,
    utmMedium,
    utmCampaign
  }`

  try {
    const signups = await sanityClient.fetch(query)
    return signups
  } catch (error) {
    console.error('Error fetching newsletter signups:', error)
    return []
  }
}

// Utility function to get image URL from Sanity
export function getImageUrl(image: any, width?: number, height?: number) {
  if (!image?.asset?.url) return null

  let url = image.asset.url

  if (width || height) {
    const params = new URLSearchParams()
    if (width) params.append('w', width.toString())
    if (height) params.append('h', height.toString())
    params.append('fit', 'crop')
    params.append('auto', 'format')

    url += `?${params.toString()}`
  }

  return url
}

// Default fallback content
export const defaultContent = {
  hero: {
    headline: "Build the Future with MyPip",
    subheadline: "The ultimate platform for modern software development. Fast, reliable, and scalable solutions for teams of all sizes.",
    ctaText: "Get Started",
    ctaUrl: "#signup"
  },
  features: {
    title: "Why Choose MyPip?",
    subtitle: "Everything you need to build, deploy, and scale your applications.",
    features: [
      {
        title: "Lightning Fast",
        description: "Optimized for performance with sub-second response times.",
        icon: "⚡"
      },
      {
        title: "Secure by Default",
        description: "Enterprise-grade security built into every component.",
        icon: "🔒"
      },
      {
        title: "Scalable Architecture",
        description: "Grows with your business from startup to enterprise.",
        icon: "📈"
      }
    ]
  },
  newsletter: {
    title: "Stay Updated",
    description: "Get the latest updates, features, and insights delivered to your inbox.",
    buttonText: "Subscribe",
    placeholderText: "Enter your email address"
  }
}