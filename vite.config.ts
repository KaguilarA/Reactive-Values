import { defineConfig } from "vite";
import { defineConfig as defineConfigTest } from "vitest/config";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  ...defineConfigTest({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        reporter: ["text", "json", "html"]
      }
    }
  }),
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactiveValues",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`
    },
    outDir: "dist",
    emptyOutDir: true
  },
  plugins: [dts({ insertTypesEntry: true })]
});