'use client'

import { useEffect } from 'react'

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
    <html lang="en">
      <body className="notebook-bg text-ink-blue">
        <main className="min-h-screen px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative mb-12">
              <h1 className="text-4xl font-bold mb-6">
                Oops! Something went really wrong
              </h1>

              <div className="text-xl text-gray-500 mb-4" style={{ textDecoration: 'line-through' }}>
                Global state is perfect
              </div>
              <p className="text-red-600 text-lg font-bold mb-8" style={{ fontFamily: 'Kalam, cursive' }}>
                Houston, we have a problem
              </p>
            </div>

            <div className="bg-yellow-200 p-4 shadow-lg relative mb-8" style={{ transform: 'rotate(-1deg)' }}>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-yellow-300 rounded-sm opacity-50"></div>
              <div style={{ fontFamily: 'Kalam, cursive' }}>
                <div className="text-lg font-bold mb-2">Critical Error!</div>
                <div className="text-sm">Something fundamental broke. Let's start over.</div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg">
                This is embarrassing. Something went wrong at the core level.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <div className="border-2 border-dashed border-red-500 p-4 bg-red-50 text-left">
                  <p className="font-mono text-sm text-red-700">
                    {error.message}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-800 border-2 border-dashed border-blue-900"
                >
                  Try Again
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 border-2 border-dashed border-blue-900 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition-colors"
                >
                  Start Fresh
                </button>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}