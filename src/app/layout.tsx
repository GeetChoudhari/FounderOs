import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FounderOS - AI Command Center for Canadian Startups',
  description: 'The ambient AI co-founder that monitors your competition, discovers funding opportunities, and optimizes your startup operations 24/7.',
  keywords: 'AI startup, Canadian startups, founder tools, ambient intelligence, funding discovery',
  authors: [{ name: 'FounderOS Team' }],
  creator: 'FounderOS',
  publisher: 'FounderOS',
  openGraph: {
    title: 'FounderOS - AI Command Center for Canadian Startups',
    description: 'The ambient AI co-founder that never sleeps',
    url: 'https://founderos.vercel.app',
    siteName: 'FounderOS',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FounderOS - AI Command Center',
    description: 'The ambient AI co-founder for Canadian startups',
    creator: '@founderos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}