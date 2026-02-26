# Thread & Signal Website Design

**Date:** 2026-02-26
**Status:** Approved
**Stack:** Astro + Three.js + Formspree
**Hosting:** Namecheap (static file upload to cPanel)

## Business Context

Thread & Signal is a software/tech consultancy run by a versatile technical generalist. Services include software development, game development, CAD development & lessons, technical consulting, and AI/ML solutions. Currently developing a CAD software and geometry kernel product.

The name originates from a premium headphone cable venture, but maps beautifully to computing (threads + signals) and a broader metaphor (connection + clarity).

## Site Purpose

- Attract potential clients for consulting and development work
- Showcase portfolio of past projects
- Present the CAD software/geometry kernel product
- Host technical writing and tutorials
- Establish credibility and thought leadership

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Animated geometric hero, tagline, service highlights, CTA |
| Services | `/services` | Service cards: Software, Games, CAD, Consulting, AI/ML |
| Portfolio | `/portfolio` | Filterable project cards with images and tech details |
| Product | `/product` | CAD software hero, features, technical details, waitlist CTA |
| Blog | `/blog` | Markdown-powered posts with tags and reading time |
| Contact | `/contact` | Formspree form, email, social links |

## Visual Design

### Color Palette

| Role | Value |
|------|-------|
| Background | `#0a0e1a` (deep navy/near-black) |
| Primary accent | `#00d4ff` (electric cyan) |
| Secondary accent | `#f0a030` (warm amber) |
| Text | `#e8ecf0` (off-white) |
| Muted text | `#6b7a8d` (slate gray) |
| Surface | `#121829` (dark slate) |

### Typography

- Headings: Space Grotesk (geometric sans-serif)
- Body: Inter
- Code/accents: JetBrains Mono

### Visual Motifs

- **Hero:** Three.js wireframe mesh with glowing cyan edges and traveling particles
- **Section dividers:** SVG geometric line patterns (nodes + edges)
- **Cards:** Dark glassmorphism with border glow on hover
- **Responsive:** Mobile-first, Three.js falls back to static SVG on low-power devices

## Technical Architecture

### Project Structure

```
Thread-Signal-Website/
├── src/
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── HeroCanvas.tsx (Three.js React island)
│   │   ├── ServiceCard.astro
│   │   ├── ProjectCard.astro
│   │   └── ContactForm.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   ├── product.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── content/blog/ (Markdown posts)
│   ├── styles/global.css
│   └── assets/
├── public/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Key Decisions

- Three.js hero as React island (`client:load`) — zero JS shipped elsewhere
- Astro Content Collections for type-safe Markdown blog
- Formspree for contact form (no backend)
- CSS variables for color system (no Tailwind)
- Google Fonts for Inter, Space Grotesk, JetBrains Mono

## Deployment

1. `npm run build` outputs to `dist/`
2. Upload `dist/` contents to Namecheap `public_html/` via cPanel or FTP
3. Domain DNS points to Namecheap hosting
