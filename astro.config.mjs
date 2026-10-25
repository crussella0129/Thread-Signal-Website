// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://threadandsignal.com",
  trailingSlash: "always",
  compressHTML: true,
  integrations: [sitemap()],
  // Without a CSS target the minifier rewrites (max-width: N) as (width<=N),
  // which iOS Safari before 16.4 ignores, dropping every mobile layout rule.
  vite: {
    build: {
      cssTarget: ["chrome111", "edge111", "firefox114", "safari16", "ios16"],
    },
  },
  // Each retired URL points straight at its final page (no chains).
  // scripts/check-site.mjs mirrors this map.
  redirects: {
    "/services": "/contact/",
    "/coming-soon": "/yardulum/",
    "/how-it-works": "/yardulum/",
    "/skills": "/contact/",
    "/design": "/contact/",
    "/blog/local-llm-business-workflow": "/contact/",
    "/portfolio": "/open-source/",
    "/projects": "/open-source/",
    "/product": "/open-source/",
    "/animus": "/open-source/",
    "/blog": "/open-source/",
    "/blog/hello-world": "/contact/",
    "/about": "/contact/",
    "/founders": "/founders-club/",
  },
});
