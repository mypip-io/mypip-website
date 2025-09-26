'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

      if (posthogKey && posthogHost) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false, // We'll capture manually
          capture_pageleave: true,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('PostHog loaded successfully')
              posthog.debug()
            }
          },
        })
      } else {
        console.warn('PostHog environment variables not found')
      }
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

// Page view tracking component
export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + '?' + searchParams.toString()
      }

      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

export { posthog }