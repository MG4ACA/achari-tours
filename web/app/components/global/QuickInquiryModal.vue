<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click.self="closeModal"
        aria-modal="true"
        role="dialog"
      >
        <div class="modal-card">
          <!-- Close Button -->
          <button
            class="modal-close"
            aria-label="Close modal"
            @click="closeModal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <!-- ══ SUCCESS STATE ══ -->
          <div v-if="isSubmitted" class="modal-success">
            <div class="success-icon-wrap">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <span class="label label--accent">CONFIRMED</span>
            <h3 class="modal-title">Inquiry Received!</h3>
            <p class="modal-desc">
              Thank you, <strong>{{ form.name }}</strong>. Our Sri Lanka travel team will review your request and get back to you within 24 hours.
            </p>

            <div class="ref-badge">
              <span class="ref-badge__label">Reference Code</span>
              <span class="ref-badge__code">{{ referenceCode }}</span>
            </div>

            <div class="modal-actions">
              <a
                :href="`https://wa.me/94771234567?text=${encodeURIComponent(`Hi Achari Tours, I just submitted inquiry ${referenceCode}. Looking forward to connecting!`)}`"
                target="_blank"
                class="btn btn--secondary btn--full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.528 5.855L0 24l6.355-1.512A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22c-1.895 0-3.669-.525-5.189-1.434l-.371-.22-3.872.921.944-3.773-.24-.389A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Chat on WhatsApp Now
              </a>
              <button class="btn btn--ghost btn--full" @click="closeModal">
                Done
              </button>
            </div>
          </div>

          <!-- ══ FORM STATE ══ -->
          <div v-else>
            <div class="modal-header">
              <span class="label label--accent">DIRECT INQUIRY</span>
              <h3 class="modal-title">Send Us an Inquiry</h3>
              <p class="modal-desc">
                No complex forms needed — tell us what you're dreaming of, and our local team will take care of the rest.
              </p>
            </div>

            <!-- Error banner -->
            <div v-if="error" class="modal-error">
              {{ error }}
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="form-row form-row--2">
                <div class="form-group">
                  <label class="form-label" for="quick-name">Your Name *</label>
                  <input
                    id="quick-name"
                    v-model="form.name"
                    type="text"
                    class="form-input"
                    placeholder="e.g. Erik Lindqvist"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="quick-email">Email Address *</label>
                  <input
                    id="quick-email"
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    placeholder="erik@example.com"
                    required
                  />
                </div>
              </div>

              <div class="form-row form-row--2">
                <div class="form-group">
                  <label class="form-label" for="quick-phone">WhatsApp / Phone</label>
                  <input
                    id="quick-phone"
                    v-model="form.phone"
                    type="tel"
                    class="form-input"
                    placeholder="+46 70 123 4567"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="quick-dates">Approx. Travel Dates</label>
                  <input
                    id="quick-dates"
                    v-model="form.dates"
                    type="text"
                    class="form-input"
                    placeholder="e.g. Nov 2026 (approx 10 days)"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="quick-tour">Interested Tour / Experience</label>
                <select id="quick-tour" v-model="form.tourId" class="form-select">
                  <option value="general">General / Custom Sri Lanka Journey</option>
                  <option value="essential-sri-lanka-5-days">The Essential Sri Lanka (5 Days)</option>
                  <option value="heritage-wildlife-discovery-7-days">Heritage & Wildlife Discovery (7 Days)</option>
                  <option value="complete-island-experience-10-days">The Complete Island Experience (10 Days)</option>
                  <option value="grand-sri-lanka-journey-14-days">The Grand Sri Lanka Journey (14 Days)</option>
                  <option value="surf-soul-retreat-7-days">Surf & Soul Retreat (7 Days)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="quick-message">Message or Requirements</label>
                <textarea
                  id="quick-message"
                  v-model="form.message"
                  rows="3"
                  class="form-textarea"
                  placeholder="Tell us what you'd love to see: tea plantations, leopard safari, quiet beaches, private driver..."
                />
              </div>

              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn--primary btn--full btn--lg"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Sending Inquiry...</span>
                  <span v-else>
                    Send Inquiry Now
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </button>

                <div class="modal-switch">
                  <span>Want to pick exact hotels, guests & add-ons?</span>
                  <NuxtLink to="/inquiry" class="modal-switch-link" @click="closeModal">
                    Use Full Itinerary Builder →
                  </NuxtLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isOpen = useState<boolean>('quickInquiryOpen', () => false)
