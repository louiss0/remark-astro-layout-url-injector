import { defineConfig } from "astro/config";

import autoLayout from "./dist";

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [autoLayout({ default: "layouts/default" })],
  },
  server: {
    host: true,
  },
  vite: {
    resolve: {
      alias: {
        "~": "/src",
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
