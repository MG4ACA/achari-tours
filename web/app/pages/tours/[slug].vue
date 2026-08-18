<template>
  <div class="tour-detail">
    <!-- ═══ HERO ═══ -->
    <section class="tour-hero">
      <div class="tour-hero__bg">
        <img
          :src="tour.heroImage"
          :alt="tour.title"
          class="tour-hero__image"
          fetchpriority="high"
        />
        <div class="overlay overlay--heavy" />
      </div>
      <div class="container tour-hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink>
          <span>›</span>
          <NuxtLink to="/tours">Tours</NuxtLink>
          <span>›</span>
          <span>{{ tour.title }}</span>
        </nav>
        <div class="tour-hero__badges">
          <span v-for="cat in tour.categories" :key="cat" class="badge" :class="`badge--${cat}`">{{ cat }}</span>
        </div>
        <h1 class="tour-hero__title">{{ tour.title }}</h1>
        <p class="tour-hero__subtitle">{{ tour.shortDescription }}</p>
        <div class="tour-hero__stats">
          <div class="tour-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>{{ tour.duration }} Days</span>
          </div>
          <div class="tour-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Max {{ tour.groupSize }} People</span>
          </div>
          <div class="tour-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>{{ tour.difficulty }}</span>
          </div>
          <div class="tour-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Sri Lanka</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MAIN LAYOUT ═══ -->
    <section class="section tour-layout">
      <div class="container">
        <div class="tour-layout__grid">

          <!-- ── LEFT: Main Content ── -->
          <div class="tour-main">

            <!-- Highlights strip -->
            <div class="highlights-strip reveal">
              <div v-for="hl in tour.highlights" :key="hl" class="highlight-item">
                <span class="highlight-item__icon">✓</span>
                <span>{{ hl }}</span>
              </div>
            </div>

            <!-- About -->
            <div class="tour-section reveal">
              <h2 class="tour-section__title">About This Tour</h2>
              <p class="tour-section__text">{{ tour.fullDescription }}</p>
            </div>

            <!-- Itinerary -->
            <div class="tour-section reveal">
              <h2 class="tour-section__title">Day-by-Day Itinerary</h2>
              <div class="itinerary">
                <div
                  v-for="day in tour.itinerary"
                  :key="day.day"
                  class="itinerary-day"
                  :class="{ 'itinerary-day--open': openDay === day.day }"
                >
                  <button class="itinerary-day__header" @click="toggleDay(day.day)">
                    <div class="itinerary-day__number">Day {{ day.day }}</div>
                    <div class="itinerary-day__info">
                      <span class="itinerary-day__title">{{ day.title }}</span>
                      <span class="itinerary-day__location">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {{ day.location }}
                      </span>
                    </div>
                    <svg class="itinerary-day__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="itinerary-day__body">
                    <p class="itinerary-day__description">{{ day.description }}</p>
                    <div class="itinerary-day__meta">
                      <span v-if="day.accommodation" class="itinerary-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        {{ day.accommodation }}
                      </span>
                      <span v-if="day.meals" class="itinerary-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                        {{ day.meals }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Included / Excluded -->
            <div class="tour-section reveal">
              <h2 class="tour-section__title">What's Included</h2>
              <div class="included-grid">
                <div class="included-col">
                  <h3 class="included-col__title included-col__title--yes">Included</h3>
                  <ul class="included-list">
                    <li v-for="item in tour.included" :key="item" class="included-list__item included-list__item--yes">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="included-col">
                  <h3 class="included-col__title included-col__title--no">Not Included</h3>
                  <ul class="included-list">
                    <li v-for="item in tour.excluded" :key="item" class="included-list__item included-list__item--no">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- FAQs -->
            <div class="tour-section reveal">
              <h2 class="tour-section__title">Frequently Asked Questions</h2>
              <div class="faq-list">
                <div
                  v-for="(faq, i) in tour.faqs"
                  :key="i"
                  class="faq-item"
                  :class="{ 'faq-item--open': openFaq === i }"
                >
                  <button class="faq-item__question" @click="toggleFaq(i)">
                    {{ faq.q }}
                    <svg class="faq-item__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="faq-item__answer">
                    <p>{{ faq.a }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── RIGHT: Sticky Sidebar ── -->
          <aside class="tour-sidebar">
            <div class="sidebar-card">
              <div class="sidebar-card__price">
                <span class="sidebar-card__price-label">From</span>
                <span class="sidebar-card__price-value">{{ tour.price }}</span>
                <span class="sidebar-card__price-unit">per person</span>
              </div>
              <div class="sidebar-card__meta">
                <div class="sidebar-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>{{ tour.duration }} Days / {{ tour.duration - 1 }} Nights</span>
                </div>
                <div class="sidebar-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  <span>Max {{ tour.groupSize }} travelers</span>
                </div>
                <div class="sidebar-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>{{ tour.difficulty }} Difficulty</span>
                </div>
              </div>
              <NuxtLink :to="`/contact?tour=${tour.slug}`" class="btn btn--primary btn--full">
                Request Booking
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </NuxtLink>
              <a href="https://wa.me/94XXXXXXXXXX" class="btn btn--secondary btn--full" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.528 5.855L0 24l6.355-1.512A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22c-1.895 0-3.669-.525-5.189-1.434l-.371-.22-3.872.921.944-3.773-.24-.389A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Chat on WhatsApp
              </a>
              <p class="sidebar-card__note">No commitment — we'll send you a personalised itinerary within 24 hours.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ═══ CTA STRIP ═══ -->
    <section class="cta-strip">
      <div class="container cta-strip__inner">
        <div>
          <h3 class="cta-strip__title">Ready to book {{ tour.title }}?</h3>
          <p class="cta-strip__text">Our team crafts your personalized itinerary within 24 hours.</p>
        </div>
        <NuxtLink :to="`/contact?tour=${tour.slug}`" class="btn btn--primary btn--lg">
          Start Planning →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// ── Static tour data (replace with Directus fetch when CMS is ready) ──
const allTours: Record<string, any> = {
  'essential-sri-lanka-5-days': {
    slug: 'essential-sri-lanka-5-days',
    title: 'The Essential Sri Lanka',
    shortDescription: 'A perfect introduction — Colombo to Sigiriya, Kandy temples, and south coast highlights in five action-packed days.',
    fullDescription: 'The Essential Sri Lanka distils the island\'s iconic experiences into five perfectly paced days. Begin in colonial Colombo, ascend the mythical Sigiriya rock fortress at dawn, explore the sacred Temple of the Tooth in Kandy, and wind down on the golden sands of the south coast. This tour is ideal for first-time visitors who want an authentic taste of the island without compromising on comfort or depth.',
    heroImage: '/images/tours/essential-sri-lanka.jpg',
    duration: 5,
    groupSize: 8,
    difficulty: 'Easy',
    price: '$1,299',
    categories: ['cultural', 'wildlife'],
    highlights: [
      'Climb Sigiriya Rock Fortress at sunrise',
      'Guided Kandy Temple of the Tooth visit',
      'Ethical elephant encounter at Udawalawe',
      'Sunset dinner on the south coast',
      'Expert local guide throughout',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Colombo', location: 'Colombo', description: 'Arrive at Bandaranaike International Airport. Private transfer to your boutique hotel in Colombo\'s leafy Cinnamon Gardens. Evening orientation walk through Pettah market and a welcome dinner featuring Sri Lankan cuisine.', accommodation: 'Cinnamon Grand Colombo', meals: 'Dinner' },
      { day: 2, title: 'Colombo → Sigiriya', location: 'Sigiriya', description: 'Early morning drive north to the Cultural Triangle. Afternoon ascent of the Sigiriya Lion Rock — a 5th-century royal palace perched 200 metres above the surrounding jungle. Watch the sunset from the ramparts.', accommodation: 'Aliya Resort, Sigiriya', meals: 'Breakfast, Dinner' },
      { day: 3, title: 'Dambulla → Kandy', location: 'Kandy', description: 'Morning visit to the cave temple at Dambulla, adorned with 153 Buddha statues. Continue to Kandy, the hill capital, for a guided visit to the Temple of the Sacred Tooth Relic. Evening cultural dance performance.', accommodation: 'Amaya Hills, Kandy', meals: 'Breakfast, Dinner' },
      { day: 4, title: 'Kandy → South Coast', location: 'Mirissa', description: 'Scenic train journey through emerald tea plantations in the hill country. Afternoon arrival on the south coast. Sunset at Mirissa beach and a seafood dinner by the ocean.', accommodation: 'Emerald Bay Beach Hotel', meals: 'Breakfast, Dinner' },
      { day: 5, title: 'South Coast → Departure', location: 'Colombo Airport', description: 'Morning at leisure on the beach. Private transfer to Colombo airport for your departure flight. Your Achari Tours guide will accompany you to the airport.', accommodation: 'N/A', meals: 'Breakfast' },
    ],
    included: [
      'Private airport transfers',
      'Accommodation (4 nights, boutique hotels)',
      'Breakfast daily, dinners on Days 1–4',
      'Expert English-speaking local guide',
      'All entrance fees listed in itinerary',
      'Scenic train tickets (Kandy → South Coast)',
      'All transport in private air-conditioned vehicle',
      '24/7 WhatsApp support',
    ],
    excluded: [
      'International flights',
      'Travel insurance (required)',
      'Lunches and unspecified drinks',
      'Optional tipping for guide and driver',
      'Personal expenses and souvenirs',
    ],
    faqs: [
      { q: 'When is the best time to do this tour?', a: 'The Essential Sri Lanka can be done year-round. The south coast is best November–April; the Cultural Triangle is pleasant year-round but slightly drier December–March.' },
      { q: 'Is this tour suitable for families with children?', a: 'Yes, this is our most family-friendly tour. The pace is relaxed and the Sigiriya climb (though steep) is achievable for most ages. We recommend ages 8+.' },
      { q: 'Can the itinerary be customised?', a: 'Absolutely. All Achari Tours itineraries are starting points. Submit an inquiry and we\'ll tailor it to your pace, dietary needs, and interests.' },
    ],
  },
  'heritage-wildlife-discovery-7-days': {
    slug: 'heritage-wildlife-discovery-7-days',
    title: 'Heritage & Wildlife Discovery',
    shortDescription: 'Deep dive into the Cultural Triangle, Yala safari adventure, and a coastal ending with sunset views.',
    fullDescription: 'Seven days to unlock Sri Lanka\'s two greatest treasures — its ancient civilisations and its extraordinary wildlife. Explore the ruins of Anuradhapura and Polonnaruwa, ascend Sigiriya, encounter tusker elephants in Udawalawe, and track elusive leopards through Yala National Park. The journey ends at a secluded south coast retreat, where the pace finally slows.',
    heroImage: '/images/tours/heritage-wildlife.jpg',
    duration: 7,
    groupSize: 6,
    difficulty: 'Moderate',
    price: '$1,899',
    categories: ['cultural', 'wildlife'],
    highlights: [
      'Full-day Yala National Park jeep safari',
      'Ruins of Anuradhapura (2,300-year-old kingdom)',
      'Sigiriya and Pidurangala double ascent',
      'Ethical elephant safari at Udawalawe',
      'Sunset at Mirissa — whale watching season Nov–Apr',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Colombo', location: 'Colombo', description: 'Airport welcome and transfer to Colombo. Evening in the vibrant Pettah and Fort districts.', accommodation: 'Cinnamon Grand Colombo', meals: 'Dinner' },
      { day: 2, title: 'Anuradhapura', location: 'Anuradhapura', description: 'Full day exploring the sacred ancient capital — the Sri Maha Bodhi (the world\'s oldest documented tree), the Ruwanwelisaya Dagoba, and the Jetavanaramaya.', accommodation: 'Ulagalla Resort', meals: 'Breakfast, Dinner' },
      { day: 3, title: 'Sigiriya & Pidurangala', location: 'Sigiriya', description: 'Dawn climb of Pidurangala Rock for the best Sigiriya panorama. Afternoon descent of Sigiriya itself, exploring the frescoes and water gardens.', accommodation: 'Aliya Resort, Sigiriya', meals: 'Breakfast, Dinner' },
      { day: 4, title: 'Polonnaruwa Ruins', location: 'Polonnaruwa', description: 'Cycle through the ancient royal city of Polonnaruwa — the Gal Vihara rock temple and the Royal Palace complex. Continue south toward Kandy.', accommodation: 'Amaya Hills, Kandy', meals: 'Breakfast, Dinner' },
      { day: 5, title: 'Udawalawe Safari', location: 'Udawalawe', description: 'Full morning safari at Udawalawe National Park — home to over 600 wild elephants. Afternoon transfer to the south coast.', accommodation: 'Kumu Beach, Tangalle', meals: 'Breakfast, Dinner' },
      { day: 6, title: 'Yala National Park', location: 'Yala', description: 'Dawn jeep safari in Yala, Sri Lanka\'s most famous park. Yala has the world\'s highest density of leopards. Full day with expert tracker guide.', accommodation: 'Chena Huts by Uga Escapes', meals: 'Breakfast, Dinner' },
      { day: 7, title: 'South Coast & Departure', location: 'Colombo Airport', description: 'Morning on the beach, private transfer to the airport.', accommodation: 'N/A', meals: 'Breakfast' },
    ],
    included: [
      'Private airport transfers',
      'Accommodation (6 nights, boutique hotels)',
      'Breakfast daily, dinners included',
      'Expert English-speaking local guide',
      'All safari park entrance fees and jeep hire',
      'All entrance fees listed in itinerary',
      'All transport in private air-conditioned vehicle',
      '24/7 WhatsApp support',
    ],
    excluded: [
      'International flights',
      'Travel insurance (required)',
      'Lunches and unspecified drinks',
      'Optional tipping',
      'Personal expenses',
    ],
    faqs: [
      { q: 'Is the Yala leopard sighting guaranteed?', a: 'We cannot guarantee wildlife sightings — that\'s the nature of ethical wildlife tourism. However, our expert trackers significantly improve your chances. Yala has the world\'s highest density of leopards.' },
      { q: 'What is the safari vehicle like?', a: 'All safaris use open-top, purpose-built jeeps with a maximum of 6 guests. You\'ll have an expert naturalist guide and a park tracker.' },
      { q: 'Is this tour physically demanding?', a: 'The Sigiriya climb involves a significant ascent (about 200m via stairs). The rest of the tour is accessible. Moderate fitness recommended.' },
    ],
  },
  'complete-island-experience-10-days': {
    slug: 'complete-island-experience-10-days',
    title: 'The Complete Island Experience',
    shortDescription: 'The full loop — culture, hill country, wildlife, and south coast surfing across ten transformative days.',
    fullDescription: 'The most comprehensive Sri Lanka experience we offer. Over ten days, journey from Colombo through the ancient Cultural Triangle, ascend into the misty hill country on a scenic train ride, encounter wildlife in two national parks, and arrive on the south coast for world-class surf and secluded beaches. This is Sri Lanka without compromise — its culture, nature, and people in full dimension.',
    heroImage: '/images/tours/complete-island.jpg',
    duration: 10,
    groupSize: 6,
    difficulty: 'Moderate',
    price: '$2,999',
    categories: ['cultural', 'wildlife', 'coastal'],
    highlights: [
      'Cultural Triangle: Sigiriya, Dambulla, Polonnaruwa',
      'Scenic highland train from Ella to Nuwara Eliya',
      'Udawalawe elephant safari',
      'Yala leopard tracking safari',
      'Surf lessons at Arugam Bay or Hikkaduwa',
      'Sunset whale watching off Mirissa (seasonal)',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Colombo Fort', location: 'Colombo', description: 'Airport welcome. Evening in Fort and Pettah — colonial architecture, street food, and the Galle Face promenade.', accommodation: 'Cinnamon Grand Colombo', meals: 'Dinner' },
      { day: 2, title: 'Anuradhapura Sacred City', location: 'Anuradhapura', description: 'Full day in the ancient sacred city — the oldest capital in Sri Lanka, dating to 380 BC.', accommodation: 'Ulagalla Resort', meals: 'Breakfast, Dinner' },
      { day: 3, title: 'Sigiriya Lion Rock', location: 'Sigiriya', description: 'Dawn ascent of Sigiriya, exploring the 5th-century royal palace and its famous frescoes.', accommodation: 'Aliya Resort, Sigiriya', meals: 'Breakfast, Dinner' },
      { day: 4, title: 'Dambulla & Polonnaruwa', location: 'Polonnaruwa', description: 'Cave temple at Dambulla and cycling tour of ancient Polonnaruwa ruins.', accommodation: 'Deer Park Hotel', meals: 'Breakfast, Dinner' },
      { day: 5, title: 'Kandy Temple & Hill Country Train', location: 'Ella', description: 'Morning at the Temple of the Tooth. Afternoon: iconic highland train through tea estates. Arrival in Ella.', accommodation: 'Ella Jungle Resort', meals: 'Breakfast, Dinner' },
      { day: 6, title: 'Ella & Hill Country', location: 'Nuwara Eliya', description: 'Nine Arches Bridge walk, Little Adam\'s Peak, and afternoon at a working tea factory.', accommodation: 'Jetwing St. Andrews, Nuwara Eliya', meals: 'Breakfast, Dinner' },
      { day: 7, title: 'Udawalawe Safari', location: 'Udawalawe', description: 'Morning safari at Udawalawe — Sri Lanka\'s best park for wild elephant herds.', accommodation: 'Kumu Beach, Tangalle', meals: 'Breakfast, Dinner' },
      { day: 8, title: 'Yala National Park', location: 'Yala', description: 'Full-day jeep safari in Yala. Spot leopards, sloth bears, crocodiles, and hundreds of bird species.', accommodation: 'Chena Huts by Uga Escapes', meals: 'Breakfast, Dinner' },
      { day: 9, title: 'South Coast & Surf', location: 'Mirissa / Unawatuna', description: 'Free morning on the beach. Optional surf lesson. Sunset whale watching trip (Nov–Apr). Evening seafood dinner.', accommodation: 'The Fortress Resort & Spa', meals: 'Breakfast, Dinner' },
      { day: 10, title: 'Galle Fort & Departure', location: 'Colombo Airport', description: 'Morning walk through Galle Fort (UNESCO World Heritage). Afternoon transfer to Colombo airport.', accommodation: 'N/A', meals: 'Breakfast' },
    ],
    included: [
      'Private airport transfers',
      'Accommodation (9 nights, boutique hotels)',
      'Breakfast daily, dinners included',
      'Expert English-speaking local guide (10 days)',
      'All safari park fees and open-top jeeps',
      'Scenic train tickets Kandy → Ella',
      'All entrance fees listed in itinerary',
      'All transport in private air-conditioned vehicle',
      '24/7 WhatsApp support',
    ],
    excluded: [
      'International flights',
      'Travel insurance (required)',
      'Lunches and unspecified drinks',
      'Optional surf lessons ($30/session)',
      'Optional whale watching ($35/person)',
      'Personal expenses and tips',
    ],
    faqs: [
      { q: 'Is this suitable for solo travelers?', a: 'Absolutely. Many of our guests travel solo. You\'ll join a small group of max 6 like-minded travelers and enjoy a private, guided experience throughout.' },
      { q: 'Can this tour be done during the monsoon?', a: 'Sri Lanka has two monsoon seasons affecting different coasts. We adjust the itinerary seasonally to always lead you to the best weather. Contact us for your specific dates.' },
      { q: 'What happens if a park is closed due to weather?', a: 'We have backup plans for every scenario. If Yala is inaccessible, we redirect to Bundala or Wilpattu. Your experience is never compromised.' },
    ],
  },
}

