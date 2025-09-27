'use client'

import { useState } from 'react'
import { posthog } from '@/lib/posthog'
import { getImageUrl } from '@/lib/sanity-queries'

// Inline minimal components
function PostItNote({ children, rotation = 0, color = 'yellow', className = '', style = {} }: {
  children: React.ReactNode
  rotation?: number
  color?: 'yellow' | 'pink' | 'blue' | 'green'
  className?: string
  style?: React.CSSProperties
}) {
  const colors = {
    yellow: 'bg-yellow-200',
    pink: 'bg-pink-200',
    blue: 'bg-blue-200',
    green: 'bg-green-200'
  }

  return (
    <div
      className={`${colors[color]} p-4 shadow-md transform ${className}`}
      style={{ rotate: `${rotation}deg`, ...style }}
    >
      {children}
    </div>
  )
}

function HandwrittenAnnotation({ children, position = 'bottom-right', color = 'red', className = '' }: {
  children: React.ReactNode
  position?: 'top-right' | 'bottom-right' | 'bottom-left'
  color?: 'red' | 'blue' | 'green'
  className?: string
}) {
  const colors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600'
  }

  return (
    <div className={`absolute ${position === 'top-right' ? 'top-0 right-0' : position === 'bottom-left' ? 'bottom-0 left-0' : 'bottom-0 right-0'} ${colors[color]} text-sm italic transform rotate-2 ${className}`}>
      {children}
    </div>
  )
}

function HighlightedText({ children, color = 'yellow' }: {
  children: React.ReactNode
  color?: 'yellow' | 'green'
}) {
  const colors = {
    yellow: 'bg-yellow-300',
    green: 'bg-green-300'
  }

  return (
    <span className={`${colors[color]} px-1`}>
      {children}
    </span>
  )
}

function EmailCapture({ source, placeholder = "Enter your email", buttonText = "Get Started", className = "" }: {
  source: 'hero' | 'footer' | 'blog'
  placeholder?: string
  buttonText?: string
  className?: string
}) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Get additional tracking data
      const utmParams = new URLSearchParams(window.location.search)

      // Submit to API route
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          utmSource: utmParams.get('utm_source') || '',
          utmMedium: utmParams.get('utm_medium') || '',
          utmCampaign: utmParams.get('utm_campaign') || '',
          referrer: document.referrer || '',
          userAgent: navigator.userAgent,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit email')
      }

      // Track email submission event
      posthog.capture('email_submitted', {
        source: source,
        email: email,
        form_location: source === 'hero' ? 'Hero Section' : source === 'footer' ? 'Footer Section' : 'Other'
      })

      setIsSubmitted(true)
      setEmail('')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Email submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`border-2 border-dashed border-green-500 p-6 bg-green-50 ${className}`}>
        <div className="text-green-600 text-lg">
          ✓ Thanks! We'll be in touch soon.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-3 border-2 border-dashed border-gray-400 bg-yellow-50 focus:outline-none focus:border-green-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </button>
      </div>
      {error && (
        <div className="text-red-600 text-sm italic mt-2">
          {error}
        </div>
      )}
    </form>
  )
}

interface HomePageProps {
  content: {
    hero: any
    features: any
    testimonials: any
    caseStudies: any
    newsletter: any
    seo: any
  }
  siteSettings: any
}

