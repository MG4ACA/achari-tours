<template>
  <footer class="footer">
    <!-- Top wave separator -->
    <div class="footer__wave">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="var(--color-bg-dark)" />
      </svg>
    </div>

    <div class="footer__inner">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand Column -->
          <div class="footer__brand">
            <NuxtLink to="/" class="footer__logo" aria-label="Achari Tours Home">
              <img
                src="/images/logo/achari-tours-logo-light.png"
                alt="Achari Tours"
                class="footer__logo-img"
                width="56"
                height="56"
              />
              <div>
                <div class="footer__logo-name">Achari Tours</div>
                <div class="footer__logo-tagline">Refined Sri Lanka Experiences</div>
              </div>
            </NuxtLink>
            <p class="footer__description">
              Discover Sri Lanka through curated cultural heritage, wildlife safari, and coastal
              experiences. Travel refined, travel respectfully.
            </p>
            <!-- Social Links -->
            <div class="footer__social">
              <a href="#" class="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer__column">
            <h4 class="footer__column-title">Explore</h4>
            <ul class="footer__column-links">
              <li><NuxtLink to="/tours">Tour Packages</NuxtLink></li>
              <li><NuxtLink to="/destinations">Destinations</NuxtLink></li>
              <li><NuxtLink to="/blog">Travel Blog</NuxtLink></li>
              <li><NuxtLink to="/about">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact">Contact</NuxtLink></li>
            </ul>
          </div>

          <!-- Experiences -->
          <div class="footer__column">
            <h4 class="footer__column-title">Experiences</h4>
            <ul class="footer__column-links">
              <li><NuxtLink to="/tours?category=cultural">Cultural Heritage</NuxtLink></li>
              <li><NuxtLink to="/tours?category=wildlife">Wildlife Safari</NuxtLink></li>
              <li><NuxtLink to="/tours?category=coastal">Coastal & Surfing</NuxtLink></li>
              <li><NuxtLink to="/blog?category=planning">Planning Guides</NuxtLink></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="footer__column footer__column--newsletter">
            <h4 class="footer__column-title">Travel Insider</h4>
            <p class="footer__newsletter-text">
              Get curated Sri Lanka travel tips, seasonal guides, and exclusive offers.
            </p>
            <form class="footer__newsletter-form" @submit.prevent="subscribeNewsletter">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="Your email"
                class="footer__newsletter-input"
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" class="btn btn--primary btn--sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {{ new Date().getFullYear() }} Achari Tours. All rights reserved.
          </p>
          <div class="footer__bottom-links">
            <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
            <span class="footer__bottom-divider">·</span>
            <NuxtLink to="/terms">Terms of Service</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const newsletterEmail = ref('')

async function subscribeNewsletter() {
  // Will be connected to .NET API
  console.log('Newsletter subscribe:', newsletterEmail.value)
  newsletterEmail.value = ''
}
</script>

<style scoped>
.footer {
  position: relative;
  margin-top: auto;
}

.footer__wave {
  position: relative;
  margin-bottom: -2px;
}

.footer__wave svg {
  display: block;
  width: 100%;
  height: 60px;
}

.footer__inner {
  background-color: var(--color-bg-dark);
  color: var(--color-text-inverse);
  padding: var(--space-16) 0 var(--space-8);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: var(--space-12);
}

@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 640px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

/* ── Brand ──────────────────────────────────────────────── */

.footer__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.footer__logo-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.footer__logo-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
}

.footer__logo-tagline {
  font-size: var(--text-xs);
  color: var(--color-text-inverse-secondary);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

.footer__description {
  font-size: var(--text-sm);
  color: var(--color-text-inverse-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
  max-width: 300px;
}

.footer__social {
  display: flex;
  gap: var(--space-3);
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-bg-dark-secondary);
  color: var(--color-text-inverse-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}

.footer__social-link:hover {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  transform: translateY(-2px);
}

/* ── Columns ────────────────────────────────────────────── */

.footer__column-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 600;
  color: white;
  margin-bottom: var(--space-5);
  letter-spacing: var(--tracking-wide);
}

.footer__column-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__column-links a {
  font-size: var(--text-sm);
  color: var(--color-text-inverse-secondary);
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__column-links a:hover {
  color: var(--color-accent-light);
}

/* ── Newsletter ─────────────────────────────────────────── */

.footer__newsletter-text {
  font-size: var(--text-sm);
  color: var(--color-text-inverse-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.footer__newsletter-form {
  display: flex;
  gap: var(--space-2);
}

.footer__newsletter-input {
  flex: 1;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  background-color: var(--color-bg-dark-secondary);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  color: white;
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.footer__newsletter-input:focus {
  border-color: var(--color-accent);
}

.footer__newsletter-input::placeholder {
  color: var(--color-text-inverse-secondary);
}

/* ── Bottom ─────────────────────────────────────────────── */

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-8);
  margin-top: var(--space-12);
  border-top: 1px solid var(--color-border-dark);
}

.footer__copyright {
  font-size: var(--text-sm);
  color: var(--color-text-inverse-secondary);
}

.footer__bottom-links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.footer__bottom-links a {
  color: var(--color-text-inverse-secondary);
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__bottom-links a:hover {
  color: var(--color-accent-light);
}

.footer__bottom-divider {
  color: var(--color-border-dark);
}

@media (max-width: 640px) {
  .footer__bottom {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }

  .footer__newsletter-form {
    flex-direction: column;
  }
}
</style>
