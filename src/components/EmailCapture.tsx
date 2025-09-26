'use client'

import { useState } from 'react'
import { sanityClient } from '@/sanity/config'
import { posthog } from '@/lib/posthog'

interface EmailCaptureProps {
  source: 'hero' | 'footer' | 'blog'
  placeholder?: string
  buttonText?: string
  className?: string
}

export default function EmailCapture({
  source,
  placeholder = "Enter your email",
  buttonText = "Get Started",
  className = ""
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Track with PostHog
      posthog.capture('email_captured', {
        source,
        email,
      })

      // Save to Sanity
      await sanityClient.create({
        _type: 'email',
        email,
        source,
        subscribedAt: new Date().toISOString(),
        ipAddress: '', // Would be populated server-side in production
        userAgent: navigator.userAgent,
      })

      setIsSubmitted(true)
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Email capture error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`dashed-border p-6 bg-success-green/10 gentle-rotate ${className}`}>
        <div className="handwritten text-success-green text-lg">
          ✓ Thanks! We'll be in touch soon.
        </div>
        <div className="text-sm text-ink-blue/70 mt-2">
          Check your email for next steps
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 border-2 border-ink-blue dashed-border bg-notebook-cream focus:outline-none focus:border-success-green"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="px-6 py-3 bg-ink-blue text-notebook-cream font-semibold hover:bg-ink-blue/90 disabled:opacity-50 disabled:cursor-not-allowed dashed-border gentle-float"
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </button>
      </div>
      {error && (
        <div className="text-correction-red text-sm handwritten">
          {error}
        </div>
      )}
    </form>
  )
}