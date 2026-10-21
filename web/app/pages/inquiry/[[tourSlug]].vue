<template>
  <div class="inquiry-page">
    <!-- ═══ HEADER / HERO ═══ -->
    <section class="inquiry-hero">
      <div class="inquiry-hero__bg">
        <img
          src="/images/hero/tours-hero.jpg"
          alt="Sri Lanka landscape"
          class="inquiry-hero__image"
          fetchpriority="high"
        />
        <div class="overlay overlay--heavy" />
      </div>

      <div class="container inquiry-hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink>
          <span>›</span>
          <NuxtLink to="/tours">Tours</NuxtLink>
          <span>›</span>
          <span>Booking Inquiry</span>
        </nav>

        <span class="label label--accent">BESPOKE SRI LANKA JOURNEYS</span>
        <h1 class="inquiry-hero__title">
          {{ isSubmitted ? 'Inquiry Confirmed' : 'Request Your Tailored Itinerary' }}
        </h1>
        <p class="inquiry-hero__subtitle">
          {{ isSubmitted 
            ? 'Thank you! Your personalized travel proposal is currently being crafted.' 
            : 'Select your preferred package, travel dates, and bespoke experiences. Our travel specialists will deliver your personalized proposal within 24 hours.' 
          }}
        </p>

        <!-- Trust Badges -->
        <div class="inquiry-hero__trust">
          <div class="trust-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>24h Response</span>
          </div>
          <div class="trust-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>No Obligation</span>
          </div>
          <div class="trust-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Licensed Local Guides</span>
          </div>
          <div class="trust-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>100% Customizable</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MAIN INQUIRY WORKFLOW ═══ -->
    <section class="section inquiry-body">
      <div class="container">
        <!-- ══ SUCCESS STATE ══ -->
        <div v-if="isSubmitted" class="success-card reveal">
          <div class="success-card__icon-wrapper">
            <svg class="success-card__icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <span class="label label--accent">CONFIRMATION</span>
          <h2 class="success-card__title">Booking Request Received</h2>
          <p class="success-card__subtitle">
            We have registered your inquiry for <strong>{{ form.tourTitle || 'Custom Sri Lanka Tour' }}</strong>.
          </p>

          <div class="reference-box">
            <span class="reference-box__label">Your Booking Reference</span>
            <div class="reference-box__code-row">
              <span class="reference-box__code">{{ referenceCode }}</span>
              <button class="btn btn--sm btn--ghost" @click="copyReferenceCode">
                {{ copied ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
            <p class="reference-box__note">A confirmation email has been sent to <strong>{{ form.email }}</strong>.</p>
          </div>

          <!-- Summary Recap -->
          <div class="success-recap">
            <div class="recap-item">
              <span class="recap-label">Travel Dates:</span>
              <span class="recap-val">{{ form.preferredStartDate || 'Flexible' }} → {{ form.preferredEndDate || 'Open' }}</span>
            </div>
            <div class="recap-item">
              <span class="recap-label">Travelers:</span>
              <span class="recap-val">{{ form.adultCount }} Adults, {{ form.childCount }} Children</span>
            </div>
            <div v-if="form.selectedAddons.length > 0" class="recap-item">
              <span class="recap-label">Add-ons:</span>
              <span class="recap-val">{{ form.selectedAddons.join(', ') }}</span>
            </div>
          </div>

          <!-- What Happens Next -->
          <div class="next-steps-timeline">
            <h4 class="next-steps-timeline__title">What Happens Next?</h4>
            <div class="timeline-step">
              <div class="timeline-num">1</div>
              <div class="timeline-text">
                <strong>Itinerary Curation</strong>
                <p>Our Colombo and Kandy guides review your dates and requested experiences.</p>
              </div>
            </div>
            <div class="timeline-step">
              <div class="timeline-num">2</div>
              <div class="timeline-text">
                <strong>Bespoke Proposal & Quote</strong>
                <p>You'll receive a detailed day-by-day plan with transparent, fixed pricing.</p>
              </div>
            </div>
            <div class="timeline-step">
              <div class="timeline-num">3</div>
              <div class="timeline-text">
                <strong>Direct WhatsApp Chat</strong>
                <p>Chat directly with your lead guide to refine any details until it's 100% perfect.</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="success-actions">
            <a
              :href="`https://wa.me/94771234567?text=${encodeURIComponent(`Hi Achari Tours, I just submitted booking inquiry ${referenceCode} for ${form.tourTitle}. Looking forward to connecting!`)}`"
              target="_blank"
              class="btn btn--secondary btn--lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.528 5.855L0 24l6.355-1.512A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22c-1.895 0-3.669-.525-5.189-1.434l-.371-.22-3.872.921.944-3.773-.24-.389A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Fast-Track via WhatsApp
            </a>
            <NuxtLink to="/tours" class="btn btn--ghost btn--lg">
              Explore More Tours
            </NuxtLink>
            <button class="btn btn--ghost btn--sm" @click="handleNewInquiry">
              Submit Another Inquiry
            </button>
          </div>
        </div>

        <!-- ══ ACTIVE FORM WORKFLOW ══ -->
        <div v-else class="inquiry-grid">
          <!-- Left Column: Multi-Step Form -->
          <div class="inquiry-main">
            <!-- Mode Switcher Bar -->
            <div class="inquiry-mode-bar">
              <span class="inquiry-mode-label">Mode:</span>
              <div class="inquiry-mode-pills">
                <span class="mode-pill mode-pill--active">
                  ✨ Full Itinerary Builder
                </span>
                <button type="button" class="mode-pill mode-pill--btn" @click="openQuickModal">
                  ⚡ Fast 1-Min Inquiry instead
                </button>
              </div>
            </div>

            <!-- Step Indicators -->
            <div class="stepper">
              <div
                v-for="s in [1, 2, 3]"
                :key="s"
                class="stepper-item"
                :class="{
                  'stepper-item--active': currentStep === s,
                  'stepper-item--complete': currentStep > s,
                }"
                @click="goToStep(s)"
              >
                <div class="stepper-circle">
                  <svg v-if="currentStep > s" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  <span v-else>{{ s }}</span>
                </div>
                <div class="stepper-meta">
                  <span class="stepper-step">Step {{ s }}</span>
                  <span class="stepper-title">
                    {{ s === 1 ? 'Dates & Party' : s === 2 ? 'Experience & Add-ons' : 'Your Details' }}
                  </span>
                </div>
                <div v-if="s < 3" class="stepper-line" />
              </div>
            </div>

            <!-- Error Banner -->
            <div v-if="error" class="inquiry-error-banner" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>{{ error }}</span>
            </div>

            <form @submit.prevent="handleSubmit">
              <!-- ─── STEP 1: DATES & PARTY ───────────────────────── -->
              <div v-show="currentStep === 1" class="step-card">
                <div class="step-header">
                  <h3 class="step-title">1. Travel Package & Dates</h3>
                  <p class="step-desc">Pick your package (or tailor a custom one) and select your preferred travel window.</p>
                </div>

                <!-- Package Selection -->
                <div class="form-group">
                  <label for="tour-select" class="form-label">Selected Tour Package</label>
                  <select
                    id="tour-select"
                    v-model="selectedTourSlug"
                    class="form-select"
                    @change="onTourChange"
                  >
                    <option value="custom">Custom Itinerary (Tailored from scratch)</option>
                    <option
                      v-for="t in tourOptions"
                      :key="t.slug"
                      :value="t.slug"
                    >
                      {{ t.title }} ({{ t.duration }} Days — from {{ t.price }})
                    </option>
                  </select>
                </div>

                <!-- Dates Selection -->
                <div class="form-row form-row--2">
                  <div class="form-group">
                    <label for="start-date" class="form-label">
                      Preferred Start Date <span class="required">*</span>
                    </label>
                    <input
                      id="start-date"
                      v-model="form.preferredStartDate"
                      type="date"
                      class="form-input"
                      :min="minDate"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="end-date" class="form-label">
                      Estimated End Date
                    </label>
                    <input
                      id="end-date"
                      v-model="form.preferredEndDate"
                      type="date"
                      class="form-input"
                      :min="form.preferredStartDate || minDate"
                    />
                  </div>
                </div>

                <!-- Travelers Counters -->
                <div class="form-row form-row--2">
                  <div class="counter-box">
                    <div class="counter-label-group">
                      <span class="counter-title">Adult Travelers</span>
                      <span class="counter-subtitle">Ages 12+ (min 1)</span>
                    </div>
                    <div class="counter-controls">
                      <button
                        type="button"
                        class="counter-btn"
                        :disabled="form.adultCount <= 1"
                        @click="form.adultCount = Math.max(1, form.adultCount - 1)"
                      >
                        −
                      </button>
                      <span class="counter-val">{{ form.adultCount }}</span>
                      <button
                        type="button"
                        class="counter-btn"
                        :disabled="form.adultCount >= 20"
                        @click="form.adultCount++"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div class="counter-box">
                    <div class="counter-label-group">
                      <span class="counter-title">Children</span>
                      <span class="counter-subtitle">Ages 0–11</span>
                    </div>
                    <div class="counter-controls">
                      <button
                        type="button"
                        class="counter-btn"
                        :disabled="form.childCount <= 0"
                        @click="form.childCount = Math.max(0, form.childCount - 1)"
                      >
                        −
                      </button>
                      <span class="counter-val">{{ form.childCount }}</span>
                      <button
                        type="button"
                        class="counter-btn"
                        :disabled="form.childCount >= 15"
                        @click="form.childCount++"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Step 1 Controls -->
                <div class="step-footer">
                  <div />
                  <button
                    type="button"
                    class="btn btn--primary btn--lg"
                    @click="handleStep1Next"
                  >
                    Continue to Experience Options
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>

              <!-- ─── STEP 2: EXPERIENCE & ADD-ONS ─────────────────── -->
              <div v-show="currentStep === 2" class="step-card">
                <div class="step-header">
                  <h3 class="step-title">2. Enhance Your Journey</h3>
                  <p class="step-desc">Select handcrafted add-ons and tell us about any special requirements.</p>
                </div>

                <!-- Add-ons Selection -->
                <div class="form-group">
                  <label class="form-label">Curated Experience Add-ons</label>
                  <div class="addons-grid">
                    <label
                      v-for="addon in availableAddons"
                      :key="addon.id"
                      class="addon-card"
                      :class="{ 'addon-card--checked': form.selectedAddons.includes(addon.title) }"
                    >
                      <input
                        type="checkbox"
                        :value="addon.title"
                        v-model="form.selectedAddons"
                        class="addon-checkbox"
                      />
                      <div class="addon-content">
                        <div class="addon-icon">{{ addon.icon }}</div>
                        <div class="addon-info">
                          <span class="addon-title">{{ addon.title }}</span>
                          <span class="addon-desc">{{ addon.desc }}</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Special Requests -->
                <div class="form-group">
                  <label for="special-requests" class="form-label">
                    Dietary Needs, Special Requests, or Preferred Pace
                  </label>
                  <textarea
                    id="special-requests"
                    v-model="form.specialRequests"
                    rows="3"
                    class="form-textarea"
                    placeholder="E.g., Vegetarian meals, celebrate wedding anniversary, prefer relaxed mornings, photography focus..."
                  />
                </div>

                <!-- Step 2 Controls -->
                <div class="step-footer">
                  <button
                    type="button"
                    class="btn btn--ghost btn--lg"
                    @click="prevStep"
                  >
                    ← Back to Dates
                  </button>
                  <button
                    type="button"
                    class="btn btn--primary btn--lg"
                    @click="handleStep2Next"
                  >
                    Continue to Contact Info
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>

              <!-- ─── STEP 3: CONTACT & SUBMISSION ─────────────────── -->
              <div v-show="currentStep === 3" class="step-card">
                <div class="step-header">
                  <h3 class="step-title">3. Your Contact Details</h3>
                  <p class="step-desc">We will send your bespoke itinerary proposal and quote directly to you.</p>
                </div>

                <div class="form-row form-row--2">
                  <div class="form-group">
                    <label for="first-name" class="form-label">
                      First Name <span class="required">*</span>
                    </label>
                    <input
                      id="first-name"
                      v-model="form.firstName"
                      type="text"
                      class="form-input"
                      placeholder="e.g. Erik"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="last-name" class="form-label">
                      Last Name <span class="required">*</span>
                    </label>
                    <input
                      id="last-name"
                      v-model="form.lastName"
                      type="text"
                      class="form-input"
                      placeholder="e.g. Lindqvist"
                      required
                    />
                  </div>
                </div>

                <div class="form-row form-row--2">
                  <div class="form-group">
                    <label for="email" class="form-label">
                      Email Address <span class="required">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="form-input"
                      placeholder="erik@example.com"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="phone" class="form-label">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="form-input"
                      placeholder="+46 70 123 4567"
                    />
                    <span class="form-hint">Used for fast WhatsApp coordination while in Sri Lanka</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="country" class="form-label">
                    Country of Residence <span class="required">*</span>
                  </label>
                  <select
                    id="country"
                    v-model="form.country"
                    class="form-select"
                    required
                  >
                    <option value="" disabled>Select your country</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Austria">Austria</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <!-- Reassurance / Consent -->
                <div class="privacy-note">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span>We value your privacy. No spam, ever. Your information is only used to prepare your travel quote and itinerary.</span>
                </div>

                <!-- Step 3 Controls -->
                <div class="step-footer">
                  <button
                    type="button"
                    class="btn btn--ghost btn--lg"
                    @click="prevStep"
                    :disabled="isSubmitting"
                  >
                    ← Back to Experience
                  </button>
                  <button
                    type="submit"
                    class="btn btn--primary btn--lg"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting">Submitting Request...</span>
                    <span v-else>
                      Submit Booking Inquiry
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Right Column: Sticky Summary Card -->
          <aside class="inquiry-sidebar">
            <div class="summary-card">
              <h4 class="summary-card__heading">Your Journey Summary</h4>

              <div class="summary-tour-preview">
                <img
                  :src="activeTourData?.image || '/images/hero/tours-hero.jpg'"
                  :alt="form.tourTitle || 'Tour preview'"
                  class="summary-tour-img"
                />
                <div class="summary-tour-info">
                  <span class="summary-tour-badge">{{ activeTourData ? `${activeTourData.duration} Days` : 'Custom' }}</span>
                  <h5 class="summary-tour-title">{{ form.tourTitle || 'Custom Sri Lanka Journey' }}</h5>
                  <span class="summary-tour-price">{{ activeTourData ? activeTourData.price : 'Custom Quote' }}</span>
                </div>
              </div>

              <div class="summary-divider" />

              <div class="summary-details">
                <div class="summary-row">
                  <span class="summary-label">Start Date</span>
                  <span class="summary-val">{{ form.preferredStartDate || 'Not selected yet' }}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">End Date</span>
                  <span class="summary-val">{{ form.preferredEndDate || 'Open' }}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Party</span>
                  <span class="summary-val">
                    {{ form.adultCount }} Adult{{ form.adultCount > 1 ? 's' : '' }}
                    <template v-if="form.childCount > 0">, {{ form.childCount }} Child{{ form.childCount > 1 ? 'ren' : '' }}</template>
                  </span>
                </div>
                <div v-if="form.selectedAddons.length > 0" class="summary-addons">
                  <span class="summary-label">Add-ons ({{ form.selectedAddons.length }}):</span>
                  <div class="summary-pills">
                    <span v-for="a in form.selectedAddons" :key="a" class="summary-pill">{{ a }}</span>
                  </div>
                </div>
              </div>

              <div class="summary-guarantee">
                <div class="guarantee-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>100% Free Cancellation before final confirmation</span>
                </div>
                <div class="guarantee-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Personal chauffeur & licensed expert guide</span>
                </div>
                <div class="guarantee-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Transparent pricing with zero hidden fees</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// ── Booking Inquiry Composable ──
const {
  form,
  currentStep,
  isSubmitting,
  isSubmitted,
  error,
  referenceCode,
  prevStep,
  validateStep,
  submitInquiry,
  resetForm,
} = useBookingInquiry()

// ── Tour Options Catalog ──
const tourOptions = [
  {
    slug: 'essential-sri-lanka-5-days',
    title: 'The Essential Sri Lanka',
    duration: 5,
    price: 'From $1,299',
    image: '/images/tours/essential-sri-lanka.jpg',
  },
  {
    slug: 'heritage-wildlife-discovery-7-days',
    title: 'Heritage & Wildlife Discovery',
    duration: 7,
    price: 'From $1,899',
    image: '/images/tours/heritage-wildlife.jpg',
  },
  {
    slug: 'complete-island-experience-10-days',
    title: 'The Complete Island Experience',
    duration: 10,
    price: 'From $2,999',
    image: '/images/tours/complete-island.jpg',
  },
  {
    slug: 'grand-sri-lanka-journey-14-days',
    title: 'The Grand Sri Lanka Journey',
    duration: 14,
    price: 'From $4,499',
    image: '/images/tours/grand-journey.jpg',
  },
  {
    slug: 'surf-soul-retreat-7-days',
    title: 'Surf & Soul Retreat',
    duration: 7,
    price: 'From $1,699',
    image: '/images/tours/surf-soul.jpg',
  },
]

// Available Add-ons
const availableAddons = [
  { id: 'suv', icon: '🚙', title: 'Luxury SUV & Dedicated Chauffeur', desc: 'Premium 4x4 Land Cruiser / Mercedes Van with English-speaking private chauffeur.' },
  { id: 'balloon', icon: '🎈', title: 'Sunrise Hot Air Ballooning', desc: 'Float at dawn over Kandalama lake and the ancient Sigiriya rock fortress.' },
  { id: 'whale', icon: '🐋', title: 'Private Catamaran Whale Watching', desc: 'Exclusive blue whale and dolphin tracking off Mirissa with marine biologist.' },
  { id: 'spa', icon: '🌿', title: 'Ayurvedic Wellness & Herbal Spa', desc: 'Full-day traditional Sri Lankan herbal bath, shirodhara, and private yoga session.' },
  { id: 'cooking', icon: '🥘', title: 'Village Culinary Masterclass', desc: 'Market tour and outdoor clay-pot cooking lesson with a rural village family.' },
  { id: 'photo', icon: '📸', title: 'Specialist Wildlife Photo Guide', desc: 'Expert wildlife photographer guide with specialized safari vehicle positioning.' },
]

// ── Initial State & Route Params ──
const selectedTourSlug = ref('custom')

// Compute today's date for min date
const minDate = computed(() => {
  const d = new Date()
  return d.toISOString().split('T')[0]
})

// Current tour metadata
const activeTourData = computed(() => {
  return tourOptions.find(t => t.slug === selectedTourSlug.value) || null
})

// Copy reference code helper
const copied = ref(false)
function copyReferenceCode() {
  if (referenceCode.value) {
    navigator.clipboard.writeText(referenceCode.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  }
}

// Quick Inquiry Modal Trigger
const isQuickInquiryOpen = useState<boolean>('quickInquiryOpen', () => false)
const quickInquiryTour = useState<string>('quickInquiryTour', () => 'general')

function openQuickModal() {
  quickInquiryTour.value = selectedTourSlug.value
  isQuickInquiryOpen.value = true
}

// Initialize from route
onMounted(() => {
  const slugFromParam = (route.params.tourSlug as string) || (route.query.tour as string) || ''
  if (slugFromParam) {
    const matched = tourOptions.find(t => t.slug === slugFromParam)
    if (matched) {
      selectedTourSlug.value = matched.slug
      form.tourId = matched.slug
      form.tourTitle = matched.title
    }
  } else {
    // Default to first tour if nothing chosen
    const firstTour = tourOptions[0]
    selectedTourSlug.value = firstTour.slug
    form.tourId = firstTour.slug
    form.tourTitle = firstTour.title
  }
})

function onTourChange() {
  if (selectedTourSlug.value === 'custom') {
    form.tourId = 'custom'
    form.tourTitle = 'Custom Tailored Sri Lanka Itinerary'
  } else {
    const found = tourOptions.find(t => t.slug === selectedTourSlug.value)
    if (found) {
      form.tourId = found.slug
      form.tourTitle = found.title
    }
  }
}

// ── Step Navigation & Validation ──
function handleStep1Next() {
  if (validateStep(1)) {
    // Auto-calculate end date if not set and tour has duration
    if (!form.preferredEndDate && form.preferredStartDate && activeTourData.value) {
      const start = new Date(form.preferredStartDate)
      start.setDate(start.getDate() + activeTourData.value.duration)
      form.preferredEndDate = start.toISOString().split('T')[0]
    }
    currentStep.value = 2
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }
}

function handleStep2Next() {
  if (validateStep(2)) {
    currentStep.value = 3
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }
}

function goToStep(step: number) {
  if (step < currentStep.value) {
    currentStep.value = step
  } else if (step === 2 && validateStep(1)) {
    currentStep.value = 2
  } else if (step === 3 && validateStep(1) && validateStep(2)) {
    currentStep.value = 3
  }
}

async function handleSubmit() {
  const success = await submitInquiry()
  if (success) {
    window.scrollTo({ top: 150, behavior: 'smooth' })
  }
}

function handleNewInquiry() {
  resetForm()
  router.push('/inquiry')
}

// ── SEO ──
useSeo({
  title: 'Request Booking & Tailored Itinerary — Achari Tours',
  description: 'Book your bespoke Sri Lanka travel package or request a customized itinerary. 24-hour response with personal licensed guides and direct WhatsApp support.',
})

const { setBreadcrumbSchema } = useJsonLd()
setBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Tours', url: '/tours' },
  { name: 'Booking Inquiry', url: '/inquiry' },
])
</script>

