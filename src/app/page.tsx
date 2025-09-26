'use client'

import { useState } from 'react'
import { posthog } from '@/lib/posthog'

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

export default function HomePage() {
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
            Stop playing{' '}
            <span className="line-through text-gray-500">cold email</span>{' '}
            <span className="text-red-600">SDR roulette.</span>
            <br />
            <HighlightedText>Get qualified leads daily.</HighlightedText>
          </h1>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            This is the key! →
          </HandwrittenAnnotation>

          <div className="mb-12 relative">
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              No more 120k SDR teams. No more reputation-killing spam tools.
              No more 20-hour weeks for 3% reply rates.
            </p>

            <div className="absolute -right-8 -top-4 w-20 h-16 hidden md:block bg-amber-200 rounded-full opacity-30"></div>
          </div>

          <EmailCapture
            source="hero"
            placeholder="your.email@company.com"
            buttonText="Get My Lead Pipeline"
            className="max-w-lg"
          />
        </div>
      </section>

      {/* Product Video Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="relative">
          <div className="border-2 border-dashed border-gray-300 p-8 bg-yellow-50 transform rotate-1">
            <div
              className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative cursor-pointer hover:bg-gray-300 transition-colors"
              onClick={() => trackInteraction('demo_video_clicked', { section: 'product_demo' })}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-xl font-semibold">Product Demo</p>
                <p className="text-sm text-gray-600 italic mt-2">2:34 duration</p>
              </div>
            </div>
          </div>

          <HandwrittenAnnotation position="bottom-right" color="blue">
            Watch this! It's quick
          </HandwrittenAnnotation>
        </div>
      </section>

      {/* Case Studies as Sticky Notes */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Real results from real founders
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <PostItNote rotation={-2} className="animate-pulse">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">40%</div>
              <div className="text-lg font-semibold">Reply Rate</div>
              <div className="text-sm mt-2">vs. industry avg of 3%</div>
            </div>
          </PostItNote>

          <PostItNote rotation={1} color="blue" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">65%</div>
              <div className="text-lg font-semibold">Connection Rate</div>
              <div className="text-sm mt-2">LinkedIn acceptance</div>
            </div>
          </PostItNote>

          <PostItNote rotation={-1} color="green" className="animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3x</div>
              <div className="text-lg font-semibold">More Meetings</div>
              <div className="text-sm mt-2">vs. previous quarter</div>
            </div>
          </PostItNote>
        </div>
      </section>

      {/* Logo Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="italic text-gray-500 mb-8">Trusted by startups from</p>
          <div className="border-2 border-dashed border-gray-300 p-8 bg-yellow-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
            <p className="italic text-sm text-gray-500 mt-4">Logo placeholders</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="relative">
          <h2 className="text-3xl font-bold mb-8">
            The old way is <span className="line-through">broken</span>{' '}
            <span className="text-red-600">completely broken</span>
          </h2>

          <div className="space-y-8">
            <div className="border-2 border-dashed border-gray-300 p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                💸 Hire an SDR team
                <HandwrittenAnnotation position="top-right" className="relative ml-4">
                  $120k+ per year!
                </HandwrittenAnnotation>
              </h3>
              <p className="text-gray-800/80">
                Junior SDRs cost $60k+ each. Senior ones? $120k+. Plus training,
                tools, management overhead. Most quit after 18 months.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                🚫 Use spam tools
                <HandwrittenAnnotation position="top-right" className="relative ml-4">
                  Ruins your reputation
                </HandwrittenAnnotation>
              </h3>
              <p className="text-gray-800/80">
                Mass email tools get you blacklisted. Your domain reputation tanks.
                LinkedIn bans your account. Your brand becomes synonymous with spam.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-4">
                😵‍💫 DIY cold outreach
              </h3>
              <p className="text-gray-800/80">
                20 hours per week. 3% reply rates. Endless spreadsheets.
                <span className="line-through ml-2">This is sustainable</span>{' '}
                <span className="text-red-600 italic">No it's not!</span>
              </p>
            </div>
          </div>

          <div className="coffee-stain absolute top-4 right-8 w-16 h-12 hidden md:block"></div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="relative">
          <h2 className="text-3xl font-bold mb-8">
            <HighlightedText color="green">Quality over quantity</HighlightedText> approach
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">
                    <HighlightedText>Hyper-targeted research</HighlightedText>
                  </h3>
                  <p className="text-gray-800/80 text-sm">
                    We find prospects who actually need your solution right now
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">Personalized outreach</h3>
                  <p className="text-gray-800/80 text-sm">
                    Every message references specific company triggers and pain points
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">Multi-channel sequences</h3>
                  <p className="text-gray-800/80 text-sm">
                    LinkedIn + Email + Phone in coordinated campaigns
                  </p>
                </div>
              </div>
            </div>

            <PostItNote rotation={2} color="green" className="animate-pulse">
              <div className="space-y-2">
                <div className="italic font-bold">Remember:</div>
                <div className="text-sm">• 10 perfect prospects &gt; 1000 random ones</div>
                <div className="text-sm">• Relevance beats volume every time</div>
                <div className="text-sm">• Quality conversations = Quality deals</div>
              </div>
            </PostItNote>
          </div>

          <HandwrittenAnnotation position="bottom-left" color="green">
            This is how we get 40% reply rates!
          </HandwrittenAnnotation>
        </div>
      </section>

      {/* Customer Testimonial */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="relative">
          <div className="border-2 border-dashed border-gray-300 bg-yellow-100 p-8 shadow-lg transform rotate-1">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div className="flex-1">
                <blockquote className="text-lg italic mb-4">
                  "MyPip completely transformed our sales process. We went from
                  2-3 qualified meetings per month to 12-15. The ROI was immediate."
                </blockquote>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-gray-800/70">Founder, TechStart</div>
              </div>
            </div>
          </div>

          <HandwrittenAnnotation position="top-right" color="green">
            Love this one!
          </HandwrittenAnnotation>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          How it works <span className="italic text-sm text-gray-800/60">(it's actually simple)</span>
        </h2>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-2 border-dashed border-gray-300 p-6 bg-yellow-100/50">
              <div className="text-2xl font-bold text-gray-800 mb-2">1.</div>
              <h3 className="font-semibold mb-2">Discovery Call</h3>
              <p className="text-sm text-gray-800/80">
                We understand your ICP, value prop, and current sales process
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 p-6 bg-yellow-100/50">
              <div className="text-2xl font-bold text-gray-800 mb-2">2.</div>
              <h3 className="font-semibold mb-2">Research & Setup</h3>
              <p className="text-sm text-gray-800/80">
                We build your prospect database and craft personalized sequences
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 p-6 bg-yellow-100/50">
              <div className="text-2xl font-bold text-gray-800 mb-2">3.</div>
              <h3 className="font-semibold mb-2">Launch & Optimize</h3>
              <p className="text-sm text-gray-800/80">
                We start outreach and continuously optimize based on response data
              </p>
            </div>
          </div>

          <div className="text-center">
            <PostItNote rotation={-1} className="inline-block">
              <div className="text-center">
                <div className="font-bold">Timeline:</div>
                <div className="text-sm">Week 1: Setup</div>
                <div className="text-sm">Week 2: First outreach</div>
                <div className="text-sm">Week 3: First meetings</div>
              </div>
            </PostItNote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center">
          <PostItNote rotation={1} color="yellow" className="inline-block mb-8 animate-pulse">
            <div className="text-center">
              <div className="text-xl font-bold mb-2">Ready to stop the roulette?</div>
              <div className="text-sm">Get your first qualified leads in 2 weeks</div>
            </div>
          </PostItNote>

          <EmailCapture
            source="footer"
            placeholder="your.email@company.com"
            buttonText="Start My Pipeline"
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
            Built by founders, for founders. Because we get it.
          </div>
          <div className="mt-4 text-xs text-gray-400">
            © 2024 MyPip. Stop playing SDR roulette.
          </div>
        </div>
      </footer>
    </main>
  )
}