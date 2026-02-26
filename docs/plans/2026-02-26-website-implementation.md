# Thread & Signal Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a futuristic, geometric-themed Astro website for Thread & Signal tech consultancy with an interactive Three.js hero, service cards, portfolio, product page, blog, and contact form.

**Architecture:** Astro static site with React islands for Three.js interactivity. Content Collections for the blog. CSS custom properties for theming. Formspree for contact form. Output deployed as static files to Namecheap cPanel.

**Tech Stack:** Astro 5.x, React 19, Three.js, @react-three/fiber, Formspree, Google Fonts

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

**Step 1: Initialize Astro project**

Run from the repo root (`C:/Users/charl/Thread-Signal-Website`):

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

Use `--no-git` because the repo already has git initialized.

**Step 2: Add React integration and Three.js dependencies**

```bash
npx astro add react -y
npm install three @react-three/fiber @types/three
```

**Step 3: Verify astro.config.mjs has React integration**

Ensure `astro.config.mjs` looks like:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

**Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server starts on `http://localhost:4321`

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with React and Three.js"
```

---

### Task 2: Global Styles, Fonts, and CSS Variables

**Files:**
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`

**Step 1: Create the global stylesheet**

Create `src/styles/global.css`:

```css
/* ── Fonts ──────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap');

/* ── CSS Variables ──────────────────────────── */
:root {
  --bg: #0a0e1a;
  --bg-surface: #121829;
  --accent: #00d4ff;
  --accent-glow: rgba(0, 212, 255, 0.15);
  --accent-warm: #f0a030;
  --accent-warm-glow: rgba(240, 160, 48, 0.15);
  --text: #e8ecf0;
  --text-muted: #6b7a8d;
  --border: rgba(255, 255, 255, 0.06);

  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --max-width: 1200px;
  --nav-height: 72px;
  --radius: 12px;
  --transition: 0.25s ease;
}

/* ── Reset ──────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition);
}

a:hover {
  color: var(--accent-warm);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
h3 { font-size: clamp(1.125rem, 2vw, 1.5rem); }

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-surface);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}

img {
  max-width: 100%;
  display: block;
}

/* ── Utility Classes ────────────────────────── */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: 5rem 0;
}

.section-title {
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.125rem;
  margin-bottom: 3rem;
  max-width: 600px;
}

/* ── Geometric Divider ──────────────────────── */
.geo-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent) 20%,
    var(--accent) 50%,
    var(--accent-warm) 80%,
    transparent 100%
  );
  opacity: 0.3;
  margin: 0;
}

/* ── Button Styles ──────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition);
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg);
}

.btn-primary:hover {
  background: #33dfff;
  box-shadow: 0 0 24px var(--accent-glow);
  color: var(--bg);
}

.btn-outline {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}

.btn-outline:hover {
  background: var(--accent-glow);
  box-shadow: 0 0 24px var(--accent-glow);
  color: var(--accent);
}

/* ── Card Base ──────────────────────────────── */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  transition: all var(--transition);
}

.card:hover {
  border-color: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 30px var(--accent-glow);
}
```

**Step 2: Create a simple geometric favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0a0e1a"/>
  <path d="M8 24 L16 6 L24 24 Z" fill="none" stroke="#00d4ff" stroke-width="2"/>
  <circle cx="16" cy="12" r="2" fill="#f0a030"/>
</svg>
```

**Step 3: Verify**

The stylesheet will be imported in the layout (Task 3). No visual check needed yet.

**Step 4: Commit**

```bash
git add src/styles/global.css public/favicon.svg
git commit -m "feat: add global styles, CSS variables, fonts, and favicon"
```

---

### Task 3: Base Layout, Navigation, and Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Nav component**

Create `src/components/Nav.astro`:

```astro
---
const currentPath = Astro.url.pathname;

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/product', label: 'Product' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];
---

