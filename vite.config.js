import { defineConfig } from "vite";
import postcss from "@vituum/vite-plugin-postcss";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), postcss()],
  //plugins: [react()],
  server: {
    port: 3000, // Cambia el número de puerto a 3000.
    open: true,
  },
  //root: "./src",
  //base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
