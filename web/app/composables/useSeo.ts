/**
 * Composable for generating SEO meta tags from content data.
 * Wraps Nuxt's useHead and useSeoMeta for consistent SEO across all pages.
 */

interface SeoOptions {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonicalUrl?: string
  noIndex?: boolean
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string
  const route = useRoute()

  const canonical = options.canonicalUrl || `${siteUrl}${route.path}`
  const ogImage = options.ogImage || `${siteUrl}/og-default.jpg`
  const fullTitle = options.title.includes('Achari Tours')
    ? options.title
    : `${options.title} | Achari Tours`

  useHead({
    title: fullTitle,
    link: [
      { rel: 'canonical', href: canonical },
    ],
  })

  useSeoMeta({
    title: fullTitle,
    description: options.description,

    // Open Graph
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: ogImage,
    ogImageAlt: options.title,
    ogUrl: canonical,
    ogType: options.ogType || 'website',
    ogSiteName: 'Achari Tours',
    ogLocale: 'en_US',

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: ogImage,

    // Robots
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
  })

  // Article-specific meta
  if (options.article) {
    useSeoMeta({
      articlePublishedTime: options.article.publishedTime,
      articleModifiedTime: options.article.modifiedTime,
      articleAuthor: options.article.author,
      articleSection: options.article.section,
      articleTag: options.article.tags,
    })
  }
}
