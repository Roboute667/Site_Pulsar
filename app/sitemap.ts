import type { MetadataRoute } from 'next'

const SITE_URL = 'https://site-pulsar-c7uq.vercel.app'
const PATHS = ['', '/about', '/team', '/faq', '/contact', '/disclosures', '/legal']

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: `${SITE_URL}${path}` }))
}
