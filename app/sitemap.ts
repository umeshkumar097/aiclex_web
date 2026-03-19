import { MetadataRoute } from 'next'
import { servicesData } from '@/lib/servicesData'
import pool from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aiclex.in'

  // static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faqs',
    '/blog',
    '/career',
    '/term-and-condition',
    '/privacy-policy',
    '/refund-policy',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // dynamic service routes
  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // dynamic blog routes from DB
  let blogRoutes: any[] = []
  try {
    const blogs = await pool.query("SELECT slug, updated_at FROM blog_posts")
    blogRoutes = blogs.rows.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (err) { console.error("Sitemap: Failed to fetch blogs", err) }

  // dynamic job routes from DB
  let jobRoutes: any[] = []
  try {
    const jobs = await pool.query("SELECT slug, posted_at FROM jobs WHERE is_active = true")
    jobRoutes = jobs.rows.map((job: any) => ({
      url: `${baseUrl}/career/${job.slug}`,
      lastModified: new Date(job.posted_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (err) { console.error("Sitemap: Failed to fetch jobs", err) }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...jobRoutes]
}
