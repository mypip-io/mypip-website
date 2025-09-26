export interface EmailCapture {
  _id?: string
  email: string
  source: 'hero' | 'footer' | 'blog'
  subscribedAt: string
  ipAddress?: string
  userAgent?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  content: any[]
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  publishedAt: string
  tags?: string[]
  metaDescription?: string
}

export interface Testimonial {
  _id: string
  name: string
  company: string
  role?: string
  quote: string
  avatar?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  featured: boolean
}