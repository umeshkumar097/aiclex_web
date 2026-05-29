import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/services/', '/locations/', '/industries/', '/compare/', '/blog/'],
      disallow: ['/api/', '/dashboard/'],
    },
    sitemap: 'https://aiclex.in/sitemap.xml',
  }
}
