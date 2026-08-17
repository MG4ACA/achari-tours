# Achari Tours — Task Tracker

> Living document — updated as tasks are completed.  
> Legend: `[x]` Done · `[/]` In Progress · `[ ]` Pending

---

## ✅ Phase 1A — Foundation (COMPLETE)

### Frontend — Design System
- [x] Initialize Nuxt 3 project with TypeScript
- [x] Configure `nuxt.config.ts` — modules, route rules (SSG/ISR/SSR), SEO defaults, runtime config
- [x] `reset.css` — modern CSS reset, font smoothing, box-sizing
- [x] `variables.css` — brand colors, thematic colors (ocean, earth, wildlife), spacing scale, type scale, shadows, transitions, z-index, layout constants
- [x] `typography.css` — font-face definitions (Outfit + Inter), responsive type scaling
- [x] `main.css` — container, sections, buttons (primary/secondary/ghost/white), cards, badges, forms, grids, overlays, labels, scrollbar
- [x] `animations.css` — scroll reveals, page transitions, micro-interactions, float, shimmer, `prefers-reduced-motion` support
- [x] `utilities.css` — flex/grid helpers, spacing, visibility, text alignment

### Frontend — Composables
- [x] `useDirectus.ts` — typed Directus client, data models for Tours, TourDay, Blog, Destinations, Testimonials, SiteSettings; full CRUD helpers
- [x] `useSeo.ts` — standardized meta tags (title, description, OG, Twitter, canonical, robots, article meta)
- [x] `useJsonLd.ts` — JSON-LD generators for TravelAgency, TouristTrip, Article, TouristDestination, BreadcrumbList, FAQPage
- [x] `useScrollReveal.ts` — IntersectionObserver-based scroll animations with auto-cleanup
- [x] `useBookingInquiry.ts` — multi-step form state, per-step validation, UTM tracking capture, API submission

### Frontend — Layout & Global Components
- [x] `app.vue` — app entry point with NuxtRouteAnnouncer + NuxtLayout + NuxtPage
- [x] `layouts/default.vue` — header + main + footer layout
- [x] `components/global/AppHeader.vue` — sticky header (transparent → solid on scroll), hero-aware text colors, desktop nav with active states, mobile hamburger with full-screen overlay
- [x] `components/global/AppFooter.vue` — dark footer with wave separator, brand column, nav columns, newsletter signup form, social links, copyright bar

### Frontend — Pages (4 of 11)
- [x] `pages/index.vue` — Home: cinematic full-viewport hero, trust indicators, 3 experience pillars, featured tours grid, "Why Achari" value section, full-bleed CTA banner, scroll reveals throughout
- [x] `pages/tours/index.vue` — Tours Listing: page hero, category filter tabs (All/Cultural/Wildlife/Coastal), responsive 3-column card grid, tour metadata, sample data structure
- [x] `pages/about.vue` — About: brand story, "Why Achari" philosophy, 6-value grid, 2 guide profile cards, dark CTA section
- [x] `pages/contact.vue` — Contact: form (name, email, subject, message) with validation + success state, info sidebar (email, WhatsApp, location, response time), social links

### Backend — .NET 9 API
- [x] Scaffold .NET 9 Web API project
- [x] Install packages: `Npgsql.EntityFrameworkCore.PostgreSQL 9.0.4`, `Microsoft.AspNetCore.Authentication.JwtBearer 9.0.7`, `Microsoft.EntityFrameworkCore.Design 9.0.7`, `System.IdentityModel.Tokens.Jwt`
- [x] `Models/Enums/InquiryStatus.cs` — New / Contacted / Quoted / Confirmed / Completed / Cancelled
- [x] `Models/Entities/BookingInquiry.cs` — Full inquiry entity with UTM tracking fields
- [x] `Models/Entities/InquiryStatusHistory.cs` — Status change audit trail
- [x] `Models/Entities/ContactSubmission.cs` — Contact form submissions
- [x] `Models/Entities/NewsletterSubscriber.cs` — Email subscribers with source tracking
- [x] `Models/Entities/AdminNotification.cs` — In-app notifications for admin dashboard
- [x] `Models/DTOs/PublicDTOs.cs` — CreateInquiryRequest, InquiryResponse, CreateContactRequest, NewsletterSubscribeRequest
- [x] `Data/AppDbContext.cs` — EF Core DbContext, indexes, enum→string conversion, JSONB column for addons
- [x] `Controllers/InquiriesController.cs` — `POST /api/inquiries` with reference code generation (ACH-YYYYMM-XXXXX), status history, admin notification
- [x] `Controllers/ContactController.cs` — `POST /api/contact` with admin notification
- [x] `Controllers/NewsletterController.cs` — `POST /api/newsletter/subscribe` with duplicate detection + re-subscription
- [x] `Program.cs` — PostgreSQL, CORS (Nuxt frontend), camelCase JSON, enum serialization, dev auto-migrate
- [x] `appsettings.json` — PostgreSQL connection string, CORS origins, JWT config placeholder
- [x] **BUILD SUCCEEDED** ✅ — 0 errors, 0 warnings

### Infrastructure
- [x] `docker-compose.yml` — PostgreSQL 16 (with health check), Directus 11 (with volumes + CORS), commented production API/Web services
- [x] `.gitignore` — excludes `bin/`, `obj/`, `node_modules/`, `.nuxt/`, `.env`
- [x] Git repository initialized and pushed to GitHub (`MG4ACA/achari-tours`)

---

## 🔄 Phase 1B — Core Pages (IN PROGRESS)

