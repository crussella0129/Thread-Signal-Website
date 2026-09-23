// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://threadandsignal.com",
  trailingSlash: "always",
  compressHTML: true,
  integrations: [sitemap()],
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
