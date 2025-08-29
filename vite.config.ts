import { defineConfig } from "vite";
import { defineConfig as defineConfigTest } from "vitest/config";
import dts from "vite-plugin-dts";

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
      entry: "src/index.ts",
      name: "ReactiveCore",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`
    },
    outDir: "dist",
    emptyOutDir: true
  },
  plugins: [dts({ insertTypesEntry: true })]
});