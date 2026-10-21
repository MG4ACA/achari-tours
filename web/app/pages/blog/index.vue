<template>
  <div class="blog-page">
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg">
        <img
          src="/images/hero/contact-hero.jpg"
          alt="Sri Lanka travel blog"
          class="page-hero__bg-image"
          fetchpriority="high"
        />
        <div class="overlay" />
      </div>
      <div class="container page-hero__content">
        <span class="label label--accent">TRAVEL JOURNAL</span>
        <h1>Stories from Sri Lanka</h1>
        <p class="text-lead" style="color: rgba(255,255,255,0.85); max-width: 560px">
          Insider guides, cultural deep-dives, and practical tips from our team on the ground.
        </p>
      </div>
    </section>

    <!-- Category Filter Bar -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-bar" role="tablist" aria-label="Blog categories">
          <button
            v-for="cat in BLOG_CATEGORIES"
            :key="cat.value"
            role="tab"
            :aria-selected="activeCategory === cat.value"
            class="filter-btn"
            :class="{ 'filter-btn--active': activeCategory === cat.value }"
            @click="setCategory(cat.value)"
          >
            <span class="filter-btn__icon">{{ cat.icon }}</span>
            <span class="filter-btn__label">{{ cat.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Article (hero card, shown only when All is active and list has featured) -->
    <section v-if="activeCategory === 'all' && featuredArticle" class="section section--sm">
      <div class="container">
        <NuxtLink :to="`/blog/${featuredArticle.slug}`" class="featured-card reveal">
          <div class="featured-card__image-wrap">
            <img
              :src="featuredArticle.coverImage"
              :alt="featuredArticle.title"
              class="featured-card__image"
              loading="eager"
            />
            <div class="featured-card__overlay" />
          </div>
          <div class="featured-card__content">
            <div class="featured-card__meta">
              <span class="category-pill category-pill--light">
                {{ featuredArticle.categoryLabel }}
              </span>
              <span class="featured-card__read-time">
                {{ featuredArticle.readTime }} min read
              </span>
            </div>
            <h2 class="featured-card__title">{{ featuredArticle.title }}</h2>
            <p class="featured-card__excerpt">{{ featuredArticle.excerpt }}</p>
            <div class="featured-card__footer">
              <span class="featured-card__author">{{ featuredArticle.author }}</span>
              <span class="featured-card__date">{{ formatDate(featuredArticle.publishedAt) }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Article Grid -->
    <section class="section">
      <div class="container">
        <div v-if="gridArticles.length" class="blog-grid">
          <NuxtLink
            v-for="(article, idx) in gridArticles"
            :key="article.id"
            :to="`/blog/${article.slug}`"
            class="blog-card reveal"
            :class="`reveal--delay-${(idx % 3) + 1}`"
          >
            <div class="blog-card__image-wrap">
              <img
                :src="article.coverImage"
                :alt="article.title"
                class="blog-card__image"
                loading="lazy"
              />
              <span class="category-pill category-pill--floating">
                {{ article.categoryLabel }}
              </span>
            </div>
            <div class="blog-card__body">
              <div class="blog-card__meta">
                <span class="blog-card__read-time">📖 {{ article.readTime }} min</span>
                <span class="blog-card__date">{{ formatDate(article.publishedAt) }}</span>
              </div>
              <h3 class="blog-card__title">{{ article.title }}</h3>
              <p class="blog-card__excerpt">{{ article.excerpt }}</p>
              <div class="blog-card__cta">
                Read article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-else class="blog-empty">
          <span class="blog-empty__icon">📭</span>
          <h3>No articles yet in this category</h3>
          <p>Check back soon — we're writing more stories from the road.</p>
          <button class="btn btn--primary" @click="setCategory('all')">View all articles</button>
        </div>
      </div>
    </section>

    <!-- Newsletter / CTA -->
    <section class="section section--dark text-center">
      <div class="container" style="max-width: 600px">
        <span class="label label--accent reveal">PLAN YOUR TRIP</span>
        <h2 class="reveal reveal--delay-1" style="color: white; margin-top: var(--space-3)">
          Ready to Experience Sri Lanka?
        </h2>
        <p class="text-lead reveal reveal--delay-2" style="color: rgba(255,255,255,0.8); margin: var(--space-4) 0 var(--space-8)">
          Let our team craft a personalised itinerary around the places and stories that matter most to you.
        </p>
        <div class="reveal reveal--delay-3" style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap">
          <NuxtLink to="/inquiry" class="btn btn--primary btn--lg">Start Your Journey</NuxtLink>
          <NuxtLink to="/tours" class="btn btn--outline btn--lg" style="border-color: rgba(255,255,255,0.4); color: white">Browse Tours</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { type BlogCategory, BLOG_CATEGORIES } from '~/composables/useBlog'

useSeo({
  title: 'Travel Journal — Achari Tours Sri Lanka Blog',
  description: 'Insider guides, cultural stories, safari tips, and practical travel advice from Achari Tours — boutique Sri Lanka travel experts.',
})

const { setBreadcrumbSchema } = useJsonLd()
setBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
])

const { getAllArticles, getFeaturedArticles, getArticlesByCategory, formatDate } = useBlog()

const activeCategory = ref<BlogCategory | 'all'>('all')

const allArticles = computed(() =>
  activeCategory.value === 'all' ? getAllArticles() : getArticlesByCategory(activeCategory.value as BlogCategory)
)

// The top featured article (shown as big hero card on "all" view)
const featuredArticle = computed(() => {
  if (activeCategory.value !== 'all') return null
  const featured = getFeaturedArticles()
  return featured[0] ?? null
})

// Remaining articles in the grid (exclude the featured hero card when on "all")
const gridArticles = computed(() => {
  if (activeCategory.value !== 'all') return allArticles.value
  const featured = featuredArticle.value
  return featured ? allArticles.value.filter(a => a.id !== featured.id) : allArticles.value
})

function setCategory(cat: BlogCategory | 'all') {
  activeCategory.value = cat
}

const { observeAll } = useScrollReveal()
onMounted(() => { observeAll() })
watch(activeCategory, async () => {
  await nextTick()
  observeAll()
})
</script>

<style scoped>
/* ── Page Hero ──────────────────────────────────────────────── */
.page-hero {
  position: relative;
  padding: calc(var(--header-height) + var(--space-20)) 0 var(--space-20);
  min-height: 420px;
  display: flex;
  align-items: flex-end;
}

.page-hero__bg {
  position: absolute;
  inset: 0;
}

.page-hero__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-hero__content {
  position: relative;
  z-index: 2;
  color: white;
}

.page-hero__content h1 {
  color: white;
  margin-top: var(--space-3);
}

/* ── Category Filter ────────────────────────────────────────── */
.filter-section {
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-4) 0;
  position: sticky;
  top: 80px;
  z-index: var(--z-sticky);
}

