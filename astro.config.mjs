import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      components: {
        LangSwitch: '@/components/LangSwitch.astro',
        Lang: '@/components/Lang.tsx',
      },
    }),
    react(),
  ],
  // Canonical URLs, redirects, OG — must match production hostname
  site: 'https://atillamercimek.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});

