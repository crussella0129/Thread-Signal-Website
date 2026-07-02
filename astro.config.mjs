// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://threadandsignal.com',
  integrations: [sitemap()],
  redirects: {
    '/portfolio': '/projects',
    '/product': '/animus'
  }
});