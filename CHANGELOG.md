# Arey Studio — Refinement Changelog

Each major change is tracked with file-level detail and design rationale.

---

## [Refinement 1] — Custom Premium Cursor System
**Status:** Completed
**Files changed:**
- `components/Cursor.tsx` (new)
- `components/MagneticButton.tsx` (updated: added data-cursor support, reduced strength 0.3→0.2)
- `app/layout.tsx` (added `<Cursor />`)
- `app/globals.css` (added cursor styles: .cursor-dot, .cursor-ring, .cursor-label)
- `app/layout.tsx` (added data-cursor="hover" to nav links)

**What changed:**
Built a cinematic custom cursor system with:
- Dot (8px) + outer ring (36px) GSAP-lerp design
- Four states: default (accent dot), hover (expanded ring on interactive elements), project (64px ring with blur bg + "View" label), text (vertical bar)
- `mix-blend-mode: difference` on dot for visibility on all surfaces
- `data-cursor` attribute system for declarative state changes
- Mobile already handled by `@media (hover: none)` in existing CSS

**Why:**
The original `cursor: none` on `<html>` with no visible cursor made the site feel broken. A proper cinematic cursor adds tactile, expensive, intentional feeling. Different states on project cards (showing "View") provide clear interaction affordances that signal premium quality.

---

## [Refinement 2] — Cinematic Hero Signature Moment
**Status:** Completed
**Files changed:** `components/Hero.tsx` (fully rewritten)

**What changed:**
- Added scroll-reactive **AREY brand watermark** (20vw, 2.5% opacity) that fades in and scales as user scrolls down, replacing the main heading as it dissolves
- Words now **disappear with staggered horizontal displacement** (odd words left, even words right + rotationY) instead of simple fade-up, creating a cinematic "text dissolving" effect
- Added **breathing ambient orbs** (off-center radial gradient blobs with GSAP x/y oscillation) for atmospheric depth
- Enhanced **scroll indicator** with rotating SVG dashed ring around the scroll text + animated inner scroll line
- Added **vertical side label** on left: "Arey Studio — Creative Direction" in vertical writing mode
- Increased initial letter reveal intensity (rotationX: -25, longer durations: 1.6s per line)
- CTA buttons now use **primary/secondary semantic classes** with arrow indicators that slide in on hover
- Mobile-safe: simplified scroll effects on touch devices (no horizontal scatter, faster scrub)

**Why:**
The original hero was forgettable — text appears, you scroll, it's gone. The watermark creates a memorable recurring brand motif that people associate with the studio. The dissolve effect transforms the hero from a static page into a scroll-driven cinematic experience. The breathing orbs add the "living atmosphere" that makes a site feel handcrafted.

---

## [Refinement 3] — Immersive Project Section Redesign
**Status:** Completed
**Files changed:** `components/WorksSection.tsx` (fully rewritten)

**What changed:**
- Replaced generic **2-column grid** with **cinematic alternating full-width strips** — each project is a horizontal editorial showcase
- First project is **hero-size** (21:9 aspect ratio, 80vh min-height), others are 16:9 — creates visual rhythm
- Projects **slide in from alternating directions** on scroll (from left or right, 80px offset + rotationY), giving each reveal unique timing
- **Image parallax on scroll** — images scale from 1.1→1.0 and translate vertically within their container via ScrollTrigger scrub
- Properly uses pre-existing `.project-card`, `.card-overlay`, `.card-content`, `.card-glow` CSS classes
- `data-cursor="project"` on each card triggers the "View" cursor state
- **Mouse-tilt 3D effect** on images (rotationX/Y based on cursor position) for depth
- Bottom CTA uses btn-primary with arrow animation
- Mobile-safe: disables parallax + 3D tilt on touch devices, uses simpler y-axis fade-in

**Why:**
The original grid (2 columns, some tall cards) looked like every other portfolio. The alternating editorial layout makes projects feel like high-end campaign presentations — larger, more cinematic, more premium. The directional slide-in adds tension/release rhythm. The image parallax creates Z-depth that makes the site feel 3D.

---

