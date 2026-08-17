# Achari Tours — Full Project Plan

> **Version:** 1.0 — August 2026  
> **Status:** Active Development · Phase 1A Complete

---

## 1. Business Overview

### 1.1 Company
| Field | Details |
|-------|---------|
| **Name** | Achari Tours |
| **Meaning** | "Achari" (ආචාරී) — refined, respectful, ethical conduct in Sinhala |
| **Founded** | 2026 |
| **HQ** | Sri Lanka |
| **Team** | 2 expert local guides (expanding) |

### 1.2 Mission
To offer high-end, ethical, and deeply personal Sri Lanka travel experiences that honor the land, its culture, and its people — while delivering world-class hospitality to the discerning European traveler.

### 1.3 Target Markets
- 🇸🇪 Sweden · 🇳🇴 Norway · 🇬🇧 United Kingdom · 🇩🇪 Germany · 🇩🇰 Denmark · 🇫🇮 Finland
- **Persona:** Affluent, eco-conscious travelers aged 30–60. Values authenticity, sustainability, and unique off-the-beaten-path experiences.

### 1.4 Three Pillars of Experience
| Pillar | Description | Key Destinations |
|--------|-------------|-----------------|
| 🏛️ **Cultural Heritage** | Ancient kingdoms, living temples, artisan crafts | Sigiriya, Kandy, Polonnaruwa, Anuradhapura, Galle |
| 🐘 **Wildlife Safari** | Ethical encounters with tuskers, leopards, whales | Yala, Udawalawe, Minneriya, Mirissa (whale watching) |
| 🏄 **Coastal & Surfing** | World-class waves, coral reefs, natural beaches | Arugam Bay, Mirissa, Unawatuna, Tangalle, Pasikuda |

---

## 2. Brand Identity

### 2.1 Visual Identity
| Element | Decision |
|---------|---------|
| **Primary Color** | Deep Moss Green `#2D5016` — earthy, lush, premium |
| **Accent Color** | Saffron Gold `#C8922A` — warmth, temple offerings, sunrise |
| **Background** | Warm Off-White `#FAFAF7` — clean, editorial |
| **Dark** | Rich Forest `#1A2E0A` — footer, dark sections |
| **Heading Font** | Outfit (Google Fonts) — modern, geometric, Scandinavian-friendly |
| **Body Font** | Inter — clean, highly legible at small sizes |
| **Design Mood** | **"Cinematic Minimalism"** — National Geographic storytelling meets Scandinavian clean design |

### 2.2 Logo
- Minimalist "S-curve" journey path integrating: a surfer → a tusker elephant → Sigiriya rock fortress
- Current logo: `logo/achari_tours.png`
- **TODO:** Create variants — horizontal lockup, favicon, light (white) version for dark backgrounds

### 2.3 Design Principles
1. **International with Sri Lankan Soul** — Clean, Scandinavian-inspired layouts revealed through Sri Lankan photography and subtle cultural motifs
2. **Photography-first** — Large, cinematic hero images drive emotion
3. **Ethical transparency** — Values prominently featured, not hidden in "About" pages
4. **Mobile-first** — European travelers research on mobile, book on desktop

---

## 3. Technology Stack

### 3.1 Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│                    European Traveler                     │
└─────────────────────┬───────────────────────────────────┘
                      │  HTTPS
┌─────────────────────▼───────────────────────────────────┐
│               Cloudflare (CDN + DNS + WAF)               │
└──────┬──────────────────────────────┬────────────────────┘
       │                              │
┌──────▼──────┐                ┌──────▼──────┐
│  Nuxt 3 /   │                │  Static     │
│  Web Server │                │  Assets     │
│  (SSR/SSG)  │                │  (Images)   │
└──────┬──────┘                └─────────────┘
       │  Internal API calls
┌──────▼──────┐     ┌──────────────────────┐
│  .NET 9     │     │  Directus 11         │
│  API        │     │  (Headless CMS)      │
│  (Port 5000)│     │  (Port 8055)         │
└──────┬──────┘     └──────────┬───────────┘
       │                       │
