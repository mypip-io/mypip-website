'use client'

import { useEffect } from 'react'
import PostItNote from '@/components/PostItNote'
import HandwrittenAnnotation from '@/components/HandwrittenAnnotation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen px-6 py-16 notebook-bg">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-12">
          <h1 className="text-4xl font-bold mb-6 text-ink-blue">
            Something went really wrong!
          </h1>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            Critical error!
          </HandwrittenAnnotation>

          <div className="crossed-out text-xl text-gray-500 mb-4">
            Everything is working perfectly
          </div>
          <p className="red-correction handwritten text-lg font-bold mb-8">
            Houston, we have a problem
          </p>
        </div>

        <PostItNote rotation={1} color="pink" className="inline-block mb-8">
          <div className="text-center">
            <div className="text-lg font-bold mb-2">Critical Error!</div>
            <div className="text-sm">Something fundamental broke. Let's start over.</div>
          </div>
        </PostItNote>

        <div className="space-y-6">
          <p className="text-lg text-ink-blue/80">
            This is embarrassing. Something went wrong at the core level.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="dashed-border p-4 bg-red-50 text-left">
              <p className="font-mono text-sm text-red-700">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-ink-blue text-notebook-cream font-semibold hover:bg-ink-blue/90 dashed-border gentle-float"
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 border-2 border-ink-blue text-ink-blue font-semibold hover:bg-ink-blue hover:text-notebook-cream transition-colors dashed-border"
            >
              Start Fresh
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="coffee-stain w-20 h-16 mx-auto opacity-30"></div>
        </div>
      </div>
    </main>
  )
}