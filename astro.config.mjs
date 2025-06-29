import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://kttlsaa.com',
  integrations: [mdx(), sitemap(), react()],

  // The experimental flag has been removed as it's no longer needed in Astro 5
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },

  adapter: vercel()
});