┌──────▼───────────────────────▼───────────┐
│         PostgreSQL 16 Database            │
│  (achari_tours db)                        │
└──────────────────────────────────────────┘
```

### 3.2 Technology Decisions

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Frontend** | Nuxt 3 (Vue.js) | 3.x | SSR/SSG for SEO, Vue's gentle learning curve, ISR for blog posts |
| **Backend API** | .NET / C# | 9.0 | Robust, type-safe, excellent performance, strong ecosystem |
| **CMS** | Directus | 11 | Self-hosted, headless, excellent REST API, non-technical friendly UI |
| **Database** | PostgreSQL | 16 | Shared by both .NET API and Directus, JSONB support |
| **Container** | Docker + Docker Compose | — | Reproducible environments, easy Hostinger deployment |
| **Reverse Proxy** | Nginx | — | SSL termination, routing, caching headers |
| **CDN** | Cloudflare (Free) | — | Global CDN, DDoS protection, DNS |
| **Hosting** | Hostinger KVM 1 | — | Cost-effective VPS with Docker support |

### 3.3 Nuxt Modules
| Module | Purpose |
|--------|---------|
| `@nuxt/image` | Automatic WebP conversion, lazy loading, responsive sizes |
| `@nuxt/fonts` | Google Fonts with privacy-friendly local serving |
| `@nuxtjs/sitemap` | Auto-generated XML sitemap for SEO |
| `@nuxtjs/robots` | robots.txt generation |
| `nuxt-schema-org` | JSON-LD structured data injection |

### 3.4 Rendering Strategy (Nuxt Route Rules)
| Route | Strategy | Why |
|-------|---------|-----|
| `/` | SSG (Static) | Home page — pre-rendered for maximum speed |
| `/tours` | SSG | Tour listing — fast, SEO-critical |
| `/tours/:slug` | ISR (1 hour) | Tour details — frequently updated, CMS-driven |
| `/blog` | SSR | Blog listing — always fresh |
| `/blog/:slug` | ISR (24 hours) | Blog posts — CMS-updated infrequently |
| `/destinations/**` | ISR (1 hour) | Destination pages |
| `/contact` | SSR | Contact form — dynamic |
| `/about` | SSG | Static content |

---

## 4. Domain & Hosting

| Item | Details |
|------|---------|
| **Domain** | `acharitours.lumicore-labs.com` (subdomain, currently) |
| **Future Domain** | `acharitours.com` (planned) |
| **Server** | Hostinger KVM 1 |
| **SSL** | Let's Encrypt via Certbot (auto-renew) |
| **Payment LLC** | Planning US LLC for Stripe integration (future) |

### 4.1 Port Map (Docker)
| Service | Internal Port | External Port |
|---------|-------------|--------------|
| Nuxt Web | 3000 | 80 / 443 (via Nginx) |
| .NET API | 8080 | 5000 (via Nginx) |
| Directus CMS | 8055 | 8055 (via Nginx, admin only) |
| PostgreSQL | 5432 | Not exposed externally |

---

## 5. Content Architecture

### 5.1 Directus Collections (CMS)

#### `tours`
| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID | |
| `status` | Enum | draft / published / archived |
| `title` | String | e.g. "The Essential Sri Lanka" |
| `slug` | String | URL-safe, unique |
| `short_description` | Text | Used in cards (150 chars) |
| `full_description` | Rich Text | Full tour description |
| `hero_image` | File (M2O) | Directus file ID |
| `duration_days` | Integer | |
| `difficulty` | Enum | easy / moderate / challenging |
| `categories` | JSON Array | ["cultural", "wildlife", "coastal"] |
| `price_display` | String | e.g. "From $1,299 per person" |
| `highlights` | JSON Array | Bullet point list |
| `included` | JSON Array | What's included |
| `excluded` | JSON Array | What's not included |
| `days` | O2M → tour_days | Itinerary |
| `gallery` | M2M → tour_gallery | Photo gallery |
| `addons` | M2M → tour_addons | Optional extras |
| `meta_title` | String | SEO |
| `meta_description` | String | SEO |
| `focus_keyword` | String | SEO |
| `sort_order` | Integer | Display ordering |

#### `tour_days`
| Field | Type | Notes |
|-------|------|-------|
| `day_number` | Integer | 1, 2, 3... |
| `title` | String | e.g. "Colombo → Dambulla" |
| `description` | Rich Text | |
| `location_name` | String | |
| `latitude` | Float | For map pin |
| `longitude` | Float | For map pin |
| `activities` | JSON Array | |
| `accommodation` | String | |
| `meals` | String | e.g. "Breakfast + Dinner" |
| `image` | File | Day photo |

#### `blog_articles`
| Field | Type | Notes |
|-------|------|-------|
| `title` | String | |
| `slug` | String | |
| `excerpt` | Text | 200 chars |
| `body` | Rich Text | Full article |
| `author` | M2O → authors | |
| `hero_image` | File | |
| `category` | Enum | cultural / wildlife / coastal / planning / tips |
| `tags` | JSON Array | |
| `published_at` | DateTime | |
| `is_featured` | Boolean | |
| `meta_title` | String | SEO |
| `meta_description` | String | SEO |

#### `destinations`
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | e.g. "Sigiriya" |
| `slug` | String | |
| `region` | Enum | cultural-triangle / south-coast / east-coast / hill-country / north |
| `short_description` | Text | |
| `full_description` | Rich Text | |
| `hero_image` | File | |
| `latitude` | Float | |
| `longitude` | Float | |
| `highlights` | JSON Array | |

#### `testimonials`
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | |
| `country` | String | |
| `quote` | Text | |
| `rating` | Integer | 1-5 |
| `tour_taken` | String | Tour title |
| `avatar` | File | Optional photo |

#### `site_settings` (singleton)
| Field | Type |
|-------|------|
| `site_name` | String |
| `site_description` | String |
| `default_og_image` | File |
| `contact_email` | String |
| `contact_phone` | String |
| `whatsapp_number` | String |
| `social_links` | JSON |

### 5.2 Tour Packages (MVP — 5 Tours)

| # | Name | Duration | Price (From) | Categories |
|---|------|----------|-------------|-----------|
| 1 | The Essential Sri Lanka | 5 Days | $1,299 | Cultural + Wildlife |
| 2 | Heritage & Wildlife Discovery | 7 Days | $1,899 | Cultural + Wildlife |
| 3 | The Complete Island Experience | 10 Days | $2,999 | Cultural + Wildlife + Coastal |
| 4 | The Grand Sri Lanka Journey | 14 Days | $4,499 | Cultural + Wildlife + Coastal |
| 5 | Surf & Soul Retreat | 7 Days | $1,699 | Coastal |

### 5.3 Pricing Model
- **Base:** Per-person pricing (displayed as "From $X per person")
- **Seasonal Pricing:** High season (Dec–Mar, Jul–Aug) premium +15–25%
- **Group Discounts:** 6+ pax = 10% off, 10+ pax = 15% off
- **Early Bird:** 90+ days advance booking = 8% off
- **Add-ons:** Optional extras (airport transfer, room upgrades, whale watching, cooking class)
- **Payment:** Manual confirmation → bank transfer / Wise / (Stripe once LLC is registered)

---

## 6. Database Schema (.NET API)

The `.NET API` manages **operational data** (bookings, inquiries, users) while Directus manages **content data** (tours, blog, destinations).

### 6.1 Tables

#### `booking_inquiries`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `reference_code` | VARCHAR(20) UNIQUE | e.g. ACH-202601-00001 |
| `tour_id` | VARCHAR(50) | Directus tour ID |
| `tour_title` | VARCHAR(200) | Denormalized for readability |
| `preferred_start_date` | DATE | |
| `preferred_end_date` | DATE | |
| `adult_count` | INT | |
| `child_count` | INT | |
| `selected_addons` | JSONB | Array of addon IDs |
| `special_requests` | TEXT | |
| `first_name` | VARCHAR(100) | |
| `last_name` | VARCHAR(100) | |
| `email` | VARCHAR(200) | Indexed |
| `phone` | VARCHAR(30) | |
| `country` | VARCHAR(100) | |
| `status` | VARCHAR(20) | New/Contacted/Quoted/Confirmed/Completed/Cancelled |
| `internal_notes` | TEXT | Admin notes |
| `utm_source` | VARCHAR(100) | Marketing attribution |
| `utm_medium` | VARCHAR(100) | |
| `utm_campaign` | VARCHAR(200) | |
| `referrer_url` | VARCHAR(500) | |
| `created_at` | TIMESTAMP | |
| `updated_at` | TIMESTAMP | |

#### `inquiry_status_history`
Tracks every status change with who changed it and when.

#### `contact_submissions`
General contact form submissions.

#### `newsletter_subscribers`
Email list with source tracking and unsubscribe support.

#### `admin_notifications`
Real-time in-app notification bell for the admin dashboard.

---

## 7. Pages & Routes

### 7.1 Public Website

| Route | Page | Priority | SEO Schema |
|-------|------|---------|-----------|
| `/` | Home | ⭐⭐⭐ | TravelAgency |
| `/tours` | Tour Listing | ⭐⭐⭐ | ItemList |
| `/tours/:slug` | Tour Detail | ⭐⭐⭐ | TouristTrip + FAQPage |
| `/destinations` | Destinations Overview | ⭐⭐ | ItemList |
| `/destinations/:slug` | Destination Detail | ⭐⭐⭐ | TouristDestination |
| `/blog` | Blog Listing | ⭐⭐ | Blog |
| `/blog/:slug` | Blog Post | ⭐⭐⭐ | Article |
| `/about` | About Us | ⭐⭐ | Organization |
| `/contact` | Contact | ⭐⭐ | — |
| `/inquiry/:tourSlug` | Booking Inquiry Form | ⭐⭐⭐ | — |
| `/404` | Not Found | — | — |
| `/privacy` | Privacy Policy | ⭐ | — |
| `/terms` | Terms of Service | ⭐ | — |

### 7.2 Admin Dashboard (future)

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard overview (stats, recent inquiries) |
| `/admin/inquiries` | Inquiry list + filters |
| `/admin/inquiries/:id` | Inquiry detail + status management |
| `/admin/contacts` | Contact form submissions |
| `/admin/newsletter` | Subscriber list + export |
| `/admin/notifications` | Notification log |

---

## 8. SEO Strategy

### 8.1 Target Keywords
| Cluster | Keywords |
|---------|---------|
| **Primary** | "Sri Lanka tours", "Sri Lanka travel agency", "luxury Sri Lanka holidays" |
| **Cultural** | "Sigiriya tours", "Sri Lanka cultural heritage", "ancient temples Sri Lanka" |
| **Wildlife** | "Yala safari", "Sri Lanka elephant safari", "whale watching Mirissa" |
| **Coastal** | "Arugam Bay surf", "Sri Lanka surf trips", "south coast Sri Lanka beach" |
| **Market** | "Sri Lanka tours from Sweden/UK/Germany", "Nordic Sri Lanka travel" |

### 8.2 Technical SEO Checklist
- [x] SSG/ISR rendering for all content pages
- [x] Sitemap XML (auto-generated via `@nuxtjs/sitemap`)
- [x] robots.txt (configured)
- [x] Canonical URLs on every page
- [x] Open Graph + Twitter Card meta tags
- [x] JSON-LD structured data (all schema types implemented)
- [ ] Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1)
- [ ] Image optimization (WebP, srcset, lazy loading)
- [ ] Internal linking strategy
- [ ] Google Search Console setup
- [ ] Google Analytics 4 + GA4 Events

### 8.3 Content SEO Strategy
- **Blog:** 2 articles/month minimum — travel guides, destination deep dives, "X Days in Sri Lanka" itineraries
- **Target format:** Long-form (1,500–3,000 words), location-specific, answer "People Also Ask" questions
- **Languages:** English primary (Scandinavian market reads English), German translation in Phase 3

---

## 9. Development Phases

### Phase 1 — MVP (Months 1–2) ← CURRENT
**Goal:** Functional website with booking inquiry capability

#### Phase 1A — Foundation ✅ COMPLETE
- [x] Nuxt 3 + design system
- [x] .NET 9 API scaffolding
- [x] Docker Compose (PostgreSQL + Directus)
- [x] Home, Tours, About, Contact pages
- [x] SEO composables + JSON-LD schemas
- [x] Booking inquiry form composable
- [x] .NET entity models + controllers

#### Phase 1B — Core Pages (IN PROGRESS)
- [ ] Tour detail page (itinerary, gallery, map, addons)
- [ ] Blog listing + detail pages
- [ ] Destinations overview + detail pages
- [ ] Multi-step booking inquiry form page
- [ ] 404 error page

#### Phase 1C — Business Logic
- [ ] EF Core migration + DB setup
- [ ] Admin dashboard (login, inquiry management)
- [ ] JWT authentication for admin
- [ ] Email notifications (inquiry received → admin, confirmation → traveler)
- [ ] Directus collections configuration

#### Phase 1D — Launch
- [ ] Core Web Vitals audit
- [ ] Docker production build + deploy to Hostinger
- [ ] Nginx configuration + SSL (Let's Encrypt)
- [ ] Google Search Console + Analytics 4
- [ ] Google Business Profile

---

### Phase 2 — Content Engine (Months 3–4)
**Goal:** Authority content for organic SEO growth

- [ ] Populate all 5 tour packages in Directus with full itineraries
- [ ] Write 6 foundational blog articles (destination guides, trip planning)
- [ ] Set up all destination pages (10+ destinations)
- [ ] Interactive route map component (Leaflet.js)
- [ ] Testimonial collection system
- [ ] Photo gallery with lightbox
- [ ] WhatsApp floating chat button

---

### Phase 3 — Growth & Optimization (Months 5–6)
**Goal:** Conversion optimization and new acquisition channels

- [ ] Seasonal pricing engine in .NET API
- [ ] Group discount calculation
- [ ] Early-bird discount system
- [ ] Payment integration (Stripe, once US LLC is registered)
- [ ] German language translation (`/de/` routes)
- [ ] Pinterest Rich Pins integration
- [ ] Instagram Feed embed
- [ ] Newsletter email campaigns (Mailchimp/Brevo integration)
- [ ] Tour comparison tool
- [ ] Availability calendar widget

---

### Phase 4 — AI & Personalization (Months 7–12)
**Goal:** Premium, tech-differentiated experience

- [ ] AI Travel Concierge chatbot (Gemini API)
  - "Tell us your interests → we suggest the perfect tour"
  - Natural language booking inquiry
- [ ] Personalized itinerary generator
- [ ] Dynamic pricing display based on travel dates
- [ ] Review collection system (post-tour automated email)
- [ ] CRM integration (HubSpot or custom)
- [ ] Affiliate/referral program for travel bloggers
- [ ] Multi-language support (Swedish, Norwegian, German)

---

## 10. File Structure

```
achari-tours/
├── docs/                         ← Project documentation
│   ├── PROJECT_PLAN.md           ← This file
│   ├── TASK_TRACKER.md           ← Development task checklist
│   └── PROGRESS_LOG.md           ← Build progress + decisions
├── web/                          ← Nuxt 3 Frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── global/           ← AppHeader, AppFooter
│   │   │   ├── tour/             ← TourCard, TourItinerary, etc.
│   │   │   ├── blog/             ← BlogCard, BlogContent
│   │   │   └── ui/               ← BaseButton, BaseImage, etc.
│   │   ├── composables/          ← useDirectus, useSeo, useJsonLd, etc.
│   │   ├── layouts/              ← default.vue
│   │   └── pages/                ← index, tours, blog, destinations, etc.
│   └── assets/css/               ← Design system CSS
├── api/                          ← .NET 9 Web API
│   ├── Controllers/              ← Public + Admin controllers
│   ├── Data/                     ← AppDbContext
│   ├── Models/
│   │   ├── Entities/             ← EF Core entities
│   │   ├── DTOs/                 ← Request/Response DTOs
│   │   └── Enums/                ← InquiryStatus, etc.
│   └── Services/                 ← (future: EmailService, PricingService)
├── logo/                         ← Brand assets
├── docker-compose.yml            ← Dev environment (PostgreSQL + Directus)
└── .gitignore
```

---

## 11. Decisions Log

| Date | Decision | Rationale |
|------|---------|-----------|
| Aug 2026 | Nuxt 3 over Next.js | Vue ecosystem, SSG/ISR flexibility, team familiarity |
| Aug 2026 | Directus over WordPress | API-first, clean data model, self-hosted, no plugin bloat |
| Aug 2026 | PostgreSQL shared by API + Directus | Single DB to manage, Directus has native PG support |
| Aug 2026 | Semi-structured booking (inquiry → manual confirm) | Simpler MVP, more personal service, avoids payment gateway complexity until LLC |
| Aug 2026 | US LLC for Stripe | Easier Stripe onboarding from US entity vs. LK entity |
| Aug 2026 | Hostinger KVM 1 | Affordable dedicated VPS with full Docker support |
| Aug 2026 | "Cinematic Minimalism" design mood | Best balance of international premium feel + Sri Lankan visual storytelling |
| Aug 2026 | Clean sans-serif typography | Scandinavian-inspired, modern, highly legible |
| Aug 2026 | Both Cultural patterns + Photography | Use subtle Sri Lankan motifs as texture, reveal culture through stunning photography |

---

*Last updated: August 2026*
