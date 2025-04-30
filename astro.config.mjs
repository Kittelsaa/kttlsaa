import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import icon from "astro-icon";
import partytown from "@astrojs/partytown";
import { remarkPlugin } from './src/utils/remarkWikiLinks.mjs';

export default defineConfig({
  site: "https://kttlsaa.com",
  image: {
    domains: ["res.cloudinary.com"],
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkPlugin],
      shikiConfig: {
        theme: "night-owl",
        wrap: true,
      },
      // Add global components configuration
      components: './src/mdx-components.ts',
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    react(),
    icon({
      // Add this configuration to include heroicons
      include: {
        heroicons: ["*"],
      },
    }),
  ],
  // Add error handling for MDX processing
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress certain warnings
          if (warning.code === 'CIRCULAR_DEPENDENCY') return;
          warn(warning);
        }
      }
    }
  }
});

