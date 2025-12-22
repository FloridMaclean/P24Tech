/**
 * SEO Utility Functions and Structured Data Schemas
 * Comprehensive SEO implementation for PORT24 Technologies
 */

export const siteConfig = {
  name: 'PORT24 Technologies',
  legalName: 'PORT24 Technologies Inc.',
  url: 'https://www.port24.tech',
  description: 'Premier IT consulting and software development services in London, ON, Canada. 24+ years experience, 70+ satisfied clients. Custom software, web development, mobile apps, digital marketing, and more.',
  keywords: [
    'IT consulting London ON',
    'software development company Canada',
    'web development services London Ontario',
    'mobile app development Canada',
    'digital marketing agency London ON',
    'IT services London Ontario',
    'custom software development Canada',
    'cloud services London ON',
    'database solutions Canada',
    'graphic design services London',
    'enterprise software development',
    'e-commerce development Canada',
    'responsive web design London ON',
    'iOS app development Canada',
    'Android app development',
    'SEO services London Ontario',
    'IT consulting services',
    'technology consulting Canada',
  ],
  author: 'PORT24 Technologies',
  locale: 'en_CA',
  address: {
    streetAddress: 'London, ON',
    addressLocality: 'London',
    addressRegion: 'ON',
    postalCode: '',
    addressCountry: 'CA',
  },
  contact: {
    email: 'sales@port24.tech',
    phone: '+1-519-701-1517',
    phoneFormatted: '+1 (519) 701-1517',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/port24-technologies/',
  },
  openingHours: 'Mo-Fr 09:00-17:00',
  priceRange: '$$',
}

/**
 * Generate Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.legalName,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'Sales',
      email: siteConfig.contact.email,
      areaServed: ['CA', 'US'],
      availableLanguage: ['en'],
    },
    sameAs: [
      siteConfig.social.linkedin,
    ],
    foundingDate: '2000',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '70',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

/**
 * Generate LocalBusiness Schema (JSON-LD)
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    image: `${siteConfig.url}/logo.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.4516',
      longitude: '-80.4925',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '17:00',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Canada',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Software Development',
            description: 'Custom software solutions tailored to your business needs',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Modern, responsive websites and web applications',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications for iOS and Android',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing',
            description: 'Comprehensive digital marketing strategies including SEO, SEM, and social media',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Graphic Design',
            description: 'Creative and professional graphic design services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'IT Consulting',
            description: 'Strategic IT consulting to help you make informed technology decisions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Services',
            description: 'Cloud migration, infrastructure setup, and management services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Database Solutions',
            description: 'Database design, optimization, and management services',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '70',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

/**
 * Generate WebSite Schema with SearchAction (JSON-LD)
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-CA',
  }
}

/**
 * Generate Service Schema for individual services
 */
export function getServiceSchema(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.legalName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        addressCountry: siteConfig.address.addressCountry,
      },
    },
    areaServed: {
      '@type': 'Country',
      name: ['Canada', 'United States'],
    },
    description: description,
  }
}

/**
 * Generate BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate FAQPage Schema
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Review Schema
 */
export function getReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.legalName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished || new Date().toISOString(),
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  }
}