<nav class="nav">
  <div class="container nav-inner">
    <a href="/" class="nav-logo">
      <span class="logo-thread">Thread</span>
      <span class="logo-amp">&</span>
      <span class="logo-signal">Signal</span>
    </a>

    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="hamburger"></span>
    </button>

    <ul class="nav-links">
      {links.map(link => (
        <li>
          <a
            href={link.href}
            class:list={['nav-link', { active: currentPath === link.href }]}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    background: rgba(10, 14, 26, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .nav-logo {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    display: flex;
    gap: 0.35rem;
    color: var(--text);
  }

  .nav-logo:hover { color: var(--text); }

  .logo-thread { color: var(--accent); }
  .logo-amp { color: var(--text-muted); }
  .logo-signal { color: var(--accent-warm); }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: var(--text-muted);
    font-size: 0.9rem;
    font-weight: 500;
    transition: all var(--transition);
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--text);
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-link.active {
    color: var(--accent);
  }

  .nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger,
  .hamburger::before,
  .hamburger::after {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text);
    transition: all var(--transition);
  }

  .hamburger {
    position: relative;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    left: 0;
  }

  .hamburger::before { top: -7px; }
  .hamburger::after { top: 7px; }

  @media (max-width: 768px) {
    .nav-toggle {
      display: block;
    }

    .nav-links {
      position: fixed;
      top: var(--nav-height);
      left: 0;
      right: 0;
      bottom: 0;
      flex-direction: column;
      background: var(--bg);
      padding: 2rem 1.5rem;
      gap: 0.5rem;
      transform: translateX(100%);
      transition: transform var(--transition);
    }

    .nav-links.open {
      transform: translateX(0);
    }

    .nav-link {
      font-size: 1.1rem;
      padding: 0.75rem 1rem;
    }
  }
</style>

<script>
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links?.classList.toggle('open');
  });
</script>
```

**Step 2: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---

<footer class="footer">
  <div class="geo-divider"></div>
  <div class="container footer-inner">
    <div class="footer-brand">
      <span class="footer-logo">
        <span style="color: var(--accent)">Thread</span>
        <span style="color: var(--text-muted)">&</span>
        <span style="color: var(--accent-warm)">Signal</span>
      </span>
      <p class="footer-tagline">Building the future, one thread at a time.</p>
    </div>

    <nav class="footer-nav">
      <div class="footer-col">
        <h4>Navigate</h4>
        <a href="/services">Services</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/product">Product</a>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="https://github.com/crussella0129" target="_blank" rel="noopener">GitHub</a>
      </div>
    </nav>

    <p class="footer-copy">&copy; {year} Thread & Signal. All rights reserved.</p>
  </div>
</footer>

<style>
  .footer {
    padding-top: 0;
  }

  .footer-inner {
    padding: 3rem 1.5rem 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: start;
  }

  .footer-brand {
    grid-column: 1;
  }

  .footer-logo {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 700;
  }

  .footer-tagline {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .footer-nav {
    display: flex;
    gap: 3rem;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-col h4 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.25rem;
  }

  .footer-col a {
    color: var(--text);
    font-size: 0.9rem;
  }

  .footer-col a:hover {
    color: var(--accent);
  }

  .footer-copy {
    grid-column: 1 / -1;
    color: var(--text-muted);
    font-size: 0.8rem;
    text-align: center;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .footer-inner {
      grid-template-columns: 1fr;
    }

    .footer-nav {
      gap: 2rem;
    }
  }
</style>
```

**Step 3: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Thread & Signal — Software consultancy specializing in applications, games, CAD, and AI solutions.' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | Thread & Signal</title>
  </head>
  <body>
    <Nav />
    <main style={`padding-top: var(--nav-height);`}>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 4: Update index.astro to use layout**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <section class="section container" style="text-align: center; min-height: 60vh; display: flex; align-items: center; justify-content: center;">
    <div>
      <h1>Thread & Signal</h1>
      <p style="color: var(--text-muted); margin-top: 1rem; font-size: 1.25rem;">
        Site coming together — layout scaffolding complete.
      </p>
    </div>
  </section>
</BaseLayout>
```

**Step 5: Verify**

```bash
npm run dev
```

Open `http://localhost:4321`. You should see the nav bar, centered heading, and footer. Test the mobile hamburger menu by resizing the browser.

**Step 6: Commit**

```bash
git add src/layouts/ src/components/Nav.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add base layout, navigation, and footer"
```

---

### Task 4: Three.js Hero Component

**Files:**
- Create: `src/components/HeroCanvas.tsx`
- Create: `src/components/Hero.astro`

**Step 1: Create the Three.js React component**

Create `src/components/HeroCanvas.tsx`:

```tsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WireframeGeometry() {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create icosahedron edges
  const { edgePositions, particlePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.5, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const edgePos = edges.getAttribute('position');

    // Create particles at each vertex of the icosahedron
    const vertices = geo.getAttribute('position');
    const particlePos = new Float32Array(vertices.count * 3);
    for (let i = 0; i < vertices.count; i++) {
      particlePos[i * 3] = vertices.getX(i);
      particlePos[i * 3 + 1] = vertices.getY(i);
      particlePos[i * 3 + 2] = vertices.getZ(i);
    }

    geo.dispose();

    return { edgePositions: edgePos, particlePositions: particlePos };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.12;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Wireframe edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions.array as Float32Array, 3]}
            count={edgePositions.count}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </lineSegments>

      {/* Vertex particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial color="#f0a030" size={0.08} sizeAttenuation />
      </points>

      {/* Inner glow sphere */}
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.03} wireframe />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <WireframeGeometry />
      </Canvas>
    </div>
  );
}
```

**Step 2: Create Hero wrapper**

Create `src/components/Hero.astro`:

```astro
---
import HeroCanvas from './HeroCanvas';
---

<section class="hero">
  <HeroCanvas client:only="react" />

  <div class="container hero-content">
    <p class="hero-tag">Software Consultancy</p>
    <h1 class="hero-title">
      We weave the <span class="highlight-thread">threads</span><br />
      that carry your <span class="highlight-signal">signal</span>.
    </h1>
    <p class="hero-sub">
      Applications. Games. CAD. AI. From concept to deployment,
      Thread & Signal builds what others can't.
    </p>
    <div class="hero-cta">
      <a href="/contact" class="btn btn-primary">Start a Conversation</a>
      <a href="/portfolio" class="btn btn-outline">See Our Work</a>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }

  .hero-tag {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .hero-title {
    margin-bottom: 1.5rem;
  }

  .highlight-thread {
    color: var(--accent);
  }

  .highlight-signal {
    color: var(--accent-warm);
  }

  .hero-sub {
    color: var(--text-muted);
    font-size: 1.15rem;
    max-width: 540px;
    margin-bottom: 2.5rem;
    line-height: 1.7;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 80vh;
    }

    .hero-content {
      text-align: center;
      max-width: 100%;
    }

    .hero-sub {
      max-width: 100%;
    }

    .hero-cta {
      justify-content: center;
    }
  }
</style>
```

**Step 3: Verify**

```bash
npm run dev
```

Open `http://localhost:4321`. You should see the rotating wireframe icosahedron behind the hero text.

**Step 4: Commit**

```bash
git add src/components/HeroCanvas.tsx src/components/Hero.astro
git commit -m "feat: add Three.js wireframe hero animation"
```

---

### Task 5: Home Page (Full)

**Files:**
- Create: `src/components/ServiceCard.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create ServiceCard component**

Create `src/components/ServiceCard.astro`:

```astro
---
interface Props {
  icon: string;
  title: string;
  description: string;
}

const { icon, title, description } = Astro.props;
---

<div class="card service-card">
  <span class="service-icon">{icon}</span>
  <h3 class="service-title">{title}</h3>
  <p class="service-desc">{description}</p>
</div>

