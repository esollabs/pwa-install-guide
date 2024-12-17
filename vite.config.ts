import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "pwa-install-guide",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "style.css",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
