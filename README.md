# Design Station — Brand Website

> **READ THIS FIRST — you are the next AI (or developer) working on this project.**
> This file is the single source of truth for how the site is built, how to
> change it safely, and what you must never break. Read it fully before editing.

---

## 1. What this is

An editorial, single-page brand website (in Persian/Farsi, right-to-left) for
**Design Station** — the exclusive Iranian distributor of premium European
brands across three categories: **faucets/sanitaryware, ceramics/tile, and
lighting**. The business runs a flagship showroom at **Palladium (Tehran)** and
a holding/re-export entity in **Dubai**.

The site is a marketing/introduction site (not e-commerce). Its goals: present
the brands, tell the showroom story, and drive showroom visits + a meeting-table
booking for architects and interior designers.

- **Live domain:** designstation.net (+ www)
- **GitHub:** `farnush-ab/designstation`, branch **`main`** (production)
- **Hosting:** Vercel (auto-deploys from `main`)

---

## 2. Built with

| Layer | Choice |
|---|---|
| Framework | **Next.js 14** (App Router) + **TypeScript** |
| Styling | **Tailwind CSS** (v3) |
| Animation | **Framer Motion** (v11) |
| Icons | **lucide-react** |
| Language / dir | **Farsi, full RTL** — `<html lang="fa" dir="rtl">` |
| Persian font | **Estedad** (variable, loaded from jsDelivr CDN) |
| Latin font | **Inter** (variable, loaded from rsms.me) |
| Hosting | **Vercel** |

There is **no database, no CMS, and no backend**. All content is hard-coded in
the components. The meeting-table booking form is **front-end only** — it shows
a success state but does not send anything yet (a Resend/email backend is the
intended next step).

---

## 3. How it was built

It was built iteratively, section by section, with the owner reviewing a Vercel
preview after every change. The visual direction is "warm editorial luxury" —
inspired by Gessi / Dornbracht / Roca: generous whitespace, restrained
typography, slow cinematic motion, a cream/sage/walnut palette.

**Brand palette (do not drift from these):**
- Cream `#F5F0E6` — primary background
- Sage `#9A9B78` — accent
- Walnut `#3A2E24` — text / dark sections

Defined as Tailwind tokens in `tailwind.config.ts` (`cream`, `sage`, `walnut`)
and as CSS variables in `app/globals.css`.

---

## 4. Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — ALWAYS run this before pushing
```

Node 18+ recommended. No environment variables are required.

---

## 5. Project structure

```
app/
  layout.tsx        # <html lang="fa" dir="rtl">, metadata/SEO, fonts
  page.tsx          # assembles the homepage sections in order
  globals.css       # design tokens, fonts, .kicker/.kicker-fa, button system
components/
  Navbar.tsx            # fixed nav + animated mobile hamburger drawer
  Hero.tsx              # full-screen video hero (desktop + mobile videos)
  CategoriesSection.tsx # 3 categories: faucets / tiles / lighting
  BrandsList.tsx        # 2x2 editorial grid of 4 featured brands
  InteractiveSection.tsx# "step inside" tile with cursor-follow + 3D tilt
  ShowroomTeaser.tsx    # showroom story + scroll parallax + Tehran/Dubai strip
  MeetingTableSection.tsx # the booking form (front-end only)
  ProjectsSection.tsx   # selected projects, portrait cards
  WhyDesignStation.tsx  # 4 trust principles
  ContactBand.tsx       # dark contact section
  Footer.tsx            # sitemap + social (Instagram only)
  ui/
    Reveal.tsx          # scroll-triggered fade-up (respects reduced motion)
    MagneticButton.tsx  # cursor-magnet button/anchor
    ScrollProgress.tsx  # thin top progress bar
lib/
  images.ts         # CENTRAL image/video registry — edit paths here
