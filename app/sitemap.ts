import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.port24.tech'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Add service pages if they exist in the future
    // {
    //   url: `${baseUrl}/services/software-development`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/web-development`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/mobile-app-development`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/digital-marketing`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/it-consulting`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}