export default function HomePage({ content, siteSettings }: HomePageProps) {
  // Track page interactions
  const trackInteraction = (event: string, properties: any = {}) => {
    posthog.capture(event, properties)
  }

  return (
    <main className="min-h-screen bg-yellow-50 text-gray-800">
      {/* Hero Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {content.hero.headline || (
              <>
                Stop playing{' '}
                <span className="line-through text-gray-500">cold email</span>{' '}
                <span className="text-red-600">SDR roulette.</span>
                <br />
                <HighlightedText>Get qualified leads daily.</HighlightedText>
              </>
            )}
          </h1>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            This is the key! →
          </HandwrittenAnnotation>

          <div className="mb-12 relative">
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              {content.hero.subheadline ||
                "No more 120k SDR teams. No more reputation-killing spam tools. No more 20-hour weeks for 3% reply rates."
              }
            </p>

            <div className="absolute -right-8 -top-4 w-20 h-16 hidden md:block bg-amber-200 rounded-full opacity-30"></div>
          </div>

          <EmailCapture
            source="hero"
            placeholder="your.email@company.com"
            buttonText={content.hero.ctaText || "Get My Lead Pipeline"}
            className="max-w-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      {content.features && (
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {content.features.title || "Why Choose MyPip?"}
            </h2>
            {content.features.subtitle && (
              <p className="text-xl text-gray-600">
                {content.features.subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(content.features.features || []).map((feature: any, index: number) => (
              <div key={index} className="border-2 border-dashed border-gray-300 p-6 bg-yellow-100/50">
                {feature.icon && (
                  <div className="text-3xl mb-4">{feature.icon}</div>
                )}
                {feature.image && (
                  <img
                    src={getImageUrl(feature.image, 300, 200) || ''}
                    alt={feature.title}
                    className="w-full h-32 object-cover mb-4 rounded"
                  />
                )}
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-800/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {content.testimonials && content.testimonials.testimonials && content.testimonials.testimonials.length > 0 && (
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {content.testimonials.title || "What Our Customers Say"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.testimonials.slice(0, 2).map((testimonial: any, index: number) => (
              <div key={index} className="border-2 border-dashed border-gray-300 bg-yellow-100 p-8 shadow-lg transform rotate-1">
                <div className="flex items-start space-x-4">
                  {testimonial.authorImage && (
                    <img
                      src={getImageUrl(testimonial.authorImage, 64, 64) || ''}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <blockquote className="text-lg italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="font-semibold">{testimonial.author}</div>
                    {testimonial.authorTitle && (
                      <div className="text-sm text-gray-800/70">{testimonial.authorTitle}</div>
                    )}
                    {testimonial.rating && (
                      <div className="text-yellow-500 mt-2">
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {content.caseStudies && content.caseStudies.caseStudies && content.caseStudies.caseStudies.length > 0 && (
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {content.caseStudies.title || "Real Results"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {content.caseStudies.caseStudies.slice(0, 3).map((caseStudy: any, index: number) => (
              <PostItNote key={index} rotation={[-2, 1, -1][index]} className="animate-pulse">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">{caseStudy.title}</h3>
                  <p className="text-sm mb-4">{caseStudy.summary}</p>
                  {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                    <div className="space-y-2">
                      {caseStudy.metrics.slice(0, 2).map((metric: any, metricIndex: number) => (
                        <div key={metricIndex}>
                          <div className="text-2xl font-bold text-green-600">{metric.value}</div>
                          <div className="text-sm">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PostItNote>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center">
          <PostItNote rotation={1} color="yellow" className="inline-block mb-8 animate-pulse">
            <div className="text-center">
              <div className="text-xl font-bold mb-2">
                {content.newsletter.title || "Ready to stop the roulette?"}
              </div>
              <div className="text-sm">
                {content.newsletter.description || "Get your first qualified leads in 2 weeks"}
              </div>
            </div>
          </PostItNote>

          <EmailCapture
            source="footer"
            placeholder={content.newsletter.placeholderText || "your.email@company.com"}
            buttonText={content.newsletter.buttonText || "Start My Pipeline"}
            className="max-w-lg mx-auto"
          />

          <p className="text-sm text-gray-800/60 mt-4 italic">
            No spam. No long-term contracts. Just qualified leads.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t-2 border-dashed border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <a
              href="/blog"
              className="inline-block border-2 border-dashed border-gray-400 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 transform hover:rotate-1 transition-all"
            >
              📝 Read Our Blog
            </a>
          </div>
          <div className="italic text-gray-500">
            {siteSettings?.footerContent?.aboutText || "Built by founders, for founders. Because we get it."}
          </div>
          <div className="mt-4 text-xs text-gray-400">
            {siteSettings?.footerContent?.copyrightText || `© ${new Date().getFullYear()} MyPip. Stop playing SDR roulette.`}
          </div>
        </div>
      </footer>
    </main>
  )
}