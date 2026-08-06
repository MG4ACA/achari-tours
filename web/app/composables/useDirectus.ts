/**
 * Composable for fetching content from Directus CMS.
 * Provides typed helpers for tours, blog articles, destinations, and testimonials.
 */

interface DirectusImage {
  id: string
  title: string
  description: string | null
  width: number
  height: number
  filename_download: string
}

export interface Tour {
  id: string
  status: 'draft' | 'published' | 'archived'
  title: string
  slug: string
  short_description: string
  full_description: string
  hero_image: DirectusImage | string
  duration_days: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  categories: string[]
  price_display: string
  highlights: string[]
  included: string[]
  excluded: string[]
  sort_order: number
  meta_title: string
  meta_description: string
  og_image: DirectusImage | string | null
  focus_keyword: string
  days: TourDay[]
  gallery: TourGalleryItem[]
  addons: TourAddon[]
}

export interface TourDay {
  id: string
  day_number: number
  title: string
  description: string
  location_name: string
  latitude: number
  longitude: number
  image: DirectusImage | string | null
  activities: string[]
  accommodation: string
  meals: string
}

export interface TourGalleryItem {
  id: string
  image: DirectusImage | string
  caption: string
  sort_order: number
}

export interface TourAddon {
  id: string
  name: string
  description: string
  image: DirectusImage | string | null
  category: 'activity' | 'upgrade' | 'transfer'
}

export interface BlogArticle {
  id: string
  status: 'draft' | 'published'
  title: string
  slug: string
  excerpt: string
  body: string
  author: Author
  hero_image: DirectusImage | string
  category: 'cultural' | 'wildlife' | 'coastal' | 'planning' | 'tips'
  tags: string[]
  published_at: string
  meta_title: string
  meta_description: string
  og_image: DirectusImage | string | null
  focus_keyword: string
  is_featured: boolean
}

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  avatar: DirectusImage | string | null
}

export interface Destination {
  id: string
  status: 'draft' | 'published'
  name: string
  slug: string
  short_description: string
  full_description: string
  hero_image: DirectusImage | string
  latitude: number
  longitude: number
  region: string
  highlights: string[]
  meta_title: string
  meta_description: string
}

export interface Testimonial {
  id: string
  status: 'draft' | 'published'
  name: string
  country: string
  quote: string
  rating: number
  tour_taken: string
  avatar: DirectusImage | string | null
}

export interface SiteSettings {
  site_name: string
  site_description: string
  default_og_image: DirectusImage | string
  social_links: Record<string, string>
  footer_text: string
  contact_email: string
  contact_phone: string
  whatsapp_number: string
}

export function useDirectus() {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl as string

  /**
   * Build the full URL for a Directus asset/file
   */
  function getAssetUrl(imageOrId: DirectusImage | string | null | undefined, params?: Record<string, string | number>): string {
    if (!imageOrId) return '/images/placeholder.jpg'
    const id = typeof imageOrId === 'string' ? imageOrId : imageOrId.id
    const queryParams = params
      ? '?' + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
      : ''
    return `${directusUrl}/assets/${id}${queryParams}`
  }

  /**
   * Generic fetch from Directus REST API
   */
  async function fetchItems<T>(collection: string, params?: Record<string, string>): Promise<T[]> {
    const query = params
      ? '?' + new URLSearchParams(params).toString()
      : ''
    const { data } = await useFetch<{ data: T[] }>(`${directusUrl}/items/${collection}${query}`)
    return data.value?.data ?? []
  }

  /**
   * Fetch single item by ID or slug
   */
  async function fetchItem<T>(collection: string, idOrSlug: string, params?: Record<string, string>): Promise<T | null> {
    const query = params
      ? '?' + new URLSearchParams(params).toString()
      : ''
    const { data } = await useFetch<{ data: T }>(`${directusUrl}/items/${collection}/${idOrSlug}${query}`)
    return data.value?.data ?? null
  }

  /**
   * Fetch published tours with all relations
   */
  async function getTours(): Promise<Tour[]> {
    return fetchItems<Tour>('tours', {
      'filter[status][_eq]': 'published',
      'fields': '*,days.*,gallery.*,addons.tour_addons_id.*',
      'sort': 'sort_order',
    })
  }

  /**
   * Fetch single tour by slug
   */
  async function getTourBySlug(slug: string): Promise<Tour | null> {
    const tours = await fetchItems<Tour>('tours', {
      'filter[status][_eq]': 'published',
      'filter[slug][_eq]': slug,
      'fields': '*,days.*,gallery.*,addons.tour_addons_id.*',
      'limit': '1',
    })
    return tours[0] ?? null
  }

  /**
   * Fetch published blog articles
   */
  async function getBlogArticles(category?: string, limit?: number): Promise<BlogArticle[]> {
    const params: Record<string, string> = {
      'filter[status][_eq]': 'published',
      'fields': '*,author.*',
      'sort': '-published_at',
    }
    if (category) params['filter[category][_eq]'] = category
    if (limit) params['limit'] = String(limit)
    return fetchItems<BlogArticle>('blog_articles', params)
  }

  /**
   * Fetch single blog article by slug
   */
  async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
    const articles = await fetchItems<BlogArticle>('blog_articles', {
      'filter[status][_eq]': 'published',
      'filter[slug][_eq]': slug,
      'fields': '*,author.*',
      'limit': '1',
    })
    return articles[0] ?? null
  }

  /**
   * Fetch published destinations
   */
  async function getDestinations(): Promise<Destination[]> {
    return fetchItems<Destination>('destinations', {
      'filter[status][_eq]': 'published',
      'fields': '*',
      'sort': 'name',
    })
  }

  /**
   * Fetch single destination by slug
   */
  async function getDestinationBySlug(slug: string): Promise<Destination | null> {
    const destinations = await fetchItems<Destination>('destinations', {
      'filter[status][_eq]': 'published',
      'filter[slug][_eq]': slug,
      'fields': '*',
      'limit': '1',
    })
    return destinations[0] ?? null
  }

  /**
   * Fetch published testimonials
   */
  async function getTestimonials(): Promise<Testimonial[]> {
    return fetchItems<Testimonial>('testimonials', {
      'filter[status][_eq]': 'published',
      'fields': '*',
    })
  }

  /**
   * Fetch site settings
   */
  async function getSiteSettings(): Promise<SiteSettings | null> {
    return fetchItem<SiteSettings>('site_settings', '1')
  }

  return {
    directusUrl,
    getAssetUrl,
    fetchItems,
    fetchItem,
    getTours,
    getTourBySlug,
    getBlogArticles,
    getArticleBySlug,
    getDestinations,
    getDestinationBySlug,
    getTestimonials,
    getSiteSettings,
  }
}
