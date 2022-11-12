import { defineConfig } from "astro/config";

import autoLayout from "remark-astro-layout-url-injector";

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
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
      watch: {
        usePolling: true,
      },
    },
  },
});
