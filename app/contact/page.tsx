import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us - Get In Touch',
  description: 'Get in touch with PORT24 Technologies. We\'re here to help transform your business with our IT consulting and software development services.',
  keywords: 'contact PORT24 Technologies, IT consulting contact, software development contact, London ON',
  openGraph: {
    title: 'Contact Us - PORT24 Technologies',
    description: 'Get in touch with PORT24 Technologies. We\'re here to help transform your business.',
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactForm />
      <Footer />
    </main>
  )
}

