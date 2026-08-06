<template>
  <div class="home">
    <!-- ═══ HERO SECTION ═══ -->
    <section class="hero">
      <div class="hero__bg">
        <img
          src="/images/hero/sri-lanka-hero.jpg"
          alt="Golden sunrise over Sigiriya rock fortress in Sri Lanka"
          class="hero__bg-image"
          fetchpriority="high"
        />
        <div class="overlay" />
      </div>

      <div class="hero__content container">
        <span class="label label--accent reveal">SRI LANKA · REFINED TRAVEL</span>
        <h1 class="hero__title reveal reveal--delay-1">
          Journey Through<br />
          <span class="hero__title-accent">Ancient Wonders</span>
        </h1>
        <p class="hero__subtitle reveal reveal--delay-2">
          Curated cultural heritage, wildlife safari, and coastal experiences
          for the discerning traveler. Travel refined, travel respectfully.
        </p>
        <div class="hero__actions reveal reveal--delay-3">
          <NuxtLink to="/tours" class="btn btn--primary btn--lg">
            Explore Tours
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <NuxtLink to="/about" class="btn btn--white btn--lg">
            Our Story
          </NuxtLink>
        </div>

        <!-- Trust Indicators -->
        <div class="hero__trust reveal reveal--delay-4">
          <div class="hero__trust-item">
            <span class="hero__trust-value">5+</span>
            <span class="hero__trust-label">Curated Routes</span>
          </div>
          <div class="hero__trust-divider" />
          <div class="hero__trust-item">
            <span class="hero__trust-value">100%</span>
            <span class="hero__trust-label">Ethical Tourism</span>
          </div>
          <div class="hero__trust-divider" />
          <div class="hero__trust-item">
            <span class="hero__trust-value">Local</span>
            <span class="hero__trust-label">Expert Guides</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll">
        <span class="hero__scroll-text">Scroll to explore</span>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- ═══ EXPERIENCE PILLARS ═══ -->
    <section class="section pillars">
      <div class="container">
        <div class="section-header">
          <span class="label label--accent section-header__label reveal">THREE PILLARS OF EXPERIENCE</span>
          <h2 class="section-header__title reveal reveal--delay-1">One Island, Three Worlds</h2>
          <p class="section-header__description reveal reveal--delay-2">
            Sri Lanka holds more per square mile than anywhere on Earth. From ancient
            rock fortresses to wild tusker elephants and world-class surf breaks.
          </p>
        </div>

        <div class="pillars__grid">
          <div
            v-for="(pillar, index) in pillars"
            :key="pillar.title"
            class="pillar-card reveal"
            :class="`reveal--delay-${index + 1}`"
          >
            <div class="pillar-card__image-wrapper">
              <img
                :src="pillar.image"
                :alt="pillar.alt"
                class="pillar-card__image"
                loading="lazy"
              />
              <div class="overlay" />
              <div class="pillar-card__icon">{{ pillar.icon }}</div>
            </div>
            <div class="pillar-card__content">
              <span class="label" :style="{ color: pillar.color }">{{ pillar.label }}</span>
              <h3 class="pillar-card__title">{{ pillar.title }}</h3>
              <p class="pillar-card__description">{{ pillar.description }}</p>
              <NuxtLink :to="pillar.link" class="pillar-card__link">
                Discover more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURED TOURS ═══ -->
    <section class="section section--alt featured-tours">
      <div class="container">
        <div class="section-header">
          <span class="label label--accent section-header__label reveal">CURATED JOURNEYS</span>
          <h2 class="section-header__title reveal reveal--delay-1">Our Signature Tours</h2>
          <p class="section-header__description reveal reveal--delay-2">
            Handcrafted itineraries that blend culture, wildlife, and coastal beauty
            into unforgettable island experiences.
          </p>
        </div>

        <!-- Tour cards placeholder — will be populated from Directus -->
        <div class="grid grid--3">
          <div
            v-for="(tour, index) in sampleTours"
            :key="tour.slug"
            class="card reveal"
            :class="`reveal--delay-${index + 1}`"
          >
            <div class="card__image-wrapper">
              <img
                :src="tour.image"
                :alt="tour.title"
                class="card__image"
                loading="lazy"
              />
              <div class="card__badges">
                <span v-for="cat in tour.categories" :key="cat" class="badge" :class="`badge--${cat}`">
                  {{ cat }}
                </span>
              </div>
            </div>
            <div class="card__body">
              <h3 class="card__title">{{ tour.title }}</h3>
              <p class="card__description">{{ tour.description }}</p>
            </div>
            <div class="card__footer">
              <span class="card__duration">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {{ tour.duration }} Days
              </span>
              <NuxtLink :to="`/tours/${tour.slug}`" class="btn btn--ghost btn--sm">
                View Details →
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="text-center mt-12 reveal">
          <NuxtLink to="/tours" class="btn btn--secondary btn--lg">
            View All Tours
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ WHY ACHARI ═══ -->
    <section class="section why-achari">
      <div class="container">
        <div class="why-achari__layout">
          <div class="why-achari__content">
            <span class="label label--accent reveal">WHY ACHARI TOURS</span>
            <h2 class="reveal reveal--delay-1">Travel That Respects<br/>the Land & Its People</h2>
            <p class="text-lead reveal reveal--delay-2">
              "Achari" means refined, respectful, ethical conduct in Sinhala.
              It's not just our name — it's how we operate.
            </p>

            <div class="why-achari__features">
              <div v-for="(feature, index) in features" :key="feature.title" class="why-achari__feature reveal" :class="`reveal--delay-${index + 1}`">
                <div class="why-achari__feature-icon">{{ feature.icon }}</div>
                <div>
                  <h4 class="why-achari__feature-title">{{ feature.title }}</h4>
                  <p class="why-achari__feature-text">{{ feature.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="why-achari__images reveal reveal--right">
            <img
              src="/images/about/guide-with-travelers.jpg"
              alt="Achari Tours guide leading travelers through ancient temple"
              class="why-achari__image-main"
              loading="lazy"
            />
            <img
              src="/images/about/ethical-tourism.jpg"
              alt="Respectful wildlife observation at a safe distance"
              class="why-achari__image-secondary"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA BANNER ═══ -->
    <section class="cta-banner">
      <div class="cta-banner__bg">
        <img
          src="/images/hero/south-coast-sunset.jpg"
          alt="Sunset over Sri Lanka south coast waves"
          class="cta-banner__bg-image"
          loading="lazy"
        />
        <div class="overlay overlay--full" />
      </div>
      <div class="container cta-banner__content">
        <h2 class="cta-banner__title reveal">Ready to Discover Sri Lanka?</h2>
        <p class="cta-banner__text reveal reveal--delay-1">
          Tell us about your dream trip and we'll craft a personalized itinerary just for you.
        </p>
        <div class="reveal reveal--delay-2">
          <NuxtLink to="/contact" class="btn btn--primary btn--lg">
            Start Planning
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// ── SEO ────────────────────────────────────────────────────
useSeo({
  title: 'Achari Tours — Refined Sri Lanka Travel Experiences',
  description: 'Discover Sri Lanka through curated cultural heritage, wildlife safari, and coastal experiences. Boutique travel for European and Scandinavian explorers.',
})

const { setTravelAgencySchema } = useJsonLd()
setTravelAgencySchema()

// ── Scroll Reveal ──────────────────────────────────────────
const { observeAll } = useScrollReveal()
onMounted(() => {
  observeAll()
})

// ── Data ───────────────────────────────────────────────────
const pillars = [
  {
    icon: '🏛️',
    label: 'CULTURAL HERITAGE',
    title: 'Ancient Wonders',
    description: 'Walk the ruins of 2,500-year-old kingdoms. Climb Sigiriya at dawn. Witness living traditions in temple cities.',
    image: '/images/pillars/cultural-heritage.jpg',
    alt: 'Ancient Sigiriya rock fortress at golden hour',
    color: 'var(--color-earth)',
    link: '/tours?category=cultural',
  },
  {
    icon: '🐘',
    label: 'WILDLIFE SAFARI',
    title: 'Wild Encounters',
    description: 'Track tusker elephants through Yala. Watch whales breach off Mirissa. Meet leopards in the dry zone.',
    image: '/images/pillars/wildlife-safari.jpg',
    alt: 'Tusker elephant in Yala National Park',
    color: 'var(--color-wildlife)',
    link: '/tours?category=wildlife',
  },
  {
    icon: '🏄',
    label: 'COASTAL & SURFING',
    title: 'Ocean & Shore',
    description: 'Catch world-class waves at Arugam Bay. Explore coral reefs. Relax on untouched southern beaches.',
    image: '/images/pillars/coastal-surfing.jpg',
    alt: 'Surfer riding a wave on the Sri Lankan south coast',
    color: 'var(--color-ocean)',
    link: '/tours?category=coastal',
  },
]

const sampleTours = [
  {
    slug: 'essential-sri-lanka-5-days',
    title: 'The Essential Sri Lanka',
    description: 'A perfect introduction — Colombo to Sigiriya, Kandy temples, and south coast highlights in five action-packed days.',
    image: '/images/tours/essential-sri-lanka.jpg',
    duration: 5,
    categories: ['cultural', 'wildlife'],
  },
  {
    slug: 'heritage-wildlife-discovery-7-days',
    title: 'Heritage & Wildlife Discovery',
    description: 'Deep dive into the Cultural Triangle, Yala safari adventure, and a coastal ending with sunset views.',
    image: '/images/tours/heritage-wildlife.jpg',
    duration: 7,
    categories: ['cultural', 'wildlife'],
  },
  {
    slug: 'complete-island-experience-10-days',
    title: 'The Complete Island Experience',
    description: 'The full loop — culture, hill country, wildlife, and south coast surfing across ten transformative days.',
    image: '/images/tours/complete-island.jpg',
    duration: 10,
    categories: ['cultural', 'wildlife', 'coastal'],
  },
]

const features = [
  {
    icon: '🌿',
    title: 'Ethical by Design',
    text: 'Every tour is designed to minimize environmental impact and maximize community benefit.',
  },
  {
    icon: '🧭',
    title: 'Local Expert Guides',
    text: 'Our guides aren\'t just knowledgeable — they\'re passionate storytellers born in these lands.',
  },
  {
    icon: '✨',
    title: 'Curated, Not Cookie-Cutter',
    text: 'We don\'t sell packages — we craft personalized journeys tailored to your pace and interests.',
  },
  {
    icon: '🤝',
    title: 'Small Groups, Big Impact',
    text: 'We keep groups small to preserve the experience and protect the destinations we love.',
  },
]
</script>

<style scoped>
/* ═══ HERO ═══ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero__content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 720px;
  padding-top: var(--space-20);
  padding-bottom: var(--space-20);
}

.hero__title {
  font-size: var(--text-7xl);
  font-weight: 700;
  line-height: 1.05;
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
  color: white;
}

.hero__title-accent {
  color: var(--color-accent-light);
}

.hero__subtitle {
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  color: rgba(255, 255, 255, 0.85);
  max-width: 540px;
  margin-bottom: var(--space-10);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero__trust {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.hero__trust-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.hero__trust-value {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-accent-light);
}

.hero__trust-label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.hero__trust-divider {
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 2;
}

.hero__scroll-text {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
  animation: float 2s ease-in-out infinite;
}

@media (max-width: 768px) {
  .hero__title {
    font-size: var(--text-4xl);
  }

  .hero__subtitle {
    font-size: var(--text-lg);
  }

  .hero__trust {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }

  .hero__trust-divider {
    display: none;
  }

  .hero__scroll {
    display: none;
  }
}

/* ═══ PILLARS ═══ */
.pillars__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.pillar-card {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background-color: white;
  border: 1px solid var(--color-border-light);
  transition: all var(--duration-normal) var(--ease-out);
}

.pillar-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-2xl);
}