const tour = computed(() => allTours[slug] ?? allTours['essential-sri-lanka-5-days'])

// ── SEO ──
useSeo({
  title: `${tour.value.title} — ${tour.value.duration} Days Sri Lanka Tour`,
  description: tour.value.shortDescription,
})

const { setTourSchema, setBreadcrumbSchema } = useJsonLd()
setBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Tours', url: '/tours' },
  { name: tour.value.title, url: `/tours/${slug}` },
])

// ── Scroll Reveal ──
const { observeAll } = useScrollReveal()
onMounted(() => { observeAll() })

// ── Accordion state ──
const openDay = ref<number | null>(1)
function toggleDay(day: number) {
  openDay.value = openDay.value === day ? null : day
}

const openFaq = ref<number | null>(null)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}
</script>

<style scoped>
/* ═══ HERO ═══ */
.tour-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-16);
}

.tour-hero__bg {
  position: absolute;
  inset: 0;
}

.tour-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}

.tour-hero__content {
  position: relative;
  z-index: 2;
  color: white;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.7);
  margin-bottom: var(--space-4);
}

.breadcrumb a {
  color: rgba(255,255,255,0.7);
  transition: color var(--duration-fast);
}

.breadcrumb a:hover {
  color: white;
}

.tour-hero__badges {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.tour-hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: white;
  margin-bottom: var(--space-4);
  line-height: 1.1;
}

