import path from "path";
import { params } from "@ampt/sdk";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@shared": path.resolve(__dirname, "./types"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@util": path.resolve(__dirname, "./src/util"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/_vars.scss" as *;\n`,
      },
    },
  },
  server: {
    open: false,
    port: process.env.PORT ? parseInt(process.env.PORT) : 9999,
    strictPort: true,
    // This proxies all outgoing requests from the app to your live Ampt environment
    proxy: {
      "/api": {
        target: params("AMPT_URL"),
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: "static",
    reportCompressedSize: true,
    rollupOptions: {
      maxParallelFileOps: 10,
    },
  },
});