<style>
  .service-card {
    text-align: center;
  }

  .service-icon {
    display: block;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .service-title {
    margin-bottom: 0.75rem;
    color: var(--text);
  }

  .service-desc {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }
</style>
```

**Step 2: Build out the full home page**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ServiceCard from '../components/ServiceCard.astro';
---

<BaseLayout title="Home">
  <Hero />

  <div class="geo-divider"></div>

  <!-- Services Preview -->
  <section class="section container">
    <h2 class="section-title">What We Build</h2>
    <p class="section-subtitle">
      From embedded geometry kernels to full-stack web apps — we tackle the problems others walk away from.
    </p>

    <div class="services-grid">
      <ServiceCard
        icon="{ }"
        title="Software Development"
        description="Full-stack applications, APIs, and systems built with precision and care."
      />
      <ServiceCard
        icon="&#9650;"
        title="CAD & Geometry"
        description="CAD software development, geometry kernels, and professional CAD training."
      />
      <ServiceCard
        icon="&#9881;"
        title="Game Development"
        description="From concept to release — game engines, mechanics, and interactive experiences."
      />
      <ServiceCard
        icon="&#9733;"
        title="AI & ML Solutions"
        description="Intelligent agents, ML pipelines, and LLM integrations for real-world problems."
      />
      <ServiceCard
        icon="&#8644;"
        title="Technical Consulting"
        description="Architecture reviews, code audits, and strategic technical guidance."
      />
    </div>

    <div style="text-align: center; margin-top: 3rem;">
      <a href="/services" class="btn btn-outline">View All Services</a>
    </div>
  </section>

  <div class="geo-divider"></div>

  <!-- CTA Section -->
  <section class="section container" style="text-align: center;">
    <h2 class="section-title">Ready to Build Something?</h2>
    <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
      Whether you need a full product, a consulting session, or CAD training — let's talk.
    </p>
    <a href="/contact" class="btn btn-primary">Get In Touch</a>
  </section>
</BaseLayout>

<style>
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
</style>
```

**Step 3: Verify**

```bash
npm run dev
```

Open `http://localhost:4321`. Full home page: hero animation, services grid, CTA section, footer.

**Step 4: Commit**

```bash
git add src/components/ServiceCard.astro src/pages/index.astro
git commit -m "feat: complete home page with hero, services grid, and CTA"
```

---

### Task 6: Services Page

**Files:**
- Create: `src/pages/services.astro`

**Step 1: Create the services page**

Create `src/pages/services.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Services" description="Software development, CAD, games, AI, and consulting services from Thread & Signal.">
  <section class="section container">
    <h1 class="section-title">Services</h1>
    <p class="section-subtitle">
      Deep technical expertise across multiple domains. Here's how we can help.
    </p>

    <div class="service-list">
      <div class="card service-detail">
        <div class="service-header">
          <span class="service-icon">{ }</span>
          <h2>Software Development</h2>
        </div>
        <p>
          Full-stack application development from architecture to deployment. We build web apps,
          desktop applications, APIs, and backend systems. Clean code, tested thoroughly, built to last.
        </p>
        <div class="service-tags">
          <span class="tag">Python</span>
          <span class="tag">TypeScript</span>
          <span class="tag">React</span>
          <span class="tag">Node.js</span>
          <span class="tag">REST APIs</span>
        </div>
      </div>

      <div class="card service-detail">
        <div class="service-header">
          <span class="service-icon">&#9650;</span>
          <h2>CAD & Geometry</h2>
        </div>
        <p>
          Custom CAD software development, geometry kernel engineering, and professional CAD training.
          Whether you need help with a CAD workflow, want to learn the tools, or need a custom solution built
          from scratch — we've got you.
        </p>
        <div class="service-tags">
          <span class="tag">CAD Development</span>
          <span class="tag">Geometry Kernels</span>
          <span class="tag">CAD Lessons</span>
          <span class="tag">3D Modeling</span>
        </div>
      </div>

      <div class="card service-detail">
        <div class="service-header">
          <span class="service-icon">&#9881;</span>
          <h2>Game Development</h2>
        </div>
        <p>
          End-to-end game development — from initial concept and game design to engine work,
          mechanics programming, and release. We build interactive experiences that people want to play.
        </p>
        <div class="service-tags">
          <span class="tag">Game Engines</span>
          <span class="tag">Mechanics Design</span>
          <span class="tag">Interactive Experiences</span>
        </div>
      </div>

      <div class="card service-detail">
        <div class="service-header">
          <span class="service-icon">&#9733;</span>
          <h2>AI & Machine Learning</h2>
        </div>
        <p>
          Practical AI solutions — intelligent agents, ML pipelines, LLM integrations, and data-driven
          systems. We focus on AI that solves real problems, not buzzword-driven vaporware.
        </p>
        <div class="service-tags">
          <span class="tag">LLM Agents</span>
          <span class="tag">ML Pipelines</span>
          <span class="tag">Data Science</span>
          <span class="tag">AI Integration</span>
        </div>
      </div>

      <div class="card service-detail">
        <div class="service-header">
          <span class="service-icon">&#8644;</span>
          <h2>Technical Consulting</h2>
        </div>
        <p>
          Architecture reviews, code audits, technical strategy, and mentoring. Whether you need a
          second opinion on your stack, help navigating a complex migration, or guidance on best
          practices — we bring clarity.
        </p>
        <div class="service-tags">
          <span class="tag">Architecture Review</span>
          <span class="tag">Code Audit</span>
          <span class="tag">Strategy</span>
          <span class="tag">Mentoring</span>
        </div>
      </div>
    </div>
  </section>

  <div class="geo-divider"></div>

  <section class="section container" style="text-align: center;">
    <h2>Interested?</h2>
    <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
      Every project starts with a conversation. Tell us what you're building.
    </p>
    <a href="/contact" class="btn btn-primary">Start a Conversation</a>
  </section>
</BaseLayout>

<style>
  .service-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .service-detail p {
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .service-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .service-icon {
    font-size: 1.5rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: var(--accent-glow);
    flex-shrink: 0;
  }

  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.3rem 0.75rem;
    border-radius: 99px;
    background: rgba(0, 212, 255, 0.08);
    color: var(--accent);
    border: 1px solid rgba(0, 212, 255, 0.15);
  }
</style>
```

**Step 2: Verify**

```bash
npm run dev
```

Navigate to `http://localhost:4321/services`. Five service cards with tags and CTA.

**Step 3: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: add services page with detailed service cards"
```

---

### Task 7: Portfolio Page

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/pages/portfolio.astro`

**Step 1: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  tags: string[];
  category: string;
  link?: string;
}