.tour-hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.85);
  max-width: 600px;
  margin-bottom: var(--space-8);
}

.tour-hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.tour-stat {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
}

/* ═══ LAYOUT ═══ */
.tour-layout__grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-12);
  align-items: start;
}

@media (max-width: 1024px) {
  .tour-layout__grid {
    grid-template-columns: 1fr;
  }
  .tour-sidebar {
    order: -1;
  }
}

/* ═══ HIGHLIGHTS STRIP ═══ */
.highlights-strip {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-6);
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-accent-100, #fef9ec));
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-primary-200, #c3d9b0);
  margin-bottom: var(--space-10);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary-dark, #1a3a08);
}

.highlight-item__icon {
  color: var(--color-primary);
  font-weight: 700;
}

/* ═══ SECTIONS ═══ */
.tour-section {
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-12);
  border-bottom: 1px solid var(--color-border-light);
}

.tour-section:last-child {
  border-bottom: none;
}

.tour-section__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
  color: var(--color-text-primary);
}

.tour-section__text {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

/* ═══ ITINERARY ═══ */
.itinerary {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.itinerary-day {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: box-shadow var(--duration-fast);
}

.itinerary-day:hover {
  box-shadow: var(--shadow-md);
}

.itinerary-day__header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-5) var(--space-6);
  text-align: left;
  background: var(--color-bg-primary);
  transition: background var(--duration-fast);
}

