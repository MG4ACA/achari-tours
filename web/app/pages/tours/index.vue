<template>
  <div class="tours-page">
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg">
        <img
          src="/images/hero/tours-hero.jpg"
          alt="Sri Lanka landscape with tea plantations and mountains"
          class="page-hero__bg-image"
          fetchpriority="high"
        />
        <div class="overlay" />
      </div>
      <div class="container page-hero__content">
        <span class="label label--accent">CURATED JOURNEYS</span>
        <h1>Tour Packages</h1>
        <p class="text-lead" style="color: rgba(255,255,255,0.85)">
          Complete island experiences combining cultural heritage, wildlife, and coastal beauty.
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="section--sm">
      <div class="container">
        <div class="tours-filters">
          <button
            v-for="filter in filters"
            :key="filter.value"
            class="tours-filter"
            :class="{ 'tours-filter--active': activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Tour Grid -->
    <section class="section--sm">
      <div class="container">
        <div class="grid grid--3">
          <div
            v-for="(tour, index) in filteredTours"
            :key="tour.slug"
            class="card reveal"
            :class="`reveal--delay-${(index % 3) + 1}`"
          >
            <div class="card__image-wrapper">
              <img :src="tour.image" :alt="tour.title" class="card__image" loading="lazy" />
              <div class="card__badges">
                <span v-for="cat in tour.categories" :key="cat" class="badge" :class="`badge--${cat}`">
                  {{ cat }}
                </span>
              </div>
            </div>
            <div class="card__body">
              <h3 class="card__title">{{ tour.title }}</h3>
              <p class="card__description">{{ tour.description }}</p>
              <div class="tour-meta">
                <span class="tour-meta__item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {{ tour.duration }} Days
                </span>
                <span class="tour-meta__item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  {{ tour.difficulty }}
                </span>
              </div>
            </div>
            <div class="card__footer">
              <span class="tour-price">{{ tour.price }}</span>
              <NuxtLink :to="`/tours/${tour.slug}`" class="btn btn--primary btn--sm">
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-if="filteredTours.length === 0" class="tours-empty">
          <p>No tours found for this filter. Try another category.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Tour Packages — Sri Lanka Tours',
  description: 'Explore our curated Sri Lanka tour packages from 5 to 14 days. Cultural heritage, wildlife safari, and coastal experiences for European and Scandinavian travelers.',
})

const { setBreadcrumbSchema } = useJsonLd()
setBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Tours', url: '/tours' },
])

const { observeAll } = useScrollReveal()
onMounted(() => { observeAll() })

const activeFilter = ref('all')
const route = useRoute()

// Read category from query param
onMounted(() => {
  if (route.query.category) {
    activeFilter.value = route.query.category as string
  }
})

const filters = [
  { label: 'All Tours', value: 'all' },
  { label: 'Cultural Heritage', value: 'cultural' },
  { label: 'Wildlife Safari', value: 'wildlife' },
  { label: 'Coastal & Surfing', value: 'coastal' },
]

// Sample data — will be replaced with Directus fetch
const allTours = [
  {
    slug: 'essential-sri-lanka-5-days',
    title: 'The Essential Sri Lanka',
    description: 'A perfect introduction — Colombo to Sigiriya, Kandy temples, and south coast highlights in five action-packed days.',
    image: '/images/tours/essential-sri-lanka.jpg',
    duration: 5,
    difficulty: 'Easy',
    price: 'From $1,299',
    categories: ['cultural', 'wildlife'],
  },
  {
    slug: 'heritage-wildlife-discovery-7-days',
    title: 'Heritage & Wildlife Discovery',
    description: 'Deep dive into the Cultural Triangle, Yala safari adventure, and a coastal ending with sunset views.',
    image: '/images/tours/heritage-wildlife.jpg',
    duration: 7,
    difficulty: 'Moderate',
    price: 'From $1,899',
    categories: ['cultural', 'wildlife'],
  },
  {
    slug: 'complete-island-experience-10-days',
    title: 'The Complete Island Experience',
    description: 'The full loop — culture, hill country, wildlife, and south coast surfing across ten transformative days.',
    image: '/images/tours/complete-island.jpg',
    duration: 10,
    difficulty: 'Moderate',
    price: 'From $2,999',
    categories: ['cultural', 'wildlife', 'coastal'],
  },
  {
    slug: 'grand-sri-lanka-journey-14-days',
    title: 'The Grand Sri Lanka Journey',
    description: 'The definitive experience — everything above plus east coast, train journeys, and hidden gems across fourteen epic days.',
    image: '/images/tours/grand-journey.jpg',
    duration: 14,
    difficulty: 'Moderate',
    price: 'From $4,499',
    categories: ['cultural', 'wildlife', 'coastal'],
  },
  {
    slug: 'surf-soul-retreat-7-days',
    title: 'Surf & Soul Retreat',
    description: 'South and east coast focused — surfing, yoga, whale watching, and Galle Fort culture.',
    image: '/images/tours/surf-soul.jpg',
    duration: 7,
    difficulty: 'Easy',
    price: 'From $1,699',
    categories: ['coastal'],
  },
]

const filteredTours = computed(() => {
  if (activeFilter.value === 'all') return allTours
  return allTours.filter(tour => tour.categories.includes(activeFilter.value))
})
</script>

<style scoped>
/* ── Page Hero ──────────────────────────────────────────── */
.page-hero {
  position: relative;
  padding: calc(var(--header-height) + var(--space-20)) 0 var(--space-20);
  min-height: 400px;
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

/* ── Filters ────────────────────────────────────────────── */
.tours-filters {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding: var(--space-4) 0;
}

.tours-filter {
  padding: var(--space-2) var(--space-5);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-full);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}

.tours-filter:hover {
  background-color: var(--color-primary-100);
  color: var(--color-primary);
}

.tours-filter--active {
  background-color: var(--color-primary);
  color: white;
}

/* ── Tour Meta ──────────────────────────────────────────── */
.tour-meta {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-3);
}

.tour-meta__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.tour-price {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-primary);
}

.card__badges {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  display: flex;
  gap: var(--space-2);
  z-index: 2;
}

.tours-empty {
  text-align: center;
  padding: var(--space-16) 0;
  color: var(--color-text-secondary);
}
</style>
