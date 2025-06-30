// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://kttlsaa.com',
  integrations: [
    mdx(),
    sitemap({
      // Generate sitemap with better SEO
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom filter to exclude certain pages
      filter: (page) => !page.includes('/draft/') && !page.includes('/private/'),
      // Customize URLs for your digital garden
      customPages: [
        'https://kttlsaa.com/about',
        'https://kttlsaa.com/garden',
      ],
    }),
    react()
  ],

  // The experimental flag has been removed as it's no longer needed in Astro 5
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },

  adapter: vercel(),
  
  vite: {
    // Optimize images for better SEO
    build: {
      assetsInlineLimit: 0 // Ensures images are properly handled for SEO
    }
  }
});