<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled, 'header--open': isMobileMenuOpen }">
    <div class="container">
      <nav class="header__nav">
        <!-- Logo -->
        <NuxtLink to="/" class="header__logo" aria-label="Achari Tours Home">
          <img
            src="/images/logo/achari-tours-logo.png"
            alt="Achari Tours"
            class="header__logo-img"
            width="48"
            height="48"
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

        <!-- Desktop CTA -->
        <div class="header__actions hide-mobile">
          <NuxtLink to="/tours" class="btn btn--primary btn--sm">
            Explore Tours
          </NuxtLink>
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

    <!-- Mobile Menu -->
    <Transition name="slide-up">
      <div v-if="isMobileMenuOpen" id="mobile-menu" class="header__mobile-menu hide-desktop">
        <ul class="header__mobile-links">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="header__mobile-link"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink to="/tours" class="btn btn--primary w-full" @click="closeMobileMenu">
          Explore Tours
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

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

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  background-color: transparent;
  transition: all var(--duration-normal) var(--ease-out);
  height: var(--header-height);
}

.header--scrolled {
  background-color: rgba(250, 250, 247, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
  height: var(--header-height-scrolled);
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
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
  width: 48px;
  height: 48px;
  object-fit: contain;
  transition: all var(--duration-normal) var(--ease-out);
}

.header--scrolled .header__logo-img {
  width: 40px;
  height: 40px;
}

.header__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.header__logo-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: var(--tracking-tight);
}

.header__logo-tagline {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

/* Header text colors when not scrolled (on hero) */
.header:not(.header--scrolled) .header__logo-name {
  color: white;
}

.header:not(.header--scrolled) .header__logo-tagline {
  color: rgba(255, 255, 255, 0.8);
}

/* ── Desktop Links ──────────────────────────────────────── */

.header__links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.header__link {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
}

.header__link:hover,
.header__link--active {
  color: var(--color-primary);
  background-color: var(--color-primary-50);
}

/* Header link colors when not scrolled (on hero) */
.header:not(.header--scrolled) .header__link {
  color: rgba(255, 255, 255, 0.85);
}

.header:not(.header--scrolled) .header__link:hover,
.header:not(.header--scrolled) .header__link--active {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

/* ── Hamburger ──────────────────────────────────────────── */

.header__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 10px;
  z-index: 10;
}

.header__hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary-dark);
  border-radius: 1px;
  transition: all var(--duration-normal) var(--ease-out);
}

.header:not(.header--scrolled) .header__hamburger-line {
  background-color: white;
}

.header--open .header__hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  background-color: var(--color-primary-dark);
}

.header--open .header__hamburger-line:nth-child(2) {
  opacity: 0;
}

.header--open .header__hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  background-color: var(--color-primary-dark);
}

/* ── Mobile Menu ────────────────────────────────────────── */

.header__mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg-primary);
  padding: calc(var(--header-height) + var(--space-8)) var(--space-6) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  z-index: 5;
}

.header__mobile-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.header__mobile-link {
  display: block;
  padding: var(--space-4) var(--space-4);
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
  border-radius: var(--radius-lg);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.header__mobile-link:hover {
  background-color: var(--color-bg-secondary);
}
</style>
