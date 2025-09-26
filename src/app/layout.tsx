import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyPip - Stop Playing SDR Roulette',
  description: 'Get qualified leads daily with quality over quantity approach.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-yellow-50 text-gray-800">
        {children}
      </body>
    </html>
  )
}