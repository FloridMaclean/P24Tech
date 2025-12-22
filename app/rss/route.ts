import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/seo'

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-CA</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss" rel="self" type="application/rss+xml"/>
    <item>
      <title>${siteConfig.name} - IT Consulting and Software Development Services</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${siteConfig.url}</guid>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