<style scoped>
/* ═══ HERO ═══ */
.inquiry-hero {
  position: relative;
  padding: calc(var(--header-height) + var(--space-12)) 0 var(--space-12);
  min-height: 380px;
  display: flex;
  align-items: flex-end;
  color: white;
}

.inquiry-hero__bg {
  position: absolute;
  inset: 0;
}

.inquiry-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.inquiry-hero__content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--space-4);
}

.breadcrumb a {
  color: rgba(255, 255, 255, 0.7);
  transition: color var(--duration-fast);
}

.breadcrumb a:hover {
  color: white;
}

.inquiry-hero__title {
  color: white;
  margin: var(--space-2) 0 var(--space-3);
  font-size: var(--text-4xl);
}

.inquiry-hero__subtitle {
  color: rgba(255, 255, 255, 0.85);
  max-width: 680px;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.inquiry-hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-accent-light);
  font-weight: var(--font-medium);
}

/* ═══ MAIN LAYOUT ═══ */
.inquiry-body {
  background: var(--color-bg-primary);
  padding: var(--space-12) 0 var(--space-20);
}

.inquiry-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--space-10);
  align-items: start;
}

@media (max-width: 992px) {
  .inquiry-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══ MODE BAR ═══ */
.inquiry-mode-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: white;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-bg-tertiary);
  box-shadow: var(--shadow-xs);
  flex-wrap: wrap;
  gap: var(--space-2);
}