const { title, description, tags, category, link } = Astro.props;
---

<div class="card project-card" data-category={category}>
  <div class="project-placeholder">
    <span class="placeholder-icon">&#9670;</span>
  </div>
  <div class="project-body">
    <span class="project-category">{category}</span>
    <h3 class="project-title">
      {link ? <a href={link} target="_blank" rel="noopener">{title}</a> : title}
    </h3>
    <p class="project-desc">{description}</p>
    <div class="project-tags">
      {tags.map(tag => <span class="tag">{tag}</span>)}
    </div>
  </div>
</div>

<style>
  .project-card {
    overflow: hidden;
    padding: 0;
  }

  .project-placeholder {
    height: 180px;
    background: linear-gradient(135deg, var(--bg-surface) 0%, rgba(0, 212, 255, 0.05) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border);
  }

  .placeholder-icon {
    font-size: 3rem;
    color: var(--accent);
    opacity: 0.3;
  }

  .project-body {
    padding: 1.5rem;
  }

  .project-category {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-warm);
  }

  .project-title {
    margin: 0.5rem 0 0.75rem;
  }

  .project-title a {
    color: var(--text);
  }

  .project-title a:hover {
    color: var(--accent);
  }

  .project-desc {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    border-radius: 99px;
    background: rgba(0, 212, 255, 0.08);
    color: var(--accent);
    border: 1px solid rgba(0, 212, 255, 0.15);
  }
</style>
```

**Step 2: Create the portfolio page**

Create `src/pages/portfolio.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
---

<BaseLayout title="Portfolio" description="Selected projects from Thread & Signal — software, games, CAD, and AI.">
  <section class="section container">
    <h1 class="section-title">Portfolio</h1>
    <p class="section-subtitle">
      Selected work across software, CAD, games, and AI. Real solutions for real problems.
    </p>

    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="software">Software</button>
      <button class="filter-btn" data-filter="cad">CAD</button>
      <button class="filter-btn" data-filter="game">Games</button>
      <button class="filter-btn" data-filter="ai">AI / ML</button>
    </div>

    <div class="projects-grid">
      <ProjectCard
        title="Animus"
        description="A local-first LLM agent with plan-then-execute architecture and multi-strategy retrieval. Built for privacy-conscious AI workflows."
        tags={["Python", "LLM", "Agents", "RAG"]}
        category="ai"
        link="https://github.com/crussella0129/Animus"
      />
      <ProjectCard
        title="Geometry Kernel"
        description="A custom geometry kernel powering the next generation of CAD software. Precision-engineered from the ground up."
        tags={["C++", "Geometry", "CAD", "Math"]}
        category="cad"
      />
      <ProjectCard
        title="CAD Application"
        description="A modern CAD application built on top of our custom geometry kernel. Rethinking what design software can be."
        tags={["CAD", "3D", "Desktop", "UI/UX"]}
        category="cad"
      />
      <ProjectCard
        title="Client Project"
        description="Full-stack web application built for a client. Placeholder — replace with a real case study."
        tags={["React", "Node.js", "PostgreSQL"]}
        category="software"
      />
      <ProjectCard
        title="Game Project"
        description="Interactive game experience. Placeholder — replace with a real project."
        tags={["Game Engine", "C++", "Graphics"]}
        category="game"
      />
    </div>
  </section>