const selectedTour = useState<string>('quickInquiryTour', () => 'general')

const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseUrl as string

const form = reactive({
  name: '',
  email: '',
  phone: '',
  dates: '',
  tourId: 'general',
  message: '',
})

watch(selectedTour, (val) => {
  if (val) form.tourId = val
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const error = ref<string | null>(null)
const referenceCode = ref<string>('')

function closeModal() {
  isOpen.value = false
  if (isSubmitted.value) {
    // Reset after closing on success
    setTimeout(() => {
      isSubmitted.value = false
      form.name = ''
      form.email = ''
      form.phone = ''
      form.dates = ''
      form.message = ''
      referenceCode.value = ''
      error.value = null
    }, 300)
  }
}

async function handleSubmit() {
  if (!form.name.trim() || !form.email.trim()) {
    error.value = 'Please enter your name and email.'
    return
  }

  isSubmitting.value = true
  error.value = null

  // Split name
  const nameParts = form.name.trim().split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ') || nameParts[0]

  try {
    const res = await $fetch<{ referenceCode: string; message: string }>(`${apiBaseUrl}/inquiries`, {
      method: 'POST',
      body: {
        tourId: form.tourId,
        tourTitle: form.tourId === 'general' ? 'General Travel Inquiry' : form.tourId,
        preferredStartDate: null,
        preferredEndDate: null,
        adultCount: 2,
        childCount: 0,
        selectedAddons: [],
        specialRequests: `Dates: ${form.dates || 'Flexible'}\n\nMessage: ${form.message}`,
        firstName,
        lastName,
        email: form.email,
        phone: form.phone || '',
        country: 'International',
        utmSource: 'quick_inquiry_modal',
        utmMedium: 'website_header',
        referrerUrl: typeof document !== 'undefined' ? document.referrer : '',
      },
    })

    referenceCode.value = res.referenceCode
    isSubmitted.value = true
  } catch (err: any) {
    error.value = err?.data?.message || 'Could not send inquiry. Please try again or reach us on WhatsApp.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(14, 20, 14, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.modal-card {
  position: relative;
  background: white;
  width: 100%;
  max-width: 580px;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-bg-tertiary);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--color-bg-tertiary);
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast);
}

.modal-close:hover {
  background: var(--color-primary-50);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.modal-header {
  margin-bottom: var(--space-6);
  padding-right: var(--space-8);
}

.modal-title {
  font-size: var(--text-2xl);
  color: var(--color-primary);
  margin: var(--space-2) 0 var(--space-1);
}

.modal-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}

.modal-error {
  background: #fef2f2;
  border: 1px solid #f87171;
  color: #991b1b;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
}

.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-family: inherit;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
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

.form-row--2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

@media (max-width: 520px) {
  .form-row--2 {
    grid-template-columns: 1fr;
  }
}

.modal-footer {
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.modal-switch {
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.modal-switch-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Success State */
.modal-success {
  text-align: center;
  padding: var(--space-6) var(--space-2);
}

.success-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--color-primary-50);
  color: var(--color-primary);
  border: 2px solid var(--color-primary-200);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
}

.ref-badge {
  background: var(--color-bg-primary);
  border: 1.5px dashed var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  margin: var(--space-5) 0 var(--space-6);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.ref-badge__label {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-tertiary);
}

.ref-badge__code {
  font-family: monospace;
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary);
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