.inquiry-mode-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.inquiry-mode-pills {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.mode-pill {
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.mode-pill--active {
  background: var(--color-primary-50);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-200);
}

.mode-pill--btn {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px dashed var(--color-bg-tertiary);
  cursor: pointer;
  transition: all var(--duration-fast);
}

.mode-pill--btn:hover {
  background: var(--color-bg-secondary);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

/* ═══ STEPPER ═══ */
.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  background: white;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-bg-tertiary);
}

.stepper-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  position: relative;
  flex: 1;
}

.stepper-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: all var(--duration-fast);
  flex-shrink: 0;
}

.stepper-meta {
  display: flex;
  flex-direction: column;
}

.stepper-step {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-tertiary);
}

.stepper-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  white-space: nowrap;
}

.stepper-item--active .stepper-circle {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 0 0 4px var(--color-primary-100);
}

.stepper-item--active .stepper-title {
  color: var(--color-primary);
}

.stepper-item--complete .stepper-circle {
  background: var(--color-success);
  color: white;
}

.stepper-line {
  position: absolute;
  right: var(--space-4);
  top: 50%;
  width: 24px;
  height: 2px;
  background: var(--color-bg-tertiary);
}

@media (max-width: 640px) {
  .stepper-meta {
    display: none;
  }
  .stepper-line {
    display: none;
  }
}

