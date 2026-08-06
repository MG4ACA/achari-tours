<template>
  <div class="about-page">
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero__bg">
        <img
          src="/images/hero/about-hero.jpg"
          alt="Achari Tours team standing in front of ancient temple"
          class="page-hero__bg-image"
          fetchpriority="high"
        />
        <div class="overlay" />
      </div>
      <div class="container page-hero__content">
        <span class="label label--accent">OUR STORY</span>
        <h1>About Achari Tours</h1>
        <p class="text-lead" style="color: rgba(255,255,255,0.85)">
          Refined, respectful, ethical — the meaning behind our name and our promise.
        </p>
      </div>
    </section>

    <!-- The Achari Philosophy -->
    <section class="section">
      <div class="container">
        <div class="about-intro">
          <div class="about-intro__content reveal">
            <span class="label label--accent">THE MEANING OF ACHARI</span>
            <h2>Travel That Honors</h2>
            <p class="text-body-lg">
              In Sinhala, "Achari" (ආචාරී) speaks to refined conduct, respectful behavior, and ethical living.
              It's a word that carries the weight of 2,500 years of Sri Lankan wisdom.
            </p>
            <p class="text-body-lg">
              We founded Achari Tours with a simple belief: the best travel experiences are those that
              honor the land, respect the culture, and leave a positive footprint. Every itinerary we
              craft is designed to share Sri Lanka's extraordinary beauty while protecting what makes
              it extraordinary.
            </p>
          </div>
          <div class="about-intro__image reveal reveal--right">
            <img
              src="/images/about/sri-lanka-landscape.jpg"
              alt="Misty Sri Lankan hill country with tea plantations"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="label label--accent section-header__label reveal">OUR VALUES</span>
          <h2 class="section-header__title reveal reveal--delay-1">What Guides Us</h2>
        </div>

        <div class="values-grid">
          <div v-for="(value, index) in values" :key="value.title" class="value-card reveal" :class="`reveal--delay-${index + 1}`">
            <div class="value-card__icon">{{ value.icon }}</div>
            <h3 class="value-card__title">{{ value.title }}</h3>
            <p class="value-card__text">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Guides -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="label label--accent section-header__label reveal">YOUR HOSTS</span>
          <h2 class="section-header__title reveal reveal--delay-1">Meet Our Guides</h2>
          <p class="section-header__description reveal reveal--delay-2">
            Our guides aren't just knowledgeable — they're passionate storytellers
            born and raised in the lands they share with you.
          </p>
        </div>

        <div class="guides-grid">
          <div v-for="(guide, index) in guides" :key="guide.name" class="guide-card reveal" :class="`reveal--delay-${index + 1}`">
            <div class="guide-card__image-wrapper">
              <img
                :src="guide.image"
                :alt="guide.name"
                class="guide-card__image"
                loading="lazy"
              />
            </div>
            <div class="guide-card__info">
              <h3 class="guide-card__name">{{ guide.name }}</h3>
              <span class="guide-card__role">{{ guide.role }}</span>
              <p class="guide-card__bio">{{ guide.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--dark text-center">
      <div class="container" style="max-width: 600px">
        <h2 class="reveal" style="color: white">Ready to Start Your Journey?</h2>
        <p class="text-lead reveal reveal--delay-1" style="color: rgba(255,255,255,0.8); margin: var(--space-4) 0 var(--space-8)">
          We'd love to hear about your travel dreams and help bring them to life.
        </p>
        <div class="reveal reveal--delay-2">
          <NuxtLink to="/contact" class="btn btn--primary btn--lg">Get in Touch</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'About Us — Achari Tours',
  description: 'Learn about Achari Tours, our philosophy of refined and ethical Sri Lanka travel, and meet the local expert guides who make every journey unforgettable.',
})

const { setBreadcrumbSchema } = useJsonLd()
setBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
])

const { observeAll } = useScrollReveal()
onMounted(() => { observeAll() })

const values = [
  { icon: '🌿', title: 'Ethical Tourism', text: 'We minimize environmental impact and ensure our tourism benefits local communities directly.' },
  { icon: '🤝', title: 'Cultural Respect', text: 'We educate travelers on local customs, dress codes, and temple etiquette before every visit.' },
  { icon: '🐘', title: 'Wildlife Protection', text: 'We partner only with ethical safari operators and maintain safe distances from all wildlife.' },
  { icon: '🧭', title: 'Authentic Experiences', text: 'No tourist traps. We share the real Sri Lanka — the places, people, and stories that matter.' },
  { icon: '👥', title: 'Small Groups', text: 'We keep groups small (max 8) to preserve the quality of experience and protect fragile sites.' },
  { icon: '💚', title: 'Give Back', text: 'A portion of every booking supports local conservation and community development projects.' },
]

const guides = [
  {
    name: 'Guide One',
    role: 'Lead Guide · Cultural Heritage',
    bio: 'Born in the shadow of Sigiriya, with over 10 years of experience guiding travelers through the Cultural Triangle and beyond.',
    image: '/images/guides/guide-1.jpg',
  },
  {
    name: 'Guide Two',
    role: 'Guide · Wildlife & Coastal',
    bio: 'A south coast native with deep knowledge of marine ecosystems, surf breaks, and the wildlife of Yala and Udawalawe.',
    image: '/images/guides/guide-2.jpg',
  },
]
</script>

<style scoped>
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

/* ── Intro ──────────────────────────────────────────────── */
.about-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.about-intro__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-intro__image img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

@media (max-width: 1024px) {
  .about-intro {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

/* ── Values ─────────────────────────────────────────────── */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.value-card {
  text-align: center;
  padding: var(--space-8);
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  transition: all var(--duration-normal) var(--ease-out);
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.value-card__icon {
  font-size: var(--text-4xl);
  margin-bottom: var(--space-4);
}

.value-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.value-card__text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 1024px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .values-grid { grid-template-columns: 1fr; }
}

/* ── Guides ─────────────────────────────────────────────── */
.guides-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
  max-width: 800px;
  margin: 0 auto;
}

.guide-card {
  text-align: center;
  padding: var(--space-8);
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
}

.guide-card__image-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-5);
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 3px solid var(--color-accent-100);
}

.guide-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.guide-card__name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 600;
}

.guide-card__role {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: 500;
  margin-top: var(--space-1);
  margin-bottom: var(--space-3);
}

.guide-card__bio {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 640px) {
  .guides-grid { grid-template-columns: 1fr; }
}
</style>