.pillar-card__image-wrapper {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.pillar-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slower) var(--ease-out);
}

.pillar-card:hover .pillar-card__image {
  transform: scale(1.08);
}

.pillar-card__icon {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  font-size: var(--text-3xl);
  z-index: 2;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}

.pillar-card__content {
  padding: var(--space-8);
}

.pillar-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  margin: var(--space-2) 0 var(--space-3);
}

.pillar-card__description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-5);
}

.pillar-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  transition: gap var(--duration-fast) var(--ease-out);
}

.pillar-card__link:hover {
  gap: var(--space-3);
}

@media (max-width: 1024px) {
  .pillars__grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
}

/* ═══ TOUR CARDS ADDITIONS ═══ */
.card__badges {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  display: flex;
  gap: var(--space-2);
  z-index: 2;
}

.card__duration {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

/* ═══ WHY ACHARI ═══ */
.why-achari__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.why-achari__content h2 {
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.why-achari__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-top: var(--space-10);
}

.why-achari__feature {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.why-achari__feature-icon {
  font-size: var(--text-2xl);
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.why-achari__feature-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.why-achari__feature-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.why-achari__images {
  position: relative;
  height: 500px;
}

.why-achari__image-main {
  width: 80%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

.why-achari__image-secondary {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 55%;
  height: 250px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  border: 4px solid var(--color-bg-primary);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
  .why-achari__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .why-achari__images {
    height: 350px;
  }
}

/* ═══ CTA BANNER ═══ */
.cta-banner {
  position: relative;
  padding: var(--space-32) 0;
  text-align: center;
  overflow: hidden;
}

.cta-banner__bg {
  position: absolute;
  inset: 0;
}

.cta-banner__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-banner__content {
  position: relative;
  z-index: 2;
}

.cta-banner__title {
  font-size: var(--text-5xl);
  color: white;
  margin-bottom: var(--space-4);
}

.cta-banner__text {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.85);
  max-width: 500px;
  margin: 0 auto var(--space-10);
  line-height: var(--leading-relaxed);
}

@media (max-width: 768px) {
  .cta-banner {
    padding: var(--space-20) 0;
  }

  .cta-banner__title {
    font-size: var(--text-3xl);
  }
}
</style>
