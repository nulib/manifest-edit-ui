import { defineConfig } from "vitest/config";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
const root = resolve(__dirname, "src/pages");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/guide/build.html#multi-page-app
export default defineConfig({
  define: {
    global: {},
  },
  root,
  plugins: [reactRefresh(), tsconfigPaths()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
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
