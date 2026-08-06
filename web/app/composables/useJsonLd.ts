/**
 * Composable for JSON-LD structured data generation.
 * Generates schema.org markup for TravelAgency, TouristTrip, Article, etc.
 */

import type { Tour, BlogArticle, Destination } from './useDirectus'

export function useJsonLd() {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string

  /**
   * TravelAgency schema for the homepage
   */
  function setTravelAgencySchema() {
    useSchemaOrg([
      {
        '@type': 'TravelAgency',
        'name': 'Achari Tours',
        'url': siteUrl,
        'logo': `${siteUrl}/images/logo/achari-tours-logo.png`,
        'description': 'Boutique Sri Lanka travel agency offering refined cultural heritage, wildlife safari, and coastal experiences for European and Scandinavian travelers.',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'LK',
          'addressLocality': 'Sri Lanka',
        },
        'areaServed': [
          { '@type': 'Country', 'name': 'Sri Lanka' },
        ],
        'priceRange': '$$$',
        'sameAs': [],
      } as any,
    ])
  }

  /**
   * TouristTrip schema for tour detail pages
   */
  function setTourSchema(tour: Tour) {
    useSchemaOrg([
      {
        '@type': 'TouristTrip',
        'name': tour.title,
        'description': tour.short_description,
        'touristType': tour.categories,
        'itinerary': {
          '@type': 'ItemList',
          'numberOfItems': tour.days?.length ?? tour.duration_days,
          'itemListElement': (tour.days ?? []).map((day, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': day.title,
            'description': day.description,
          })),
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock',
          'description': tour.price_display,
        },
        'provider': {
          '@type': 'TravelAgency',
          'name': 'Achari Tours',
          'url': siteUrl,
        },
      } as any,
    ])
  }

  /**
   * Article schema for blog posts
   */
  function setArticleSchema(article: BlogArticle) {
    const { getAssetUrl } = useDirectus()

    useSchemaOrg([
      {
        '@type': 'Article',
        'headline': article.title,
        'description': article.excerpt,
        'image': getAssetUrl(article.hero_image),
        'datePublished': article.published_at,
        'author': {
          '@type': 'Person',
          'name': article.author?.name ?? 'Achari Tours',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Achari Tours',
          'logo': {
            '@type': 'ImageObject',
            'url': `${siteUrl}/images/logo/achari-tours-logo.png`,
          },
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${article.slug}`,
        },
      } as any,
    ])
  }

  /**
   * TouristDestination schema for destination pages
   */
  function setDestinationSchema(destination: Destination) {
    useSchemaOrg([
      {
        '@type': 'TouristDestination',
        'name': destination.name,
        'description': destination.short_description,
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': destination.latitude,
          'longitude': destination.longitude,
        },
        'containedInPlace': {
          '@type': 'Country',
          'name': 'Sri Lanka',
        },
      } as any,
    ])
  }

  /**
   * BreadcrumbList schema
   */
  function setBreadcrumbSchema(items: { name: string; url: string }[]) {
    useSchemaOrg([
      {
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': `${siteUrl}${item.url}`,
        })),
      } as any,
    ])
  }

  /**
   * FAQPage schema for FAQ sections
   */
  function setFaqSchema(questions: { question: string; answer: string }[]) {
    useSchemaOrg([
      {
        '@type': 'FAQPage',
        'mainEntity': questions.map((q) => ({
          '@type': 'Question',
          'name': q.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': q.answer,
          },
        })),
      } as any,
    ])
  }

  return {
    setTravelAgencySchema,
    setTourSchema,
    setArticleSchema,
    setDestinationSchema,
    setBreadcrumbSchema,
    setFaqSchema,
  }
}
