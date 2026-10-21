<template>
  <div v-if="article" class="article-page">
    <!-- Article Hero -->
    <section class="article-hero">
      <div class="article-hero__bg">
        <img
          :src="article.coverImage"
          :alt="article.title"
          class="article-hero__image"
          fetchpriority="high"
        />
        <div class="article-hero__overlay" />
      </div>
      <div class="container article-hero__content">
        <div class="article-hero__breadcrumb">
          <NuxtLink to="/blog" class="article-hero__breadcrumb-link">Blog</NuxtLink>
          <span class="article-hero__breadcrumb-sep">/</span>
          <span>{{ article.categoryLabel }}</span>
        </div>
        <span class="category-pill category-pill--hero">{{ article.categoryLabel }}</span>
        <h1 class="article-hero__title">{{ article.title }}</h1>
        <div class="article-hero__meta">
          <span class="article-hero__author">
            <span class="article-hero__author-avatar">AT</span>
            {{ article.author }}
          </span>
          <span class="article-hero__dot">·</span>
          <span>{{ formatDate(article.publishedAt) }}</span>
          <span class="article-hero__dot">·</span>
          <span>{{ article.readTime }} min read</span>
        </div>
      </div>
    </section>

    <!-- Article Layout -->
    <div class="container article-layout">
      <!-- Main Content -->
      <article class="article-content">
        <!-- Excerpt Lead -->
        <p class="article-lead">{{ article.excerpt }}</p>

        <!-- Body HTML -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="article-body" v-html="article.body" />

        <!-- Tags -->
        <div class="article-tags">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="article-sidebar">
        <!-- Quick Inquiry CTA -->
        <div class="sidebar-card sidebar-card--cta">
          <div class="sidebar-card__icon">✈️</div>
          <h3 class="sidebar-card__title">Inspired to Visit?</h3>
          <p class="sidebar-card__text">
            Let our team build a bespoke Sri Lanka itinerary around the experiences you've just read about.
          </p>
          <button class="btn btn--primary btn--full" @click="openQuickInquiry">
            Send an Inquiry
          </button>
          <NuxtLink to="/inquiry" class="btn btn--ghost btn--full sidebar-card__secondary">
            Build Custom Itinerary
          </NuxtLink>
        </div>

        <!-- Related Articles -->
        <div v-if="relatedArticles.length" class="sidebar-card">
          <h3 class="sidebar-card__section-title">More to Read</h3>
          <div class="related-list">
            <NuxtLink
              v-for="rel in relatedArticles"
              :key="rel.id"
              :to="`/blog/${rel.slug}`"
              class="related-item"
            >
              <div class="related-item__image-wrap">
                <img
                  :src="rel.coverImage"
                  :alt="rel.title"
                  class="related-item__image"
                  loading="lazy"
                />
              </div>
              <div class="related-item__text">
                <span class="related-item__category">{{ rel.categoryLabel }}</span>
                <h4 class="related-item__title">{{ rel.title }}</h4>
                <span class="related-item__read-time">{{ rel.readTime }} min read</span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Category Quick Links -->
        <div class="sidebar-card sidebar-card--categories">
          <h3 class="sidebar-card__section-title">Browse by Topic</h3>
          <div class="category-links">
            <NuxtLink
              v-for="cat in BLOG_CATEGORIES.filter(c => c.value !== 'all')"
              :key="cat.value"
              :to="`/blog?category=${cat.value}`"
              class="category-link"
            >
              <span>{{ cat.icon }}</span>
              <span>{{ cat.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <!-- Back to Blog -->
    <div class="container" style="padding-top: 0; padding-bottom: var(--space-12)">
      <NuxtLink to="/blog" class="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to all articles
      </NuxtLink>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="not-found">
    <div class="container" style="text-align: center; padding: var(--space-32) 0">
      <span style="font-size: var(--text-5xl)">📰</span>
      <h1 style="margin-top: var(--space-6)">Article Not Found</h1>
      <p class="text-lead" style="color: var(--color-text-secondary); margin: var(--space-4) 0 var(--space-8)">
        This article doesn't exist or may have moved.
      </p>
      <NuxtLink to="/blog" class="btn btn--primary">Back to Blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BLOG_CATEGORIES } from '~/composables/useBlog'

const route = useRoute()
const slug = route.params.slug as string

const { getArticleBySlug, getRelatedArticles, formatDate } = useBlog()

const article = computed(() => getArticleBySlug(slug))
const relatedArticles = computed(() => article.value ? getRelatedArticles(article.value, 3) : [])

// Quick Inquiry state (shared global state)
const isQuickInquiryOpen = useState<boolean>('quickInquiryOpen', () => false)
function openQuickInquiry() {
  isQuickInquiryOpen.value = true
}

// SEO
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

if (article.value) {
  useSeo({
    title: `${article.value.title} — Achari Tours`,
    description: article.value.excerpt,
  })

  const { setBreadcrumbSchema } = useJsonLd()
  setBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: article.value.title, url: `/blog/${article.value.slug}` },
  ])

  useSchemaOrg([
    {
      '@type': 'Article',
      'headline': article.value.title,
      'description': article.value.excerpt,
      'image': `${siteUrl}${article.value.coverImage}`,
      'datePublished': article.value.publishedAt,
      'author': { '@type': 'Organization', 'name': article.value.author },
      'publisher': {
        '@type': 'Organization',
        'name': 'Achari Tours',
        'logo': { '@type': 'ImageObject', 'url': `${siteUrl}/images/logo/achari-tours-logo.png` },
      },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': `${siteUrl}/blog/${article.value.slug}` },
    } as any,
  ])
} else {
  useSeo({
    title: 'Article Not Found — Achari Tours',
    description: '',
  })
}

