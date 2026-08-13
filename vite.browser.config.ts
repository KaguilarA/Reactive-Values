import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/browser.ts"),
      name: "ReactiveValues",
      formats: ["iife"],
      fileName: () => "cdn.min.js",
    },
    minify: "esbuild",
    outDir: "dist",
  },
});