/* ═══ STEP CARD ═══ */
.step-card {
  background: white;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-bg-tertiary);
}

.step-header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-bg-secondary);
}

.step-title {
  font-size: var(--text-2xl);
  color: var(--color-primary);
  margin-bottom: var(--space-1);
}

.step-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

/* Forms */
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.required {
  color: #c94a4a;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  transition: all var(--duration-fast);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  background: white;
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.form-hint {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-1);
}

.form-row--2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 600px) {
  .form-row--2 {
    grid-template-columns: 1fr;
  }
}

/* Counters */
.counter-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg-primary);
  border: 1.5px solid var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
}

.counter-label-group {
  display: flex;
  flex-direction: column;
}

.counter-title {
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
}

.counter-subtitle {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.counter-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-bg-tertiary);
  background: white;
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast);
}

.counter-btn:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.counter-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.counter-val {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  min-width: 24px;
  text-align: center;
}

/* Addons Grid */
.addons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

@media (max-width: 640px) {
  .addons-grid {
    grid-template-columns: 1fr;
  }
}

.addon-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1.5px solid var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  cursor: pointer;
  background: var(--color-bg-primary);
  transition: all var(--duration-fast);
  user-select: none;
}

.addon-card:hover {
  border-color: var(--color-accent);
  background: white;
}