</BaseLayout>

<style>
  .filter-bar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.5rem 1.25rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--transition);
  }

  .filter-btn:hover,
  .filter-btn.active {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-glow);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
</style>

<script>
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const el = card as HTMLElement;
        if (filter === 'all' || el.dataset.category === filter) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    });
  });
</script>
```

**Step 3: Verify**

```bash
npm run dev
```

Navigate to `http://localhost:4321/portfolio`. Filter buttons should show/hide cards by category.

**Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/pages/portfolio.astro
git commit -m "feat: add portfolio page with filterable project cards"
```

---

### Task 8: Product Page

**Files:**
- Create: `src/pages/product.astro`

**Step 1: Create the product page**

Create `src/pages/product.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Product" description="Thread & Signal's CAD software and geometry kernel — precision-engineered design tools.">
  <!-- Product Hero -->
  <section class="product-hero section container">
    <div class="product-hero-content">
      <span class="product-badge">In Development</span>
      <h1>The Geometry Kernel <br />& CAD Platform</h1>
      <p class="product-lead">
        We're building a CAD platform from the ground up — starting with our own geometry kernel.
        Precision-engineered for the next generation of design software.
      </p>
      <div class="hero-cta">
        <a href="/contact" class="btn btn-primary">Get Early Access</a>
        <a href="#features" class="btn btn-outline">Learn More</a>
      </div>
    </div>
    <div class="product-visual">
      <div class="kernel-viz">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,20 180,70 180,140 100,190 20,140 20,70"
            fill="none" stroke="#00d4ff" stroke-width="1" opacity="0.4"/>
          <polygon points="100,45 155,75 155,135 100,165 45,135 45,75"
            fill="none" stroke="#00d4ff" stroke-width="1" opacity="0.6"/>
          <polygon points="100,70 130,85 130,125 100,140 70,125 70,85"
            fill="none" stroke="#f0a030" stroke-width="1.5" opacity="0.8"/>
          <circle cx="100" cy="100" r="4" fill="#f0a030"/>
        </svg>
      </div>
    </div>
  </section>

  <div class="geo-divider"></div>

  <!-- Features -->
  <section id="features" class="section container">
    <h2 class="section-title">Built Different</h2>
    <p class="section-subtitle">
      Not a wrapper around someone else's kernel. Built from first principles.
    </p>

    <div class="features-grid">
      <div class="card feature">
        <h3>Custom Geometry Kernel</h3>
        <p>
          Our own kernel — not a thin layer over Open CASCADE or CGAL. Full control over
          the mathematical foundations of the platform.
        </p>
      </div>
      <div class="card feature">
        <h3>Precision First</h3>
        <p>
          Exact arithmetic where it matters, robust floating-point where it doesn't.
          No tolerance hacks, no silent geometry failures.
        </p>
      </div>
      <div class="card feature">
        <h3>Modern Architecture</h3>
        <p>
          Clean APIs, modular design, built for extensibility. The kind of CAD platform
          developers actually want to build on.
        </p>
      </div>
      <div class="card feature">
        <h3>Developer-Friendly</h3>
        <p>
          Scriptable, automatable, and designed for power users. Because CAD shouldn't
          mean clicking through 47 dialogs.
        </p>
      </div>
    </div>
  </section>

  <div class="geo-divider"></div>

  <!-- CTA -->
  <section class="section container" style="text-align: center;">
    <h2>Want Early Access?</h2>
    <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
      The kernel and platform are under active development. Reach out to learn more or get on the early access list.
    </p>
    <a href="/contact" class="btn btn-primary">Get In Touch</a>
  </section>
</BaseLayout>

<style>
  .product-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    min-height: 60vh;
  }

  .product-badge {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.35rem 0.9rem;
    border-radius: 99px;
    background: var(--accent-warm-glow);
    color: var(--accent-warm);
    border: 1px solid rgba(240, 160, 48, 0.3);
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  .product-lead {
    color: var(--text-muted);
    font-size: 1.1rem;
    line-height: 1.7;
    margin: 1.5rem 0 2rem;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .product-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .kernel-viz {
    width: 280px;
    height: 280px;
    animation: float 6s ease-in-out infinite;
  }

  .kernel-viz svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.2));
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .feature h3 {
    margin-bottom: 0.75rem;
    color: var(--accent);
    font-size: 1.1rem;
  }

  .feature p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .product-hero {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero-cta {
      justify-content: center;
    }

    .kernel-viz {
      width: 200px;
      height: 200px;
    }
  }
