import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

// Optimized font loading for Vercel performance
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: false, // Only load when needed
})

export const metadata: Metadata = {
  metadataBase: new URL('https://founderos.vercel.app'),
  title: {
    default: 'FounderOS - AI Command Center for Canadian Startups',
    template: '%s | FounderOS'
  },
  description: 'The ambient AI co-founder that monitors your competition, discovers funding opportunities, and optimizes your startup operations 24/7. Built specifically for Canadian startup founders.',
  keywords: [
    'AI startup tools',
    'Canadian startups', 
    'founder tools',
    'ambient intelligence',
    'funding discovery',
    'competitor analysis',
    'startup ecosystem Canada',
    'government grants Canada',
    'venture capital Toronto',
    'startup accelerators',
    'SR&ED tax credits',
    'Innovation Canada'
  ],
  authors: [{ name: 'FounderOS Team', url: 'https://founderos.vercel.app' }],
  creator: 'FounderOS',
  publisher: 'FounderOS',
  
  // Enhanced Open Graph for social sharing
  openGraph: {
    title: 'FounderOS - AI Command Center for Canadian Startups',
    description: 'The ambient AI co-founder that never sleeps. Real-time competitive intelligence, funding discovery, and strategic insights for Canadian founders.',
    url: 'https://founderos.vercel.app',
    siteName: 'FounderOS',
    locale: 'en_CA', // Canadian English
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FounderOS - AI Command Center Dashboard',
      }
    ],
  },
  
  // Twitter/X optimization
  twitter: {
    card: 'summary_large_image',
    title: 'FounderOS - AI Command Center',
    description: 'The ambient AI co-founder for Canadian startups. Real-time insights, funding discovery, competitive intelligence.',
    creator: '@founderos',
    images: ['/twitter-card.png'],
  },
  
  // Search engine optimization
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification for search engines
  verification: {
    google: 'founderos-verification-code',
    yandex: 'founderos-yandex-verification',
    yahoo: 'founderos-yahoo-verification',
  },
  
  // Category for app stores and directories
  category: 'business',
  
  // Additional metadata for Canadian focus
  other: {
    'geo.region': 'CA',
    'geo.placename': 'Toronto, Ontario, Canada',
    'geo.position': '43.6532;-79.3832',
    'ICBM': '43.6532, -79.3832',
    'language': 'en-CA',
    'coverage': 'Canada',
    'distribution': 'global',
    'rating': 'general',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  }
}

// Viewport configuration for optimal mobile experience
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en-CA" 
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://api.anthropic.com" />
        <link rel="preconnect" href="https://api.tavily.com" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        
        {/* Canadian favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Canadian specific meta tags */}
        <meta name="geo.region" content="CA" />
        <meta name="geo.country" content="Canada" />
        <meta name="dc.language" content="en-CA" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Professional dark theme background with Canadian accent */}
        <div className="min-h-screen bg-surface">
          {/* Ambient background pattern */}
          <div className="fixed inset-0 bg-gradient-to-br from-surface via-surface to-slate-900/50 pointer-events-none" />
          
          {/* Canadian subtle accent border */}
          <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent pointer-events-none" />
          
          {/* Main application content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Ambient agent status indicator */}
          <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-surface-border shadow-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-secondary font-medium">AI Active</span>
          </div>
          
          {/* Performance monitoring indicators (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 left-4 z-50 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-surface-border shadow-lg">
              <div className="text-xs text-muted">
                <div>Mode: {process.env.NODE_ENV}</div>
                <div>Theme: Dark</div>
                <div>Region: CA</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
        
        {/* Canadian timezone script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Set Canadian timezone context
              window.FOUNDEROS_CONFIG = {
                timezone: 'America/Toronto',
                currency: 'CAD',
                locale: 'en-CA',
                region: 'Canada'
              };
              
              // Performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  // Measure and report Core Web Vitals
                  const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                      }
                    });
                  });
                  observer.observe({entryTypes: ['largest-contentful-paint']});
                });
              }
              
              // Theme management
              const theme = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', theme);
            `,
          }}
        />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "FounderOS",
              "description": "AI-powered command center for Canadian startup founders",
              "url": "https://founderos.vercel.app",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CAD"
              },
              "author": {
                "@type": "Organization",
                "name": "FounderOS Team"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.6532,
                "longitude": -79.3832
              },
              "areaServed": {
                "@type": "Country",
                "name": "Canada"
              }
            })
          }}
        />
      </body>
    </html>
  )
}