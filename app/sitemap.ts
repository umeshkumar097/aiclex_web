import { MetadataRoute } from 'next'
import { servicesData } from '@/lib/servicesData'
import pool from '@/lib/db'
import { zoomKeywordsSolutions } from '@/lib/zoom-keywords'

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.aiclex.in'

  // static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/faqs',
    '/blog',
    '/career',
    '/free-tools',
    '/free-tools/ai-marketing-assistant',
    '/free-tools/product-background-changer',
    '/free-tools/ai-seo-checker',
    '/term-and-condition',
    '/privacy-policy',
    '/refund-policy',
    '/disclaimer',
  ].map((route) => {
    // Core pages get 1.0 or 0.9 and daily frequency
    const isCore = ['', '/about', '/contact', '/career', '/blog', '/faqs'].includes(route);
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: (isCore ? 'daily' : 'monthly') as any,
      priority: isCore ? (route === '' ? 1 : 0.9) : 0.8,
    };
  })

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
    const blogs = await pool.query("SELECT slug, created_at FROM posts")
    blogRoutes = blogs.rows.map((blog: any) => ({
      url: `${baseUrl}/${blog.slug}`,
      lastModified: new Date(blog.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (err) { console.error("Sitemap: Failed to fetch blogs", err) }

  // dynamic job routes from DB
  let jobRoutes: any[] = []
  try {
    const jobs = await pool.query("SELECT slug, created_at FROM jobs WHERE is_active = true")
    jobRoutes = jobs.rows.map((job: any) => ({
      url: `${baseUrl}/career/${job.slug}`,
      lastModified: new Date(job.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (err) { console.error("Sitemap: Failed to fetch jobs", err) }

  // dynamic keyword solution routes
  const solutionRoutes = zoomKeywordsSolutions.map((solution) => {
    // Assuming solutions are generally important but not 'core' like homepage
    const isHighPrioritySolution = ['zoom-info-alternatives', 'zoominfo-competitors'].includes(solution.slug); // Example of prioritizing specific solutions
    return {
      url: `${baseUrl}/solutions/${solution.slug}`,
      lastModified: new Date(),
      changeFrequency: (isHighPrioritySolution ? 'weekly' : 'monthly') as any,
      priority: isHighPrioritySolution ? 0.9 : 0.8,
    };
  })

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...jobRoutes, ...solutionRoutes]
}
