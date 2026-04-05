@AGENTS.md

# Payoff Website — payoffdebtplanner.com

## Tech Stack
- **Framework:** Next.js 16.2 (App Router, React 19, TypeScript 5)
- **Styling:** Tailwind CSS 4 + PostCSS
- **Content:** MDX 3.1 (blog posts in `src/content/blog/`)
- **Animations:** Framer Motion 12
- **Font:** Nunito (Google Fonts)
- **Analytics:** Google Tag Manager (G-LHEDVH14ZJ)
- **Email:** Zoho Mail (payoffdebtplanner@zohomail.eu)
- **Backend:** Supabase (waitlist, contact form, account deletion)
- **i18n:** 9 languages (en, es, pt, fr, de, ja, ko, zh, it) — custom dictionaries in `src/app/[lang]/dictionaries/`

## Site Purpose
Drive traffic to the Payoff mobile app. Every page should have prominent CTAs linking to the app download.

## CTA System
All CTAs reference constants in `src/lib/constants.ts`:
```
APP_DOWNLOAD_URL = '/#waitlist'  → Change to app store link at launch
APP_CTA_TEXT = 'Join the Waitlist' → Change to 'Download Free'
APP_CTA_TEXT_ALT = 'Get Started Free' → Secondary CTA variant
STORE_LINKS.appStore = '#' → iOS App Store URL
STORE_LINKS.playStore = '#' → Google Play URL
```
There are also ~53 hardcoded `/#waitlist` references in MDX blog posts — search `/#waitlist` to find them all at launch.

## Key Directories
- `src/app/[lang]/` — Locale-prefixed pages (homepage, calculators, guides, legal)
- `src/app/[lang]/calculator/` — 6 free calculators (snowball, avalanche, hybrid, cash-flow, highest-balance, deadline)
- `src/app/[lang]/guides/[slug]/` — Programmatic SEO guide pages (data-driven from `src/data/guides.ts`)
- `src/app/blog/` — Blog index + MDX post pages (English only, not locale-prefixed)
- `src/content/blog/` — 33 MDX blog posts
- `src/data/guides.ts` — Guide page data (add entries here to generate new guide pages automatically)
- `src/components/` — Reusable components (landing/, calculator/, blog/, layout/, i18n/)
- `src/lib/` — Constants, i18n config, blog utils
- `public/` — Logo, app screenshots (9 languages), SVG assets

## Programmatic SEO Guides
Guide pages at `/[lang]/guides/[slug]` are template-driven from `src/data/guides.ts`. Each entry generates a full page with:
- AI-extractable definition block (bold, 40-60 words, top of page)
- Hero stat with source
- 6 unique step-by-step instructions
- Tips section specific to the debt type
- FAQ accordion
- 4 JSON-LD schemas (HowTo, FAQPage, BreadcrumbList, Article)
- 3 CTAs (hero, mid-page banner, bottom banner) — all using `APP_DOWNLOAD_URL`
- Related calculator + blog post links

**To add a new guide:** Add an entry to the `guides` array in `src/data/guides.ts`. The template, sitemap, schemas, and routing handle everything. No new files needed.

Current guides (8): credit cards, student loans, car loans, medical debt, personal loans, $10K debt, $20K debt, $50K debt.

## SEO & AI Discoverability
- **robots.ts** — Explicitly allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot. Blocks training-only crawlers (CCBot).
- **Sitemap** — Dynamic (`src/app/sitemap.ts`), includes all locale pages, guides, and blog posts with priorities.
- **Schema markup (JSON-LD):**
  - Root layout: Organization + WebSite + MobileApplication (`@graph`)
  - Homepage: SoftwareApplication + FAQPage
  - Calculators: WebApplication + FAQPage + BreadcrumbList + HowTo
  - Guides: HowTo + FAQPage + BreadcrumbList + Article
  - Blog posts: Article (auto-generated)
- **Definition blocks** — Top 12 blog posts have bold 40-60 word standalone answer blocks for AI extraction.
- **Blog** — 33 posts targeting "debt payoff" keyword cluster. Rich MDX components: Callout, StatHighlight, ProsCons, ComparisonTable, StepByStep, CTABox, KeyTakeaway, Scenario, BlogImage, PhoneFrame.

## Blog Post Guidelines
- Posts are MDX in `src/content/blog/` with yaml frontmatter (title, description, date, author, category, tags)
- Template and component docs: `docs/blog-template.md`
- SEO plan and keywords: `docs/seo-blog-plan.md`
- Tone: warm, friendly, emotionally supportive — acknowledge debt is stressful
- Every post should have 2-3 CTAs (mid-article CTABox + closing paragraph)
- Internal link to calculators (`/en/calculator/snowball`) and related blog posts (`/blog/{slug}`)
- Start with a bold definition block for AI extractability

## Calculator Pages
6 calculators under `/[lang]/calculator/`. Each has:
- Server page (`page.tsx`) with metadata, schema markup (WebApplication, FAQPage, BreadcrumbList, HowTo), and locale-aware content
- Client component (`client.tsx`) with interactive calculator, results, chart, amortization table, FAQ, CTA
- Shared components in `src/components/calculator/`

## Design System
- **Primary:** #005235 (forest green)
- **Secondary:** #FF8C73 (coral)
- **Accent:** #FFD966 (yellow)
- **Background:** #FFF8F4 (warm off-white)
- Warm, rounded aesthetic matching the mobile app
- Glassmorphism accents, gradient CTAs, decorative blobs

## Deployment
- Vercel (Next.js native)
- Environment variables in `.env.local` (Supabase URL/key, Zoho credentials)
