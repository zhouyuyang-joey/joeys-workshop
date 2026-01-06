import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import tailwind from '@astrojs/tailwind';

// GitHub Pages configuration
// For user/org pages (e.g., username.github.io): leave base as '/'
// For project pages (e.g., github.com/username/repo): set base to '/repo/'
const site = process.env.SITE_URL || 'https://joeys-workshop.vercel.app';
const base = process.env.BASE_URL || '/';

export default defineConfig({
  site,
  base,
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkToc],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ],
    }),
    tailwind(),
  ],
});
