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
  redirects: {
    "/portfolio": "/open-source/",
    "/projects": "/open-source/",
    "/product": "/open-source/",
    "/animus": "/open-source/",
    "/skills": "/services/",
    "/design": "/services/",
    "/blog": "/open-source/",
    "/blog/hello-world": "/contact/",
    "/blog/local-llm-business-workflow": "/services/",
  },
});
