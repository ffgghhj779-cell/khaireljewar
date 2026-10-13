import type { MetadataRoute } from 'next'
import { CANONICAL_HOST, SITE_URL } from '@/lib/seo'

const AI_AGENTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']

export default function robots(): MetadataRoute.Robots {
  const publicSite = { allow: '/', disallow: ['/admin', '/api/'] }
  return {
    rules: [
      { userAgent: '*', ...publicSite },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, ...publicSite })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: CANONICAL_HOST,
  }
}