.filter-bar {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 2px;
}

.filter-bar::-webkit-scrollbar { display: none; }

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: white;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-out);
  font-family: var(--font-body);
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-50);
}

.filter-btn--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.filter-btn__icon {
  font-size: var(--text-base);
}

/* ── Featured Card ──────────────────────────────────────────── */
.section--sm {
  padding: var(--space-10) 0 0;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  text-decoration: none;
  min-height: 420px;
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
}

.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}

.featured-card__image-wrap {
  position: relative;
  overflow: hidden;
}

.featured-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.featured-card:hover .featured-card__image {
  transform: scale(1.04);
}

.featured-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(45, 74, 45, 0.15), transparent);
}

.featured-card__content {
  background: var(--color-bg-dark);
  color: white;
  padding: var(--space-10) var(--space-10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-5);
}

.featured-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.featured-card__read-time {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.55);
}

.featured-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: white;
  line-height: var(--leading-snug);
}

.featured-card__excerpt {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.72);
  line-height: var(--leading-relaxed);
}

.featured-card__footer {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.featured-card__author {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-light);
}

.featured-card__date {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.45);
  margin-left: auto;
}

@media (max-width: 1024px) {
  .featured-card {
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .featured-card__image-wrap {
    height: 280px;
  }
  .featured-card__title {
    font-size: var(--text-2xl);
  }
  .featured-card__content {
    padding: var(--space-8);
  }
}

/* ── Category Pills ─────────────────────────────────────────── */
.category-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.category-pill--light {
  background: rgba(82, 183, 136, 0.25);
  color: var(--color-accent-light);
}

.category-pill--floating {
  background: var(--color-primary);
  color: white;
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 2;
}

/* ── Blog Grid ──────────────────────────────────────────────── */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.blog-card {
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: transform var(--duration-normal) var(--ease-out), box-shadow var(--duration-normal) var(--ease-out);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.blog-card__image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.blog-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.blog-card:hover .blog-card__image {
  transform: scale(1.05);
}

.blog-card__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-card__read-time,
.blog-card__date {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.blog-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  transition: color var(--duration-fast);
}

.blog-card:hover .blog-card__title {
  color: var(--color-primary);
}

.blog-card__excerpt {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.blog-card__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  margin-top: var(--space-2);
  transition: gap var(--duration-fast);
}

.blog-card:hover .blog-card__cta {
  gap: var(--space-3);
}

@media (max-width: 1024px) {
  .blog-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .blog-grid { grid-template-columns: 1fr; }
  .filter-section { top: 72px; }
}

/* ── Empty State ────────────────────────────────────────────── */
.blog-empty {
  text-align: center;
  padding: var(--space-24) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.blog-empty__icon {
  font-size: var(--text-5xl);
}

.blog-empty h3 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
}

.blog-empty p {
  color: var(--color-text-secondary);
  max-width: 360px;
}
</style>