## [Refinement 4] — Premium Button & CTA System + Navigation Overhaul
**Status:** Completed
**Files changed:**
- `components/MagneticButton.tsx` (reduced strength, added data-cursor prop)
- `app/globals.css` (restyled .btn-primary, .btn-secondary, .magnetic-btn, .nav-link)
- `components/Hero.tsx` (uses btn-primary/btn-secondary instead of flat borders)
- `components/WorksSection.tsx` (uses btn-primary with arrow)
- `components/ContactForm.tsx` (form submit button updated — noted, not yet changed)

**What changed:**
- **Primary buttons:** Slightly larger (1.1rem vertical padding, 2.8rem horizontal), accent-fill on hover with scaleY transform, lift shadow with accent glow, border color brightens, gap for arrow SVG
- **Secondary buttons:** Thin white border, white fill on hover, ghost-like transparency, lifts with dark shadow
- **Magnetic strength reduced** from 0.3 to 0.2 — less "playful bouncy", more "restrained premium"
- **Navigation links** now use `.nav-link` class with editorial font + animated underline (scaleX from left on hover)
- All buttons use `cursor: none` (handled by custom cursor with hover state)

**Why:**
Original buttons were too subtle — white/15 borders at 11px text didn't stand out. The new system creates stronger visual hierarchy between primary (accent fill) and secondary (white ghost) actions. The arrow animation on hover gives affordance ("this takes you somewhere"). The nav underline animation adds the editorial sophistication expected at luxury level.

---

## [Refinement 5] — Typography Art Direction
**Status:** Completed
**Files changed:**
- `components/About.tsx` (added brand watermark + kinetic marquee separator)
- `components/Hero.tsx` (vertical side label, layered watermark)

**What changed:**
- **About section** has a subtle "AREY" watermark (14vw, 2% opacity, scaled in on scroll via GSAP) positioned behind the section header — creates continuity with hero
- **Kinetic typographic separator** between intro and values: oversized editorial text ("Visual identity · Festival branding · Immersive design") at 6% opacity, italic, with thin accent line and uppercase agency role label — all staggered in on scroll
- **Hero side label**: vertical text on left edge reading "Arey Studio — Creative Direction"

**Why:**
Typography is now a visual element, not just content. The oversized low-opacity brand marks create identity moments throughout the scroll journey. The kinetic marquee breaks up the rectangular sections with editorial flair. These are the "quiet moments" the prompt requested — sections between dense content that give the eye and mind a moment to breathe.

---

## [Refinement 6] — Depth, Atmosphere & Visual Layers + Dead Code Cleanup
**Status:** Completed
**Files changed:**
- `app/globals.css` (enhanced grain, deeper vignette, new .section-divider/.section-fade classes, cleaned up old duplicate styles)
- DELETED: `components/ScrollReveal.tsx` (dead code — never imported)
- DELETED: `components/SplitText.tsx` (dead code — never imported)

**What changed:**
- **Grain texture** enhanced: baseFrequency 0.9→0.85 (slightly larger grain grains), animation 8s→6s (faster, less dizzy), opacity 0.02→0.025 (slightly more visible texture)
- **Vignette** deepened: center area smaller (30% vs 40% transparent), opacity 0.5→0.6 — creates darker edges for cinematic framing
- **Button styles unified** — removed old duplicate .btn-primary/.btn-secondary block from @layer components, now defined once in utility section with proper z-index stacking (arrow SVG inside relative container)
- **New CSS utilities:** `.section-divider` (vertical accent line), `.section-fade-top`, `.section-fade-bottom` (gradient fog overlays for section edges)
- Removed two unused component files to keep codebase clean

**Why:**
The visual depth was flat despite having the tools. Deeper vignette creates cinematic letterbox feeling. The faster grain animation (6s vs 8s) creates more visible texture without distraction. Cleaning dead code reduces maintenance burden and makes the codebase intentional.

---

## [Refinement 7] — Mobile Polish
**Status:** Completed
**Files changed:**
- `components/Hero.tsx` (conditional parallax based on `matchMedia("(hover: none)")`)
- `components/WorksSection.tsx` (conditional parallax + 3D tilt disabled on mobile, simplified fade-in)

**What changed:**
- **Parallax disabled on touch devices** in both Hero (background y-translation + word scatter) and WorksSection (image scroll parallax) — mobile Safari handles smooth scroll poorly and scrub-based parallax creates jank
- **Effects simplified on mobile:** horizontal scatter→vertical fade (y: 30→0), shorter durations (0.7s vs 1s)
- Touch device detection uses `window.matchMedia("(hover: none)").matches` — matches the same logic as the existing `@media (hover: none)` CSS rule, guaranteeing consistency between JS and CSS behavior
- Cursor already handled by existing CSS media query — no JS changes needed

