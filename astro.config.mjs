import { defineConfig } from 'astro/config';

import autoLayout from "/src/utils/autoLayout"

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true, 
    remarkPlugins: [
      autoLayout({ posts: "/src/layouts/post.astro"})
    ]
  }
});
