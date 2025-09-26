import EmailCapture from '@/components/EmailCapture'
import PostItNote from '@/components/PostItNote'
import HandwrittenAnnotation from '@/components/HandwrittenAnnotation'
import HighlightedText from '@/components/HighlightedText'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Stop playing{' '}
            <span className="crossed-out text-gray-500">cold email</span>{' '}
            <span className="red-correction">SDR roulette.</span>
            <br />
            <HighlightedText>Get qualified leads daily.</HighlightedText>
          </h1>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            This is the key! →
          </HandwrittenAnnotation>

          <div className="mb-12 relative">
            <p className="text-xl text-ink-blue/80 mb-8 max-w-2xl">
              No more 120k SDR teams. No more reputation-killing spam tools.
              No more 20-hour weeks for 3% reply rates.
            </p>

            <div className="coffee-stain absolute -right-8 -top-4 w-20 h-16 hidden md:block"></div>
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
          <div className="dashed-border p-8 bg-notebook-cream/50 gentle-rotate">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-xl font-semibold">Product Demo</p>
                <p className="text-sm text-gray-600 handwritten mt-2">2:34 duration</p>
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
          <PostItNote rotation={-2} className="gentle-float">
            <div className="text-center">
              <div className="text-3xl font-bold text-success-green">40%</div>
              <div className="text-lg font-semibold">Reply Rate</div>
              <div className="text-sm mt-2">vs. industry avg of 3%</div>
            </div>
          </PostItNote>

          <PostItNote rotation={1} color="blue" className="gentle-float" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-green">65%</div>
              <div className="text-lg font-semibold">Connection Rate</div>
              <div className="text-sm mt-2">LinkedIn acceptance</div>
            </div>
          </PostItNote>

          <PostItNote rotation={-1} color="green" className="gentle-float" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-green">3x</div>
              <div className="text-lg font-semibold">More Meetings</div>
              <div className="text-sm mt-2">vs. previous quarter</div>
            </div>
          </PostItNote>
        </div>
      </section>

      {/* Logo Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="handwritten text-ink-blue/60 mb-8">Trusted by startups from</p>
          <div className="dashed-border p-8 bg-notebook-cream/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
            <p className="handwritten text-sm text-ink-blue/60 mt-4">Logo placeholders</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="relative">
          <h2 className="text-3xl font-bold mb-8">
            The old way is <span className="crossed-out">broken</span>{' '}
            <span className="red-correction">completely broken</span>
          </h2>

          <div className="space-y-8">
            <div className="dashed-border p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                💸 Hire an SDR team
                <HandwrittenAnnotation position="top-right" className="relative ml-4">
                  $120k+ per year!
                </HandwrittenAnnotation>
              </h3>
              <p className="text-ink-blue/80">
                Junior SDRs cost $60k+ each. Senior ones? $120k+. Plus training,
                tools, management overhead. Most quit after 18 months.
              </p>
            </div>

            <div className="dashed-border p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                🚫 Use spam tools
                <HandwrittenAnnotation position="top-right" className="relative ml-4">
                  Ruins your reputation
                </HandwrittenAnnotation>
              </h3>
              <p className="text-ink-blue/80">
                Mass email tools get you blacklisted. Your domain reputation tanks.
                LinkedIn bans your account. Your brand becomes synonymous with spam.
              </p>
            </div>

            <div className="dashed-border p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-4">
                😵‍💫 DIY cold outreach
              </h3>
              <p className="text-ink-blue/80">
                20 hours per week. 3% reply rates. Endless spreadsheets.
                <span className="crossed-out ml-2">This is sustainable</span>{' '}
                <span className="red-correction handwritten">No it's not!</span>
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
                <div className="w-6 h-6 rounded-full bg-success-green flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">
                    <HighlightedText>Hyper-targeted research</HighlightedText>
                  </h3>
                  <p className="text-ink-blue/80 text-sm">
                    We find prospects who actually need your solution right now
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-success-green flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">Personalized outreach</h3>
                  <p className="text-ink-blue/80 text-sm">
                    Every message references specific company triggers and pain points
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-success-green flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">Multi-channel sequences</h3>
                  <p className="text-ink-blue/80 text-sm">
                    LinkedIn + Email + Phone in coordinated campaigns
                  </p>
                </div>
              </div>
            </div>

            <PostItNote rotation={2} color="green" className="gentle-float">
              <div className="space-y-2">
                <div className="handwritten font-bold">Remember:</div>
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
          <div className="torn-edge bg-notebook-cream p-8 shadow-lg gentle-rotate">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div className="flex-1">
                <blockquote className="text-lg italic mb-4">
                  "MyPip completely transformed our sales process. We went from
                  2-3 qualified meetings per month to 12-15. The ROI was immediate."
                </blockquote>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-ink-blue/70">Founder, TechStart</div>
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
          How it works <span className="handwritten text-sm text-ink-blue/60">(it's actually simple)</span>
        </h2>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="dashed-border p-6 bg-notebook-cream/50">
              <div className="text-2xl font-bold text-ink-blue mb-2">1.</div>
              <h3 className="font-semibold mb-2">Discovery Call</h3>
              <p className="text-sm text-ink-blue/80">
                We understand your ICP, value prop, and current sales process
              </p>
            </div>

            <div className="dashed-border p-6 bg-notebook-cream/50">
              <div className="text-2xl font-bold text-ink-blue mb-2">2.</div>
              <h3 className="font-semibold mb-2">Research & Setup</h3>
              <p className="text-sm text-ink-blue/80">
                We build your prospect database and craft personalized sequences
              </p>
            </div>

            <div className="dashed-border p-6 bg-notebook-cream/50">
              <div className="text-2xl font-bold text-ink-blue mb-2">3.</div>
              <h3 className="font-semibold mb-2">Launch & Optimize</h3>
              <p className="text-sm text-ink-blue/80">
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
          <PostItNote rotation={1} color="yellow" className="inline-block mb-8 gentle-float">
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

          <p className="text-sm text-ink-blue/60 mt-4 handwritten">
            No spam. No long-term contracts. Just qualified leads.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t-2 border-dashed border-ink-blue/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="handwritten text-ink-blue/60">
            Built by founders, for founders. Because we get it.
          </div>
          <div className="mt-4 text-xs text-ink-blue/40">
            © 2024 MyPip. Stop playing SDR roulette.
          </div>
        </div>
      </footer>
    </main>
  )
}