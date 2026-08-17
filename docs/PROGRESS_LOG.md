# Achari Tours — Progress Log

> Chronological record of what was built, decisions made, and issues resolved.

---

## Session 1 — August 6–7, 2026

### Planning Phase

**Business requirements gathered:**
- Target market: Sweden, Norway, UK, Germany (European/Scandinavian)
- Three experience pillars: Cultural Heritage · Wildlife Safari · Coastal & Surfing
- 5 tour packages ranging from 5 to 14 days
- Semi-structured booking: traveler selects tour → submits inquiry → team manually confirms
- Pricing features planned: seasonal pricing, group discounts, early-bird rates
- 2 local expert guides currently
- US LLC planned for Stripe payment integration
- Design mood: "Cinematic Minimalism" — National Geographic meets Scandinavian clean design
- Typography: clean sans-serif (Outfit headings + Inter body)
- Design approach: international minimal layout + Sri Lankan revealed through photography + subtle cultural motifs

**Key decisions:**
- Nuxt 3 for frontend (SSR/SSG/ISR hybrid rendering for SEO)
- .NET 9 for backend API (business logic, booking management)
- Directus 11 as headless CMS (content management, non-technical admin)
- PostgreSQL shared by both API and Directus
- Docker Compose for local dev + Hostinger KVM 1 for production
- Domain: `acharitours.lumicore-labs.com` (subdomain currently)

---

### Phase 1A — Foundation Build

#### Environment Setup
- **Issue:** PowerShell execution policy blocked `npm` and `npx` commands
- **Fix:** `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force`
- **Environment:** Node v24.13.1, npm 11.8.0, .NET 9.0.316

