import type { Metadata } from 'next'
import './globals.css'
import { PostHogProvider } from '@/lib/posthog'

export const metadata: Metadata = {
  title: 'MyPip - Stop Playing SDR Roulette',
  description: 'Get qualified leads daily with quality over quantity approach. No more SDR teams, spam tools, or 20-hour DIY struggles.',
  keywords: 'SDR, sales development, lead generation, qualified leads, B2B sales',
  openGraph: {
    title: 'MyPip - Stop Playing SDR Roulette',
    description: 'Get qualified leads daily with quality over quantity approach.',
    type: 'website',
    siteName: 'MyPip',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyPip - Stop Playing SDR Roulette',
    description: 'Get qualified leads daily with quality over quantity approach.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="notebook-bg text-ink-blue">
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}