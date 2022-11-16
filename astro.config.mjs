import { defineConfig } from "astro/config";

import autoLayout from "./lib";

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      autoLayout({
        default: "layouts/default",
        posts: "layouts/posts",
        postsReact: "layouts/posts",
      }),
    ],
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
