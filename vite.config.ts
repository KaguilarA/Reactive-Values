import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
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