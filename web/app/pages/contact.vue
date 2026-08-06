<template>
  <div class="contact-page">
    <!-- Page Hero -->
    <section class="page-hero page-hero--compact">
      <div class="page-hero__bg">
        <img
          src="/images/hero/contact-hero.jpg"
          alt="Sri Lanka coastline at sunset"
          class="page-hero__bg-image"
          fetchpriority="high"
        />
        <div class="overlay" />
      </div>
      <div class="container page-hero__content">
        <span class="label label--accent">GET IN TOUCH</span>
        <h1>Contact Us</h1>
        <p class="text-lead" style="color: rgba(255,255,255,0.85)">
          Ready to plan your Sri Lanka journey? We'd love to hear from you.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <!-- Contact Form -->
          <div class="contact-form-wrapper reveal">
            <h2>Send Us a Message</h2>
            <p class="text-muted mb-8">
              Tell us about your travel dreams, ask a question, or just say hello.
              We typically respond within 24 hours.
            </p>

            <form v-if="!isSubmitted" class="contact-form" @submit.prevent="submitForm">
              <div class="contact-form__row">
                <div class="form-group">
                  <label for="name" class="form-label">Full Name *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">Subject</label>
                <select id="subject" v-model="form.subject" class="form-input form-select">
                  <option value="">Select a topic</option>
                  <option value="Tour Inquiry">Tour Inquiry</option>
                  <option value="Custom Itinerary">Custom Itinerary</option>
                  <option value="Group Booking">Group Booking</option>
                  <option value="General Question">General Question</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-input form-textarea"
                  placeholder="Tell us about your travel plans..."
                  rows="5"
                  required
                />
              </div>

              <p v-if="error" class="form-error mb-4">{{ error }}</p>

              <button type="submit" class="btn btn--primary btn--lg" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>

            <!-- Success State -->
            <div v-else class="contact-success">
              <div class="contact-success__icon">✉️</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button class="btn btn--secondary mt-6" @click="resetForm">Send Another Message</button>
            </div>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="contact-info reveal reveal--right">
            <div class="contact-info__card">
              <h3>Other Ways to Reach Us</h3>

              <div class="contact-info__item">
                <div class="contact-info__icon">📧</div>
                <div>
                  <span class="contact-info__label">Email</span>
                  <a href="mailto:hello@acharitours.com" class="contact-info__value">hello@acharitours.com</a>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">💬</div>
                <div>
                  <span class="contact-info__label">WhatsApp</span>
                  <a href="https://wa.me/94771234567" class="contact-info__value" target="_blank" rel="noopener">+94 77 123 4567</a>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">📍</div>
                <div>
                  <span class="contact-info__label">Based in</span>
                  <span class="contact-info__value">Sri Lanka</span>
                </div>
              </div>

              <div class="contact-info__item">
                <div class="contact-info__icon">⏰</div>
                <div>
                  <span class="contact-info__label">Response Time</span>
                  <span class="contact-info__value">Within 24 hours</span>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="contact-info__social">
              <h4>Follow Our Journey</h4>
              <div class="contact-info__social-links">
                <a href="#" class="contact-info__social-link" aria-label="Instagram">Instagram</a>
                <a href="#" class="contact-info__social-link" aria-label="Pinterest">Pinterest</a>
                <a href="#" class="contact-info__social-link" aria-label="Facebook">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Contact Us — Achari Tours',
  description: 'Get in touch with Achari Tours to plan your Sri Lanka travel experience. Email us, WhatsApp, or fill out our contact form. We respond within 24 hours.',
})

const { setBreadcrumbSchema } = useJsonLd()
setBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
])

const { observeAll } = useScrollReveal()
onMounted(() => { observeAll() })

const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl as string

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

async function submitForm() {
  isSubmitting.value = true
  error.value = null

  try {
    await $fetch(`${apiBaseUrl}/contact`, {
      method: 'POST',
      body: form,
    })
    isSubmitted.value = true
  } catch (err: any) {
    error.value = err?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  isSubmitted.value = false
  error.value = null
}
</script>

<style scoped>
.page-hero {
  position: relative;
  padding: calc(var(--header-height) + var(--space-20)) 0 var(--space-20);
  min-height: 350px;
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

/* ── Layout ─────────────────────────────────────────────── */
.contact-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

@media (max-width: 1024px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

/* ── Form ───────────────────────────────────────────────── */
.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

@media (max-width: 640px) {
  .contact-form__row {
    grid-template-columns: 1fr;
  }
}

/* ── Success ────────────────────────────────────────────── */
.contact-success {
  text-align: center;
  padding: var(--space-12) 0;
}

.contact-success__icon {
  font-size: var(--text-5xl);
  margin-bottom: var(--space-4);
}

.contact-success h3 {
  margin-bottom: var(--space-3);
}

.contact-success p {
  color: var(--color-text-secondary);
}

/* ── Info Sidebar ───────────────────────────────────────── */
.contact-info__card {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-8);
}

.contact-info__card h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  margin-bottom: var(--space-6);
}

.contact-info__item {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.contact-info__item:last-child {
  border-bottom: none;
}

.contact-info__icon {
  font-size: var(--text-xl);
  flex-shrink: 0;
}

.contact-info__label {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin-bottom: var(--space-1);
}

.contact-info__value {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
}

a.contact-info__value:hover {
  color: var(--color-primary);
}

/* ── Social ─────────────────────────────────────────────── */
.contact-info__social h4 {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  margin-bottom: var(--space-4);
}

.contact-info__social-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contact-info__social-link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary);
  transition: color var(--duration-fast) var(--ease-out);
}

.contact-info__social-link:hover {
  color: var(--color-accent);
}
</style>
