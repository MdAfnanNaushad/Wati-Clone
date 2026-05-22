# Wati 

A pixel-accurate recreation of [wati.io/lp/home](https://www.wati.io/lp/home) built with **pure HTML, CSS, and Vanilla JavaScript** — no frameworks, no build tools.
---

## 🚀 Live Preview

Open `index.html` directly in any browser — no server required.

---

## 📁 Project Structure

```
wati-clone/
│── index.html              # Main HTML (semantic, accessible)
│
├── css/
│   ├── style.css           # Core styles — BEM, CSS custom properties
│   └── responsive.css      # Breakpoint overrides (mobile-first)
│
├── js/
│   └── script.js           # Vanilla JS — interactions & animations
│
├── assets/
│   ├── images/             # (placeholder for local image assets)
│   └── icons/              # (placeholder for SVG icons)
│
└── README.md
```

---

## 🎯 Approach

### HTML
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Accessible attributes: `aria-label`, `aria-expanded`
- Logical section order matching original page

### CSS — BEM Convention
All classes follow **Block__Element--Modifier** strictly:

```
.nav                        → Block
.nav__menu                  → Element
.nav__item--dropdown        → Modifier
.nav__item--dropdown-open   → State modifier
```

CSS Custom Properties are used for the entire design token system:
- Colors: `--color-primary`, `--color-gray-*`
- Spacing: `--space-*`
- Typography: `--font-size-*`
- Shadows, radius, transitions

### JavaScript
- Zero dependencies — pure Vanilla JS
- IIFE pattern to avoid global scope pollution
- IntersectionObserver for scroll-reveal and counter animations
- `requestAnimationFrame` for smooth counter transitions
- Passive scroll listeners for performance

---

## ✨ Features Implemented

| Section | Status |
|---------|--------|
| Announcement bar | ✅ |
| Sticky navigation with dropdowns | ✅ |
| Mobile hamburger menu | ✅ |
| Hero section with tab switcher | ✅ |
| Chat mockup (interactive) | ✅ |
| Auto-cycling hero tabs | ✅ |
| Brand logo marquee | ✅ |
| Features grid | ✅ |
| Stats counter animation | ✅ |
| How it works steps | ✅ |
| Testimonials | ✅ |
| Pricing with monthly/annual toggle | ✅ |
| CTA banner | ✅ |
| Footer with all columns | ✅ |
| Scroll reveal animations | ✅ |
| Active nav link on scroll | ✅ |
| Responsive: Desktop / Tablet / Mobile | ✅ |
| `prefers-reduced-motion` support | ✅ |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `< 1200px` | Large desktops, slight layout adjustments |
| `< 1024px` | Tablets landscape — 2-col features, stacked steps |
| `< 768px`  | Tablets portrait — mobile nav, stacked hero |
| `< 480px`  | Mobile phones — single column, full-width CTAs |

---

## 🏗️ Setup

```bash
# No build step needed — just open the file
open index.html

# Or serve locally with any static server
npx serve .
# OR
python3 -m http.server 8080
```

---

## 📝 Notes

- All images reference original WATI CDN URLs or use CSS/SVG alternatives to avoid missing asset issues
- Font loaded via Google Fonts CDN (Plus Jakarta Sans)
- No jQuery, no lodash, no external CSS frameworks

---

*Submitted by: Md Afnan Naushad | mdafnannaushad@gmail.com | March 2026*