### Frontend — Remaining Pages
- [ ] `pages/tours/[slug].vue` — Tour Detail
  - [ ] Hero with tour title + duration overlay
  - [ ] Highlights strip (3-4 key stats)
  - [ ] Full description section
  - [ ] Day-by-day itinerary accordion
  - [ ] Photo gallery (lightbox)
  - [ ] Included / Excluded lists
  - [ ] Optional add-ons section
  - [ ] Interactive route map (Leaflet.js)
  - [ ] Sticky sidebar: price, "Book Now" CTA, share buttons
  - [ ] FAQPage JSON-LD schema
- [ ] `pages/blog/index.vue` — Blog Listing
  - [ ] Featured article hero
  - [ ] Category filter tabs
  - [ ] Article card grid
  - [ ] Pagination
- [ ] `pages/blog/[slug].vue` — Blog Detail
  - [ ] Full article with rich text rendering
  - [ ] Author bio card
  - [ ] Related articles
  - [ ] Article JSON-LD schema
- [ ] `pages/destinations/index.vue` — Destinations Overview
  - [ ] Region-grouped destination cards
  - [ ] Sri Lanka mini-map
- [ ] `pages/destinations/[slug].vue` — Destination Detail
  - [ ] Hero, description, highlights
  - [ ] Tours that include this destination
  - [ ] TouristDestination JSON-LD schema
- [ ] `pages/inquiry/[tourSlug].vue` — Booking Inquiry Form
  - [ ] Step 1: Travel dates + traveler count
  - [ ] Step 2: Add-ons + special requests
  - [ ] Step 3: Contact details
  - [ ] Confirmation screen with reference code
- [ ] `pages/[...404].vue` — Not Found Page
  - [ ] On-brand 404 with suggested links

### Frontend — UI Components
- [ ] `components/tour/TourCard.vue` — Reusable tour card
- [ ] `components/tour/TourItinerary.vue` — Day accordion
- [ ] `components/tour/TourGallery.vue` — Photo gallery with lightbox
- [ ] `components/blog/BlogCard.vue` — Article preview card
- [ ] `components/blog/RichContent.vue` — Renders Directus rich text
- [ ] `components/ui/BaseImage.vue` — Wrapper for `<NuxtImg>` with blur-up placeholder
- [ ] `components/ui/Breadcrumb.vue` — Navigation breadcrumb
- [ ] `components/ui/LoadingSpinner.vue` — Loading state

---

## ⬜ Phase 1C — Business Logic

### Backend — Database
- [ ] Run `dotnet ef migrations add InitialCreate` (requires PostgreSQL running)
- [ ] Run `dotnet ef database update`
- [ ] Seed initial admin user

### Backend — Admin API
- [ ] `Controllers/Admin/AdminInquiriesController.cs`
  - [ ] `GET /api/admin/inquiries` — list with filters (status, date, country)
  - [ ] `GET /api/admin/inquiries/:id` — detail + history
  - [ ] `PATCH /api/admin/inquiries/:id/status` — update status
  - [ ] `PATCH /api/admin/inquiries/:id/notes` — update internal notes
- [ ] `Controllers/Admin/AdminNotificationsController.cs`
  - [ ] `GET /api/admin/notifications` — unread notifications
  - [ ] `PATCH /api/admin/notifications/:id/read` — mark as read
- [ ] `Controllers/Admin/AdminDashboardController.cs`
  - [ ] `GET /api/admin/dashboard/stats` — inquiry counts by status, this month vs last month
- [ ] `Controllers/AuthController.cs` — JWT login for admin
- [ ] `Services/EmailService.cs` — Send inquiry confirmation (traveler) + notification (admin)

### Admin Dashboard (Nuxt or separate Vue app)
- [ ] Login page with JWT auth
- [ ] Dashboard overview (stats cards, recent inquiries table)
- [ ] Inquiry list with filters + pagination
- [ ] Inquiry detail with status management
- [ ] Notification bell with dropdown

---

## ⬜ Phase 1D — SEO & Launch

- [ ] Add `<head>` favicon + apple-touch-icon
- [ ] Create logo variants (horizontal, favicon 32x32, light/white version)
- [ ] Core Web Vitals audit (Lighthouse)
- [ ] Optimize hero image loading (fetchpriority, WebP)
- [ ] Build production Docker images (Dockerfile for API + Dockerfile for Web)
- [ ] Set up Nginx reverse proxy config
- [ ] Deploy to Hostinger KVM 1
- [ ] SSL certificate (Let's Encrypt / Certbot)
- [ ] Configure Cloudflare DNS
- [ ] Google Search Console — submit sitemap
- [ ] Google Analytics 4 — set up events (page_view, form_submit, tour_click)
- [ ] Google Business Profile

---

## ⬜ Phase 2 — Content Engine

- [ ] Configure all Directus collections (Tours, Blog, Destinations, etc.)
- [ ] Enter all 5 tour packages with full itineraries
- [ ] Write 6 foundational blog articles
- [ ] Set up 10+ destination pages
- [ ] Leaflet.js interactive route map
- [ ] Testimonials section on home page
- [ ] Photo gallery with lightbox component
- [ ] WhatsApp floating chat button

---

## ⬜ Phase 3 — Growth

- [ ] Seasonal pricing engine (API)
- [ ] Group discount calculator
- [ ] Early-bird discount system
- [ ] Stripe payment integration (post-LLC)
- [ ] German language (`/de/`) routes + translations
- [ ] Pinterest Rich Pins
- [ ] Newsletter email campaign integration (Brevo/Mailchimp)
- [ ] Tour comparison tool

---

## ⬜ Phase 4 — AI & Personalization

- [ ] AI Travel Concierge (Gemini API)
- [ ] Personalized itinerary generator
- [ ] Dynamic pricing display
- [ ] Review collection automation
- [ ] Multi-language (Swedish, Norwegian, German)
- [ ] Affiliate/referral program
