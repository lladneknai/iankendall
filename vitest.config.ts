import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/__tests__/**/*.{test,spec}.{ts,tsx}",
      "api/__tests__/**/*.{test,spec}.ts",
    ],
    exclude: ["node_modules", "dist", "static"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        "vitest.setup.ts",
        "vitest.config.ts",
        "**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@config": resolve(__dirname, "./src/config"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@store": resolve(__dirname, "./src/store"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@util": resolve(__dirname, "./src/util"),
      "@shared": resolve(__dirname, "./types"),
      api: resolve(__dirname, "./api"),
    },
  },
});
