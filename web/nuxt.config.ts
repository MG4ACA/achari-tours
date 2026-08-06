// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],

  // ─── App & SEO Defaults ──────────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Achari Tours — Refined Sri Lanka Travel Experiences',
      meta: [
        { name: 'description', content: 'Discover Sri Lanka through curated cultural heritage, wildlife safari, and coastal experiences. Boutique travel for European and Scandinavian explorers.' },
        { name: 'theme-color', content: '#2D4A2D' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Achari Tours' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // ─── CSS ─────────────────────────────────────────────────────
  css: [
    '@/assets/css/reset.css',
    '~/assets/css/variables.css',
    '~/assets/css/typography.css',
    '~/assets/css/main.css',
    '~/assets/css/utilities.css',
    '~/assets/css/animations.css',
  ],

  // ─── Hybrid Rendering ────────────────────────────────────────
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/tours': { prerender: true },
    '/tours/**': { isr: 3600 },
    '/blog': { prerender: true },
    '/blog/**': { isr: 3600 },
    '/destinations': { prerender: true },
    '/destinations/**': { isr: 3600 },
    '/contact': { ssr: true },
    '/book/**': { ssr: true },
  },

  // ─── Runtime Config ──────────────────────────────────────────
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://acharitours.lumicore-labs.com',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
    },
  },

  // ─── Sitemap ─────────────────────────────────────────────────
  sitemap: {
    xsl: false,
  },

  // ─── Schema.org ──────────────────────────────────────────────
  schemaOrg: {
    identity: {
      type: 'TravelAgency',
      name: 'Achari Tours',
      url: 'https://acharitours.lumicore-labs.com',
      logo: '/images/logo/achari-tours-logo.png',
      description: 'Boutique Sri Lanka travel agency offering refined cultural heritage, wildlife safari, and coastal experiences.',
    },
  },

  // ─── Fonts ───────────────────────────────────────────────────
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
      { name: 'Outfit', provider: 'google', weights: [500, 600, 700] },
    ],
  },

  // ─── Image ───────────────────────────────────────────────────
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // ─── Robots ──────────────────────────────────────────────────
  robots: {
    disallow: ['/admin', '/api'],
  },

  // ─── Typescript ──────────────────────────────────────────────
  typescript: {
    strict: true,
  },
})
