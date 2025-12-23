import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { siteConfig } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'PORT24 Technologies - Premier IT Consulting & Software Development | London, ON',
    template: '%s | PORT24 Technologies',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-CA': '/',
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'PORT24 Technologies - Premier IT Consulting & Software Development | London, ON',
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'PORT24 Technologies - IT Consulting and Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PORT24 Technologies - Premier IT Consulting & Software Development',
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
    creator: '@port24tech',
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
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'Technology',
  classification: 'IT Services',
  other: {
    'contact:phone_number': siteConfig.contact.phoneFormatted,
    'contact:email': siteConfig.contact.email,
    'contact:locality': siteConfig.address.addressLocality,
    'contact:region': siteConfig.address.addressRegion,
    'contact:country_name': 'Canada',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon/P24-transparent bg.svg', type: 'image/svg+xml' },
      { url: '/icon/P24.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon/P24.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon/P24-transparent bg.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PORT24 Technologies',
  },
  applicationName: 'PORT24 Technologies',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA">
      <head>
        <link rel="canonical" href={siteConfig.url} />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS Feed`} href={`${siteConfig.url}/rss`} />
        <link rel="icon" type="image/svg+xml" href="/icon/P24-transparent bg.svg" />
        <link rel="alternate icon" type="image/svg+xml" href="/icon/P24.svg" />
        <link rel="apple-touch-icon" href="/icon/P24.svg" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKX8ET4SWN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKX8ET4SWN');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