const { observeAll } = useScrollReveal()
onMounted(() => { observeAll() })
</script>

<style scoped>
/* ── Article Hero ────────────────────────────────────────────── */
.article-hero {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-16);
}

.article-hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.article-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 18, 10, 0.35) 0%,
    rgba(10, 18, 10, 0.85) 100%
  );
}

.article-hero__content {
  position: relative;
  z-index: 2;
  color: white;
  padding-top: calc(var(--header-height) + var(--space-12));
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 860px;
}

/* Breadcrumb */
.article-hero__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
}

.article-hero__breadcrumb-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color var(--duration-fast);
}

.article-hero__breadcrumb-link:hover { color: white; }
.article-hero__breadcrumb-sep { opacity: 0.4; }

/* Category pill */
.category-pill {
  display: inline-block;
  padding: 4px 14px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.category-pill--hero {
  background: rgba(82, 183, 136, 0.3);
  color: var(--color-accent-light);
  align-self: flex-start;
}

/* Title */
.article-hero__title {
  font-family: var(--font-heading);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: 700;
  color: white;
  line-height: var(--leading-snug);
  max-width: 820px;
}

/* Meta line */
.article-hero__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  flex-wrap: wrap;
}

.article-hero__author {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.article-hero__author-avatar {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-accent-light);
  color: var(--color-primary-dark);
  font-size: var(--text-xs);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.article-hero__dot { opacity: 0.35; }

/* ── Article Layout ──────────────────────────────────────────── */
.article-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--space-16);
  align-items: flex-start;
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}

/* ── Article Content ─────────────────────────────────────────── */
.article-lead {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  border-left: 4px solid var(--color-accent-light);
  padding-left: var(--space-6);
  margin-bottom: var(--space-10);
}

:deep(.article-body) {
  font-size: var(--text-base);
  color: var(--color-text-primary);
  line-height: var(--leading-relaxed);
}

:deep(.article-body h2) {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: var(--space-12);
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-border-light);
}

:deep(.article-body h3) {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

:deep(.article-body p) {
  margin-bottom: var(--space-5);
  line-height: var(--leading-relaxed);
}

:deep(.article-body ul),
:deep(.article-body ol) {
  padding-left: var(--space-6);
  margin-bottom: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

:deep(.article-body li) {
  line-height: var(--leading-relaxed);
}

:deep(.article-body li::marker) {
  color: var(--color-accent-light);
}

:deep(.article-body strong) {
  font-weight: 700;
  color: var(--color-text-primary);
}

:deep(.article-body em) {
  font-style: italic;
  color: var(--color-text-secondary);
}

:deep(.article-body a) {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Tags */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-10);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.tag {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: all var(--duration-fast);
  cursor: default;
}

.tag:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-200);
  color: var(--color-primary);
}

/* ── Sidebar ─────────────────────────────────────────────────── */
.article-sidebar {
  position: sticky;
  top: calc(var(--header-height) + var(--space-8));
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.sidebar-card {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
}

.sidebar-card--cta {
  background: var(--color-bg-dark);
  border-color: var(--color-border-dark);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  text-align: center;
}

.sidebar-card__icon {
  font-size: var(--text-3xl);
}

.sidebar-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
}

.sidebar-card__text {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  line-height: var(--leading-relaxed);
}

.sidebar-card__secondary {
  color: rgba(255, 255, 255, 0.7) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  font-size: var(--text-sm);
}

.sidebar-card__section-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

/* Related articles list */
.related-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.related-item {
  display: flex;
  gap: var(--space-3);
  text-decoration: none;
  transition: opacity var(--duration-fast);
}

.related-item:hover { opacity: 0.8; }

.related-item__image-wrap {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  flex-shrink: 0;
}

.related-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-item__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.related-item__category {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-accent-light);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.related-item__title {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-item__read-time {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

/* Category links */
.sidebar-card--categories { padding: var(--space-5) var(--space-6); }

.category-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--duration-fast);
}

.category-link:hover {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

/* ── Back link ───────────────────────────────────────────────── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast), gap var(--duration-fast);
}

.back-link:hover {
  color: var(--color-primary);
  gap: var(--space-3);
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1200px) {
  .article-layout {
    grid-template-columns: 1fr 320px;
  }
}

@media (max-width: 1024px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
  .article-sidebar {
    position: static;
  }
  .article-hero {
    min-height: 400px;
  }
}

@media (max-width: 640px) {
  .article-hero__title {
    font-size: var(--text-3xl);
  }
  .article-lead {
    font-size: var(--text-lg);
  }
}
</style>