#### Nuxt 3 Setup
- Initialized Nuxt 3 project in `/web`
- Configured `nuxt.config.ts` with:
  - Hybrid rendering (SSG for home/tours/about, ISR for content pages, SSR for forms)
  - Modules: `@nuxt/image`, `@nuxt/fonts`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`
  - Runtime config for API base URL and Directus URL
  - SEO defaults (og:image, twitter:card, site name)
- **Issue:** `npm install` failed — modules not installed as separate packages from initial Nuxt scaffold
- **Fix:** `npm install @nuxt/image @nuxt/fonts @nuxtjs/sitemap @nuxtjs/robots nuxt-schema-org` — **Success** ✅

#### Design System CSS (6 files)
Implemented complete design token system:
- `variables.css` — Full brand palette (moss green + saffron gold), semantic color tokens, spacing scale (4px base), type scale, shadow system, transition/easing tokens
- `typography.css` — Outfit (headings) + Inter (body) with responsive clamp() sizing
- `reset.css` — Modern reset with smooth scrolling, font smoothing, reduced motion support
- `main.css` — Global components: `.container`, `.section`, `.btn` (4 variants), `.card`, `.badge`, `.form-*`, `.grid`, `.overlay`, `.label`
- `animations.css` — Scroll reveal system (`.reveal` → `.reveal--visible` via IntersectionObserver), keyframe animations (float, shimmer, pulse), page transitions
- `utilities.css` — Flex/grid helpers, spacing utilities, visibility toggles

#### Composables (5 files)
- `useDirectus.ts` — Full typed data layer: `Tour`, `TourDay`, `BlogArticle`, `Author`, `Destination`, `Testimonial`, `SiteSettings` interfaces + CRUD helpers
- `useSeo.ts` — Wraps `useSeoMeta()` and `useHead()` for consistent meta generation across all pages
- `useJsonLd.ts` — Schema.org generators for all travel-specific types
- `useScrollReveal.ts` — `IntersectionObserver` with `observeAll()`, `observe()`, auto-cleanup on unmount
- `useBookingInquiry.ts` — 3-step form with validation, UTM parameter capture from route query string, `$fetch` to API

#### Layout & Global Components
- `app.vue` — Entry with `NuxtRouteAnnouncer` for accessibility
- `layouts/default.vue` — Flex column layout with `padding-top: var(--header-height)` to clear fixed header
- `AppHeader.vue` — Key feature: transparent on hero → opaque + backdrop-blur on scroll. Uses `window.scrollY > 20` threshold. Text colors flip between white (on hero) and brand colors (scrolled) via `:not(.header--scrolled)` CSS selector
- `AppFooter.vue` — SVG wave separator between page content and dark footer

#### Pages
- `index.vue` — Cinematic hero (100vh with fixed background image), 3 pillar cards with hover zoom effect, featured tours grid, "Why Achari" split layout (text + overlapping images), full-bleed CTA with background image
- `tours/index.vue` — Filter tabs using `computed` property to filter `allTours` array; reads `route.query.category` on mount for deep-linked filtered views
- `about.vue` — Guide profiles section intentionally limited to 2 (per user: "we only have 2 guides right now")
- `contact.vue` — Multi-column layout (1.5fr + 1fr); form calls `.NET API /api/contact`

#### .NET API
- **Issue:** `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL` pulled v10.x (net10.0 only)
- **Fix:** Pinned to `--version 9.0.4`
- **Issue:** `Microsoft.AspNetCore.Authentication.JwtBearer` pulled v10.x
- **Fix:** Pinned to `--version 9.0.7`
- **Issue:** `Microsoft.EntityFrameworkCore.Design` initially failed with incompatible version
- **Fix:** `--version 9.0.7`
- **Build result: SUCCEEDED ✅** — 0 errors, 0 warnings, `bin/Debug/net9.0/AchariTours.Api.dll`

#### Infrastructure
- `docker-compose.yml` — PostgreSQL 16 with `pg_isready` health check; Directus 11 with `depends_on: postgres condition: service_healthy`
- Note: Nuxt and .NET API run directly (`npm run dev`, `dotnet run`) during development for hot-reload; Docker services are commented in for production deployment pattern

#### Version Control
- `git init`, `git add .`, `git commit -m 'initial-commit'`
- **Issue:** Build artifacts committed (`bin/`, `obj/`)
- **Fix:** Created root `.gitignore` to exclude these directories going forward

---

## Files Created — Phase 1A Summary

### `/web/` (Nuxt 3 Frontend)
```
app/
├── app.vue
├── layouts/default.vue
├── components/global/
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── composables/
│   ├── useDirectus.ts
│   ├── useSeo.ts
│   ├── useJsonLd.ts
│   ├── useScrollReveal.ts
│   └── useBookingInquiry.ts
└── pages/
    ├── index.vue
    ├── about.vue
    ├── contact.vue
    └── tours/index.vue
assets/css/
    ├── reset.css
    ├── variables.css
    ├── typography.css
    ├── main.css
    ├── animations.css
    └── utilities.css
nuxt.config.ts
```

### `/api/` (.NET 9 API)
```
Controllers/
├── InquiriesController.cs    (POST /api/inquiries)
├── ContactController.cs      (POST /api/contact)
└── NewsletterController.cs   (POST /api/newsletter/subscribe)
Data/
└── AppDbContext.cs
Models/
├── Entities/
│   ├── BookingInquiry.cs
│   ├── InquiryStatusHistory.cs
│   ├── ContactSubmission.cs
│   ├── NewsletterSubscriber.cs
│   └── AdminNotification.cs
├── DTOs/PublicDTOs.cs
└── Enums/InquiryStatus.cs
Program.cs
appsettings.json
```

### Root
```
docker-compose.yml
.gitignore
docs/PROJECT_PLAN.md
docs/TASK_TRACKER.md
docs/PROGRESS_LOG.md (this file)
```

---

## Next Session — Phase 1B

**Priority order:**
1. Tour detail page (`/tours/[slug].vue`) — most important for booking conversions
2. Booking inquiry form page (`/inquiry/[tourSlug].vue`)
3. Blog listing + detail pages (SEO value)
4. Destination pages
5. 404 page

**Before starting next session:**
- Run `docker compose up -d` to start PostgreSQL and Directus
- Run `dotnet ef migrations add InitialCreate` for DB setup
- Run `npm run dev` to verify Nuxt renders correctly
