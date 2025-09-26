import Link from 'next/link'
import PostItNote from '@/components/PostItNote'
import HandwrittenAnnotation from '@/components/HandwrittenAnnotation'

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 py-16 notebook-bg">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-12">
          <h1 className="text-6xl font-bold mb-6 text-ink-blue">404</h1>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            Oops! Not here
          </HandwrittenAnnotation>

          <div className="crossed-out text-2xl text-gray-500 mb-4">
            Page Found
          </div>
          <h2 className="red-correction handwritten text-2xl font-bold mb-8">
            Page Not Found
          </h2>
        </div>

        <PostItNote rotation={-1} color="yellow" className="inline-block mb-8">
          <div className="text-center">
            <div className="text-lg font-bold mb-2">Hmm, that's weird...</div>
            <div className="text-sm">This page seems to have wandered off</div>
          </div>
        </PostItNote>

        <div className="space-y-6">
          <p className="text-lg text-ink-blue/80">
            Looks like this page got lost in the notebook. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-ink-blue text-notebook-cream font-semibold hover:bg-ink-blue/90 dashed-border gentle-float"
            >
              ← Back to Home
            </Link>

            <Link
              href="/blog"
              className="px-6 py-3 border-2 border-ink-blue text-ink-blue font-semibold hover:bg-ink-blue hover:text-notebook-cream transition-colors dashed-border"
            >
              Check the Blog
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <div className="coffee-stain w-16 h-12 mx-auto opacity-50"></div>
        </div>
      </div>
    </main>
  )
}