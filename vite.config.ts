import { defineConfig } from "vitest/config";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/guide/build.html#multi-page-app
export default defineConfig({
  define: {
    global: process.env.NODE_ENV === "development" ? {} : undefined,
  },
  plugins: [
    react(),
    eslint({
      overrideConfigFile: "./.eslintrc.js",
      cache: false,
      include: ["./src/**/*.ts", "./src/**/*.tsx"],
      exclude: ["./node_modules/**"],
    }),
    reactRefresh(),
    tsconfigPaths(),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.{test,tests,spec}.{js,mjs,cjs,ts,tsx,mts,cts}"],
    setupFiles: "./setupTests.ts",
    root: "src",
  },
});
