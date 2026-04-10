import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  define: {
    "import.meta.client": "true",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup/nuxt-shim.ts"],
    include: ["tests/unit/**/*.spec.ts"],
    clearMocks: true,
  },
});