.itinerary-day--open .itinerary-day__header {
  background: var(--color-primary-100);
}

.itinerary-day__number {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-lg);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  line-height: 1.2;
}

.itinerary-day__info {
  flex: 1;
}

.itinerary-day__title {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.itinerary-day__location {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin-top: var(--space-1);
}

.itinerary-day__chevron {
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--ease-out);
  color: var(--color-text-tertiary);
}

.itinerary-day--open .itinerary-day__chevron {
  transform: rotate(180deg);
}

.itinerary-day__body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-out);
}

.itinerary-day--open .itinerary-day__body {
  max-height: 400px;
}

.itinerary-day__description {
  padding: 0 var(--space-6) var(--space-4) calc(56px + var(--space-4) + var(--space-6));
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.itinerary-day__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding: 0 var(--space-6) var(--space-5) calc(56px + var(--space-4) + var(--space-6));
}

.itinerary-meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

/* ═══ INCLUDED / EXCLUDED ═══ */
.included-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
}

@media (max-width: 640px) {
  .included-grid {
    grid-template-columns: 1fr;
  }
}

.included-col__title {
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.included-col__title--yes { color: var(--color-primary); }
.included-col__title--no { color: #9ca3af; }

.included-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.included-list__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.included-list__item--yes svg { color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }
.included-list__item--no svg { color: #9ca3af; flex-shrink: 0; margin-top: 2px; }

/* ═══ FAQ ═══ */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.faq-item {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.faq-item__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-5) var(--space-6);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  text-align: left;
  background: var(--color-bg-primary);
  transition: background var(--duration-fast);
}

.faq-item--open .faq-item__question {
  background: var(--color-bg-secondary);
}

.faq-item__chevron {
  flex-shrink: 0;
  transition: transform var(--duration-fast);
  color: var(--color-text-tertiary);
}

.faq-item--open .faq-item__chevron {
  transform: rotate(180deg);
}

.faq-item__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s var(--ease-out);
}

.faq-item--open .faq-item__answer {
  max-height: 300px;
}

.faq-item__answer p {
  padding: 0 var(--space-6) var(--space-5);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

/* ═══ SIDEBAR ═══ */
.tour-sidebar {
  position: sticky;
  top: calc(var(--header-height) + var(--space-6));
}

.sidebar-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
}

.sidebar-card__price {
  text-align: center;
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: var(--space-6);
}

.sidebar-card__price-label {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.sidebar-card__price-value {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  margin: var(--space-1) 0;
}

.sidebar-card__price-unit {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.sidebar-card__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.sidebar-meta-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.sidebar-meta-row svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

.btn--full {
  width: 100%;
  justify-content: center;
  margin-bottom: var(--space-3);
}

.sidebar-card__note {
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-4);
  line-height: var(--leading-relaxed);
}

/* ═══ CTA STRIP ═══ */
.cta-strip {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark, #1a3a08) 100%);
  padding: var(--space-16) 0;
}

.cta-strip__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.cta-strip__title {
  font-size: var(--text-2xl);
  color: white;
  margin-bottom: var(--space-2);
}

.cta-strip__text {
  color: rgba(255,255,255,0.8);
  font-size: var(--text-base);
}
</style>