</style>
```

**Step 2: Verify**

```bash
npm run dev
```

Navigate to `http://localhost:4321/product`. Product hero with SVG visualization, features grid, CTA.

**Step 3: Commit**

```bash
git add src/pages/product.astro
git commit -m "feat: add product page for CAD software and geometry kernel"
```

---

### Task 9: Blog (Content Collections)

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.md`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

**Step 1: Define the blog content collection**

Create `src/content.config.ts`:

```ts
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

**Step 2: Create an example blog post**

Create `src/content/blog/hello-world.md`:

```markdown
---
title: "Hello, World"
description: "The first post on the Thread & Signal blog — who we are and what we're building."
pubDate: 2026-02-26
tags: ["announcement", "meta"]
---

Welcome to the Thread & Signal blog. This is where we'll share technical deep-dives, project updates, and lessons learned from building software, games, CAD tools, and AI systems.

## What We're Working On

Right now, our main focus is a **custom geometry kernel and CAD platform** — built from first principles, not wrapped around an existing kernel. We'll be documenting the journey here.

## What to Expect

- Technical articles on geometry, graphics, and computational design
- AI and agent development insights
- Game development notes
- General software engineering perspectives

Stay tuned. We're just getting started.
```

**Step 3: Create the blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
);

function readingTime(body: string): string {
  const words = body.split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}
---

