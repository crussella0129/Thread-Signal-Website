import { defineConfig } from "astro/config";

export default defineConfig({
  root: new URL(".", import.meta.url),
  publicDir: "./assets",
  outDir: "./dist",
  devToolbar: { enabled: false },
  server: { host: "127.0.0.1", port: 4322 },
});