public/              # all images + the two hero videos live here
```

The page section order lives in `app/page.tsx`. To reorder/add/remove a
section, edit that file.

> Note: `components/BrandsMarquee.tsx` and `components/FeaturedBrand.tsx` exist
> but are **not imported** by `page.tsx` (earlier versions, kept for reference).
> They are dead code — safe to ignore or delete.

---

## 6. How to change common things

- **Swap an image or video:** put the file in `public/`, then point to it in
  **`lib/images.ts`** (one central file). Every section reads from there.
- **Change copy (text):** text is inline in each component's JSX. Find the
  section in `components/` and edit the Persian string directly.
- **Change the email / socials:** `Footer.tsx`, `ContactBand.tsx`, and the
  mobile drawer in `Navbar.tsx`. Current email: `s.nahvi@designstation.net`.
  Instagram: `instagram.com/designstation.iran`.
- **Change nav links:** the `nav` array near the top of `Navbar.tsx`.
- **Change the featured brands:** the `brands` array in `BrandsList.tsx`.
- **Change colors:** `tailwind.config.ts` (tokens) + the `:root` variables in
  `app/globals.css`. Keep both in sync.
- **Buttons:** use the classes `btn btn-primary` / `btn-outline` /
  `btn-outline-cream` (+ `btn-fa` for Persian labels, `btn-lg` for large). These
  live in `app/globals.css` inside `@layer components`.

---

## 7. Conventions you must follow

- **RTL + Persian typography.** The whole site is RTL. When you add text that
  mixes Persian with Latin brand names, it just works — but keep the
  `overflow-wrap: break-word` and `overflow-x: clip` guards in `globals.css`.
- **`.kicker` vs `.kicker-fa`.** `.kicker` is for **Latin** all-caps labels
  (it adds wide letter-spacing + uppercase). **Never put Persian text in
  `.kicker`** — it renders with ugly gaps. Use **`.kicker-fa`** for Persian
  small labels.
- **Mobile grids.** Never use `grid-cols-12` at the mobile breakpoint. 12
  columns = 11 non-collapsing gaps that overflow a phone (this caused a real
  bug). Use `grid-cols-1` on mobile and `md:grid-cols-12` up.
- **Buttons live in `@layer components`.** This lets Tailwind utilities
  (`hidden`, `w-full`, etc.) override `.btn`. Don't move them out of the layer.
- **Motion respects `prefers-reduced-motion`** — keep that pattern when adding
  animations.
- **Hero videos must be `.mp4` (H.264).** Vercel serves `.mov` as
  `video/quicktime`, which Chrome/Firefox refuse. If a `.mov` is uploaded,
  rename it to `.mp4` (the H.264 inside usually plays fine once the extension
  forces `video/mp4`).

---

## 8. Deployment

- Vercel is connected to **`farnush-ab/designstation`**, production branch
  **`main`**. Any merge to `main` auto-deploys to `designstation.net`.
- Work on a branch, open a PR, merge to `main` → it goes live.
- DNS is on **Cloudflare**. If you ever touch DNS: the records pointing to
  Vercel must be **"DNS only" (grey cloud), NOT proxied (orange cloud)**, or
  Vercel shows "Invalid Configuration".

---

## 9. NEVER TOUCH / be very careful

1. **Don't break RTL.** Never change `<html lang="fa" dir="rtl">` in
   `app/layout.tsx`. The entire layout assumes RTL.
2. **Don't remove the overflow guards** in `globals.css`
   (`html, body { overflow-x: clip }` and the `overflow-wrap` rules). They stop
   horizontal-scroll bugs on mobile.
3. **Don't move the `.btn` system out of `@layer components`.**
4. **Don't put Persian text in `.kicker`** (use `.kicker-fa`).
5. **Don't rename or delete files in `public/`** without updating
   `lib/images.ts` first — the site will 404 the asset.
6. **Don't reintroduce `grid-cols-12` on mobile.**
7. **Don't commit secrets.** There are none today; keep it that way — any future
   email/API key belongs in Vercel environment variables, never in the repo.
8. **Don't force-push or rewrite `main` history.** Use branches + PRs.

---

## 10. Intended next steps (not done yet)

- Wire the meeting-table booking form to a real email backend (**Resend**) so
  submissions actually reach the team.
- Optionally add a lightweight CMS (**Sanity**) so non-developers can edit
  brands/projects/images without code.
- Individual brand pages, a projects gallery, and an About page.
- Re-export the hero videos smaller (the mobile hero video is ~20MB — ideally
  under ~3MB for Iranian mobile connections).

---

*Built with Claude Code. Treat the design as intentional: warm, minimal,
editorial. When in doubt, make it quieter and more spacious, not louder.*