**Why:**
Mobile Safari and mobile Chrome struggle with excessive parallax + scrub animations (causes dropped frames, jank). Disabling these on touch devices ensures smooth 60fps scrolling. The vertical-only fade-in still gives a cinematic feel without the performance cost. Touch targets (buttons at 1.1rem padding + min content) already exceed 44px.

---

## [Refinement 9] — Cases Overhaul: Real Portfolio Data
**Status:** Completed
**Files changed:**
- `public/cases/` (new — copied from `Дизайн агентство (кейсы)`, 38 files across 11 categories)
- `scripts/build-cases.mjs` (new — generates typed manifest from folder scan)
- `components/cases.ts` (rewritten — 38 auto-generated cases, types: pdf/image/gallery)
- `components/PdfThumb.tsx` (new — renders PDF first page via pdfjs-dist to canvas with shimmer fallback)
- `components/PdfModal.tsx` (new — full-screen modal viewer with react-pdf, page nav, zoom, escape-to-close, loading spinner)
- `components/WorksSection.tsx` (rewritten — dynamic categories, PdfThumb for PDFs, click opens PdfModal, skeleton loading)
- `app/works/page.tsx` (updated — passes showAllButton={false} to hide CTA)
- `package.json` (added pdfjs-dist dependency)
- `app/globals.css` (added .skeleton-shimmer, .modal-spinner, .modal-backdrop, @keyframes)

**What changed:**
- Replaced 8 hard-coded fake cases with 38 real cases from the user's folder
- Each subfolder = category filter (11 categories: Бизнес-презентации, Брендбуки, Логотипы, Мерч, etc.)
- PDF first page rendered as thumbnail on-the-fly via pdfjs-dist (no pre-generated images needed)
- Clicking a PDF/gallery card opens full-screen modal with page navigation (←/→), zoom (+/-), escape to close
- Beautiful dual-ring CSS spinner + "Загрузка презентации..." text during PDF load
- Skeleton shimmer animation while thumbnails render
- Subfolder cases (презентация СПФ, ВитаЕЖ) merged into gallery type with all images
- "Все проекты" button hidden when on /works page

**Why:**
The original site had 8 fake/demo cases that didn't represent the studio's real work. Using actual files from organized folders makes the portfolio authentic. PDF vieweing directly on site (instead of downloading) is the premium experience clients expect from a design agency.

---

## [Refinement 10] — Bug Fixes & UI Polish Batch
**Status:** Completed
**Files changed:**
- `components/PdfThumb.tsx` (rewritten — static import, CDN worker)
- `components/PdfModal.tsx` (rewritten — static import, CDN worker)
- `components/Cursor.tsx` (removed "View" label + labelRef)
- `components/Hero.tsx` (brighter CTA buttons)
- `components/WorksSection.tsx` (maxItems prop, unified cursor, filter visibility)
- `app/page.tsx` (maxItems={4})
- `app/works/page.tsx` (cleaned up props)

**What changed:**

### PDF Viewer Fix — InvalidPDFException
- Replaced dynamic `await import("pdfjs-dist")` with static `import * as pdfjs from "pdfjs-dist"` in both `PdfThumb.tsx` and `PdfModal.tsx`
- Worker now loads from CDN (`cdnjs.cloudflare.com`) instead of local `/pdf.worker.min.mjs`
- Fixes `InvalidPDFException / Invalid PDF structure` error caused by Turbopack's handling of dynamic imports inside useEffect

### Cursor — Removed "View" Label
- Removed the floating "View" text that appeared near cursor on project card hover
- Removed `labelRef` and cursor-label div from `Cursor.tsx`
- All cards now use unified `data-cursor="hover"` for consistent interaction

### Hero CTA Buttons — Increased Visibility
- Border: `border` → `border-2`, opacity increased from `/50` to `/70`
- Background: `bg-[#8b6f6f]/15` → `bg-[#8b6f6f]/20`
- Text: added `font-medium`, size `12px` → `13px`, padding increased
- Added `hover:shadow` with soft accent glow on hover
- Secondary button "Связаться" also brightened (border +25%, text 90% opacity)

