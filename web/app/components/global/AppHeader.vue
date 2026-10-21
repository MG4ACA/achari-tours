<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled, 'header--open': isMobileMenuOpen }">
    <div class="container header__container">
      <nav class="header__glass-bar">
        <!-- Logo -->
        <NuxtLink to="/" class="header__logo" aria-label="Achari Tours Home">
          <img
            src="/images/logo/achari-tours-logo.png"
            alt="Achari Tours"
            class="header__logo-img"
            width="42"
            height="42"
          />
          <span class="header__logo-text">
            <span class="header__logo-name">Achari</span>
            <span class="header__logo-tagline">Tours</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <ul class="header__links hide-mobile">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="header__link"
              :class="{ 'header__link--active': isActive(link.to) }"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Desktop Actions -->
        <div class="header__actions hide-mobile">
          <button class="btn btn--primary btn--sm header__cta" @click="openQuickInquiry">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Send an Inquiry
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="header__hamburger hide-desktop"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
        >
          <span class="header__hamburger-line" />
          <span class="header__hamburger-line" />
          <span class="header__hamburger-line" />
        </button>
      </nav>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" id="mobile-menu" class="header__mobile-menu hide-desktop">
        <div class="header__mobile-menu-inner">
          <ul class="header__mobile-links">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="header__mobile-link"
                :class="{ 'header__mobile-link--active': isActive(link.to) }"
                @click="closeMobileMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>

          <div class="header__mobile-actions">
            <button
              class="btn btn--primary btn--full btn--lg"
              @click="handleMobileInquiry"
            >
              Send an Inquiry
            </button>
            <NuxtLink
              to="/inquiry"
              class="btn btn--ghost btn--full"
              @click="closeMobileMenu"
            >
              Custom Itinerary Builder
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isQuickInquiryOpen = useState<boolean>('quickInquiryOpen', () => false)

const navLinks = [
  { label: 'Tours', to: '/tours' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}

function openQuickInquiry() {
  isQuickInquiryOpen.value = true
}

function handleMobileInquiry() {
  closeMobileMenu()
  openQuickInquiry()
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

onMounted(() => {
  isScrolled.value = window.scrollY > 15
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 15
  }, { passive: true })
})
</script>

<style scoped>
/* ═══ FLOATING HEADER CONTAINER ═══ */
.header {
  position: fixed;
  top: var(--space-4);
  left: 0;
  right: 0;
  z-index: var(--z-header);
  pointer-events: none;
  transition: all var(--duration-normal) var(--ease-out);
}

.header__container {
  pointer-events: auto;
}

/* ═══ GLASSMORHIC PILL BAR ═══ */
.header__glass-bar {
  background: rgba(18, 26, 18, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.35);
  border-radius: var(--radius-full);
  padding: 8px 14px 8px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all var(--duration-normal) var(--ease-out);
}

/* When scrolled down */
.header--scrolled {
  top: var(--space-2);
}

.header--scrolled .header__glass-bar {
  background: rgba(14, 22, 14, 0.88);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.5);
}

/* ── Logo ───────────────────────────────────────────────── */
.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  z-index: 10;
}

.header__logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: transform var(--duration-fast);
}

.header__logo:hover .header__logo-img {
  transform: scale(1.06);
}

.header__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.header__logo-name {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: var(--tracking-tight);
}

.header__logo-tagline {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  color: var(--color-accent-light);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

/* ── Desktop Links ──────────────────────────────────────── */
.header__links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.header__link {
  padding: 6px 14px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
  text-decoration: none;
}

.header__link:hover {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.12);
}

.header__link--active {
  color: #FFFFFF;
  background-color: rgba(82, 183, 136, 0.28);
  font-weight: 600;
}

/* ── CTA Button ─────────────────────────────────────────── */
.header__cta {
  padding: 8px 18px;
  font-size: var(--text-xs);
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.03em;
}

/* ── Hamburger ──────────────────────────────────────────── */
.header__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.header__hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #FFFFFF;
  border-radius: 1px;
  transition: all var(--duration-normal) var(--ease-out);
}

.header--open .header__hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header--open .header__hamburger-line:nth-child(2) {
  opacity: 0;
}

.header--open .header__hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile Menu ────────────────────────────────────────── */
.header__mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(14, 22, 14, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.header__mobile-menu-inner {
  width: 100%;
  max-width: 380px;
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  text-align: center;
}

.header__mobile-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.header__mobile-link {
  display: block;
  padding: var(--space-3);
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast);
  text-decoration: none;
}

.header__mobile-link:hover,
.header__mobile-link--active {
  color: var(--color-accent-light);
  background: rgba(255, 255, 255, 0.08);
}

.header__mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .header {
    top: var(--space-2);
  }
  .header__glass-bar {
    padding: 6px 12px;
  }
}
</style>