.addon-card--checked {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.addon-checkbox {
  margin-top: 3px;
  accent-color: var(--color-primary);
}

.addon-content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.addon-icon {
  font-size: var(--text-2xl);
  line-height: 1;
}

.addon-info {
  display: flex;
  flex-direction: column;
}

.addon-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.addon-desc {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin-top: 2px;
}

/* Step Footer */
.step-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-bg-secondary);
}

.privacy-note {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  background: var(--color-bg-primary);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
}

.inquiry-error-banner {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: #fdf2f2;
  border: 1px solid #f8b4b4;
  color: #9b1c1c;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
  font-size: var(--text-sm);
}

/* ═══ SIDEBAR SUMMARY ═══ */
.inquiry-sidebar {
  position: sticky;
  top: calc(var(--header-height) + var(--space-6));
}

.summary-card {
  background: white;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-bg-tertiary);
}

.summary-card__heading {
  font-size: var(--text-lg);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-bg-secondary);
}

.summary-tour-preview {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.summary-tour-img {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  object-fit: cover;
  flex-shrink: 0;
}

.summary-tour-badge {
  display: inline-block;
  font-size: var(--text-xs);
  color: var(--color-primary);
  background: var(--color-primary-50);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
  font-weight: var(--font-semibold);
  margin-bottom: 2px;
}

.summary-tour-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.summary-tour-price {
  font-size: var(--text-xs);
  color: var(--color-accent-warm);
  font-weight: var(--font-bold);
}

.summary-divider {
  height: 1px;
  background: var(--color-bg-secondary);
  margin: var(--space-4) 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
}

.summary-label {
  color: var(--color-text-secondary);
}

.summary-val {
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.summary-addons {
  margin-top: var(--space-3);
}

.summary-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.summary-pill {
  font-size: 11px;
  background: var(--color-bg-secondary);
  color: var(--color-primary-dark);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.summary-guarantee {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px dashed var(--color-bg-tertiary);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.guarantee-item svg {
  color: var(--color-success);
  flex-shrink: 0;
}

/* ═══ SUCCESS STATE CARD ═══ */
.success-card {
  background: white;
  max-width: 680px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-bg-tertiary);
  text-align: center;
}

.success-card__icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary-50);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  border: 2px solid var(--color-primary-200);
}

.success-card__title {
  font-size: var(--text-3xl);
  color: var(--color-primary);
  margin: var(--space-2) 0 var(--space-2);
}

.success-card__subtitle {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  margin-bottom: var(--space-6);
}

.reference-box {
  background: var(--color-bg-primary);
  border: 1.5px dashed var(--color-accent);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-6);
}

.reference-box__label {
  display: block;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-1);
}

.reference-box__code-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.reference-box__code {
  font-family: monospace;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  letter-spacing: 0.05em;
}

.reference-box__note {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
}

.success-recap {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-8);
  text-align: left;
}

.recap-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
}

.recap-item:last-child {
  margin-bottom: 0;
}

.recap-label {
  color: var(--color-text-secondary);
}

.recap-val {
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.next-steps-timeline {
  text-align: left;
  margin-bottom: var(--space-8);
}

.next-steps-timeline__title {
  font-size: var(--text-base);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.timeline-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.timeline-text strong {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
}

.timeline-text p {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin: 0;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
}
</style>