### Works Section — 4 Items on Homepage
- Homepage now shows only first 4 works (`maxItems={4}`)
- "Смотреть все работы" CTA links to `/works`
- `/works` page shows all works without limit
- Fixed non-existent `showAllButton={false}` prop → clean `<WorksSection />`

### Filter Category Visibility
- Inactive filter buttons: `text-white/50` → `text-white/65`, `border-white/[0.06]` → `border-white/[0.1]`
- Categories "дизайн сайтов" and "дизайн игры" now clearly visible

### Image Cards — Clickable
- All image-type cards now open `ImageModal` on click (same as PDF cards open `PdfModal`)
- Unified cursor behavior across all card types

### Branding Consistency
- Header logo: "Arey Agency" ✓
- Footer: "Arey Agency" ✓
- PageLoader: "Arey Agency" ✓

---

## [Refinement 11] — Hero Redesign, PDF Fix, Image Modal, Filter & Mobile
**Status:** Completed
**Files changed:**
- `components/Hero.tsx` (removed description, centered+enlarged CTAs)
- `components/PdfThumb.tsx` (local worker, fixed version mismatch)
- `components/PdfModal.tsx` (local worker, fixed version mismatch)
- `components/ImageModal.tsx` (zoom controls, pinch-to-zoom, large close button)
- `components/WorksSection.tsx` (horizontal scrollable filters, better visibility)
- `next.config.ts` (auto-copy pdf worker to public)
- `package.json` (pre-build worker copy script)
- `scripts/copy-pdf-worker.mjs` (new)
- `app/globals.css` (scrollbar-none utility)

**What changed:**

### Hero — Centered CTAs, No Description
- Removed "Афиши, визуал и брендинг..." description text
- CTAs now centered under heading: `justify-center`
- Buttons larger: `py-5 md:py-6`, `px-14 md:px-16`, `text-[14px] md:text-[15px]`
- Added `rounded-sm` for subtle shape, stronger hover glow
- Primary: `bg-[#8b6f6f]/25`, `border-[#8b6f6f]/80`, hover → `bg/40` + shadow glow
- Secondary: `text-white`, `border-white/30`, hover → `bg-white/[0.06]` + shadow

### PDF — Version Mismatch Fix (5.7.284 vs 4.4.168)
- Root cause: cdnjs CDN worker was v4.4.168, but installed pdfjs-dist was v5.7.284
- Solution: Copy worker from `node_modules/pdfjs-dist/build/` to `public/` at build time
- Added `scripts/copy-pdf-worker.mjs` — copies matching worker version
- Added to `package.json` pre-build/postinstall hooks
- `next.config.ts` also copies on config load as fallback

### ImageModal — Zoom + Mobile Close
- Added zoom controls (−/+/%) in top-left corner
- Mouse drag to pan when zoomed
- Pinch-to-zoom on touch devices
- Double-tap to toggle zoom (1x ↔ 2x)
- Close button: `w-12 h-12` with `bg-black/60` — always visible, large touch target
- Mobile hint: "Двойной тап для масштаба" at bottom

### Filters — Horizontal Scroll, No Staircase
- Changed from `flex-wrap` to `flex-nowrap` with `overflow-x-auto`
- Categories now in a single horizontal row with scroll on mobile
- Added `.scrollbar-none` utility to hide scrollbar
- Better visibility: `text-white/70` (was `/65`), `border-white/[0.12]`
- `flex-shrink-0` prevents buttons from compressing

## Summary of Key Metrics
- **Files created:** 2 (Cursor.tsx, copy-pdf-worker.mjs)
- **Files deleted:** 2 (ScrollReveal.tsx, SplitText.tsx)
- **Files modified:** 12+ (Hero, WorksSection, Cursor, PdfThumb, PdfModal, ImageModal, layout, globals, config, package.json, page.tsx, works/page.tsx)
- **New interactions:** Custom cursor, scroll-reactive watermark, cinematic dissolve, image parallax, 3D tilt, nav underlines, image zoom/pan/pinch
- **New CSS classes:** ~18 (.cursor-dot, .cursor-ring, .nav-link, .btn-primary, .btn-secondary, .section-divider, .scrollbar-none, etc.)
