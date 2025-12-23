import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import ContactScrollHandler from '@/components/ContactScrollHandler'
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  getReviewSchema,
  siteConfig,
} from '@/lib/seo'

export const metadata: Metadata = {
  title: 'PORT24 Technologies - Premier IT Consulting & Software Development | London, ON',
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(', '),
  openGraph: {
    title: 'PORT24 Technologies - Premier IT Consulting & Software Development | London, ON',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'PORT24 Technologies - IT Consulting and Software Development Services',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PORT24 Technologies - Premier IT Consulting & Software Development',
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  alternates: {
    canonical: '/',
  },
}

// Reviews data for structured data
const reviews = [
  {
    author: 'Sarah Johnson',
    rating: 5,
    reviewBody: 'PORT24 Technologies transformed our digital infrastructure. Their expertise and professionalism exceeded our expectations. Highly recommended!',
    datePublished: '2024-01-15',
  },
  {
    author: 'Marshall Moses',
    rating: 5,
    reviewBody: 'Working with PORT24 has been a game-changer. They delivered our mobile app on time and within budget. The quality is outstanding.',
    datePublished: '2024-02-20',
  },
  {
    author: 'Lee Chang',
    rating: 5,
    reviewBody: 'Their digital marketing strategies have significantly increased our online presence. The team is responsive, creative, and results-driven.',
    datePublished: '2024-03-10',
  },
]

export default function Home() {
  const structuredData = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    getReviewSchema(reviews),
  ]

  return (
    <>
      <StructuredData data={structuredData} />
      <ContactScrollHandler />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Stats />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <Footer />
      </main>
    </>
  )
}