<BaseLayout title="Blog" description="Technical articles from Thread & Signal — software, CAD, AI, and games.">
  <section class="section container">
    <h1 class="section-title">Blog</h1>
    <p class="section-subtitle">
      Technical deep-dives, project updates, and lessons learned.
    </p>

    <div class="post-list">
      {posts.map(post => (
        <a href={`/blog/${post.id}`} class="card post-card">
          <div class="post-meta">
            <time datetime={post.data.pubDate.toISOString()}>
              {post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span class="post-reading-time">{readingTime(post.body ?? '')}</span>
          </div>
          <h2 class="post-title">{post.data.title}</h2>
          <p class="post-desc">{post.data.description}</p>
          <div class="post-tags">
            {post.data.tags.map(tag => <span class="tag">{tag}</span>)}
          </div>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>

<style>
  .post-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-card {
    display: block;
    color: var(--text);
  }

  .post-card:hover {
    color: var(--text);
  }

  .post-meta {
    display: flex;
    gap: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }

  .post-title {
    margin-bottom: 0.5rem;
  }

  .post-card:hover .post-title {
    color: var(--accent);
  }

  .post-desc {
    color: var(--text-muted);
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .post-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    border-radius: 99px;
    background: rgba(0, 212, 255, 0.08);
    color: var(--accent);
    border: 1px solid rgba(0, 212, 255, 0.15);
  }
</style>
```

**Step 4: Create the blog post template**

Create `src/pages/blog/[slug].astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="section container blog-post">
    <header class="post-header">
      <div class="post-meta">
        <time datetime={post.data.pubDate.toISOString()}>
          {post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </div>
      <h1>{post.data.title}</h1>
      <p class="post-description">{post.data.description}</p>
      <div class="post-tags">
        {post.data.tags.map(tag => <span class="tag">{tag}</span>)}
      </div>
    </header>

    <div class="geo-divider" style="margin: 2rem 0;"></div>

    <div class="prose">
      <Content />
    </div>

    <div class="geo-divider" style="margin: 3rem 0 2rem;"></div>

    <a href="/blog" class="back-link">&larr; Back to all posts</a>
  </article>
</BaseLayout>

<style>
  .blog-post {
    max-width: 740px;
  }

  .post-header {
    margin-bottom: 0;
  }

  .post-meta {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .post-description {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin: 1rem 0 1.25rem;
  }

  .post-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    border-radius: 99px;
    background: rgba(0, 212, 255, 0.08);
    color: var(--accent);
    border: 1px solid rgba(0, 212, 255, 0.15);
  }

  /* Prose styles for rendered Markdown */
  .prose {
    line-height: 1.8;
  }

  .prose :global(h2) {
    margin: 2.5rem 0 1rem;
    color: var(--accent);
  }

  .prose :global(h3) {
    margin: 2rem 0 0.75rem;
  }

  .prose :global(p) {
    margin-bottom: 1.25rem;
    color: var(--text);
  }

  .prose :global(ul), .prose :global(ol) {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }

  .prose :global(li) {
    margin-bottom: 0.5rem;
  }

  .prose :global(pre) {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }

  .prose :global(code) {
    font-family: var(--font-mono);
  }

  .prose :global(blockquote) {
    border-left: 3px solid var(--accent);
    padding-left: 1.25rem;
    margin: 1.5rem 0;
    color: var(--text-muted);
    font-style: italic;
  }

  .prose :global(strong) {
    color: var(--text);
    font-weight: 600;
  }

  .back-link {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .back-link:hover {
    color: var(--accent);
  }
</style>
```

**Step 5: Verify**

```bash
npm run dev
```

Navigate to `http://localhost:4321/blog`. You should see the hello-world post. Click it to see the full post rendered.

**Step 6: Commit**

```bash
git add src/content.config.ts src/content/blog/ src/pages/blog/
git commit -m "feat: add blog with Astro content collections and Markdown support"
```

---

### Task 10: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

**Step 1: Create the contact page**

Note: Replace `YOUR_FORMSPREE_ID` with the actual Formspree form ID once created at https://formspree.io. For now we'll use a placeholder that shows the form structure.

Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Contact" description="Get in touch with Thread & Signal for software, CAD, AI, and consulting services.">
  <section class="section container contact-page">
    <div class="contact-content">
      <h1 class="section-title">Let's Talk</h1>
      <p class="section-subtitle">
        Have a project in mind? Need consulting? Want CAD lessons?
        Drop us a line and we'll get back to you.
      </p>

      <div class="contact-info">
        <div class="contact-item">
          <h3>Email</h3>
          <a href="mailto:hello@threadandsignal.com">hello@threadandsignal.com</a>
        </div>
        <div class="contact-item">
          <h3>GitHub</h3>
          <a href="https://github.com/crussella0129" target="_blank" rel="noopener">github.com/crussella0129</a>
        </div>
      </div>
    </div>

    <form class="card contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required placeholder="Your name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="you@example.com" />
      </div>
      <div class="form-group">
        <label for="subject">What are you looking for?</label>
        <select id="subject" name="subject" required>
          <option value="" disabled selected>Select a service</option>
          <option value="software">Software Development</option>
          <option value="cad">CAD Development / Lessons</option>
          <option value="games">Game Development</option>
          <option value="ai">AI / ML Solutions</option>
          <option value="consulting">Technical Consulting</option>
          <option value="other">Something Else</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required placeholder="Tell us about your project..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
    </form>
  </section>
</BaseLayout>

<style>
  .contact-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .contact-info {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-item h3 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.35rem;
  }

  .contact-item a {
    font-size: 1rem;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.95rem;
    transition: border-color var(--transition);
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .form-group select {
    cursor: pointer;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--text-muted);
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .contact-page {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
```

**Step 2: Verify**

```bash
npm run dev
```

Navigate to `http://localhost:4321/contact`. Two-column layout with info + form. Form won't submit until Formspree ID is added (your step later).

**Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add contact page with Formspree form"
```

---

### Task 11: Final Build Verification and Push

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes successfully, output in `dist/`.

**Step 2: Preview the production build**

```bash
npm run preview
```

Open `http://localhost:4321` and click through every page to verify:
- Home: hero animation, services grid, CTA
- Services: all five service cards with tags
- Portfolio: filter buttons work
- Product: hero, features, CTA
- Blog: post listing, click through to post
- Contact: form renders correctly
- Navigation: all links work, mobile hamburger works

**Step 3: Commit any fixes if needed**

**Step 4: Push to GitHub**

```bash
git push origin main
```

---

### User Checklist (Your Steps After Build)

After the site is built and pushed:

1. **Formspree:** Create a free account at https://formspree.io, create a form, replace `YOUR_FORMSPREE_ID` in `contact.astro`
2. **Namecheap Hosting:**
   - Log into your Namecheap cPanel
   - Upload contents of `dist/` to `public_html/`
   - Verify the domain DNS points to your hosting
3. **Content:** Replace placeholder portfolio projects and blog posts with real content
4. **Logo:** When you have a logo, add it to `src/assets/` and update the Nav component
5. **Email:** Set up `hello@threadandsignal.com` or update the contact page with your preferred email
