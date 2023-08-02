var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// tailwind.config.cjs
var require_tailwind_config = __commonJS({
  "tailwind.config.cjs"(exports, module) {
    "use strict";
    module.exports = {
      content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
      theme: {
        extend: {}
      },
      plugins: [],
      darkMode: true
    };
  }
});

// vite.config.ts
import { defineConfig } from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/vite@3.2.0/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@1.1.0_svelte@3.52.0+vite@3.2.0/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";

// postcss.config.cjs
var import_tailwind_config = __toESM(require_tailwind_config());
import tailwind from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/tailwindcss@3.2.1_neo3lunb2qpadwxplzw7r2isgm/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/autoprefixer@10.4.13_postcss@8.4.18/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [tailwind(import_tailwind_config.default), autoprefixer]
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [svelte()],
  css: {
    postcss: postcss_config_default
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: ["es2021", "chrome100", "safari13"],
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGFpbHdpbmQuY29uZmlnLmNqcyIsICJ2aXRlLmNvbmZpZy50cyIsICJwb3N0Y3NzLmNvbmZpZy5janMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZCBUb29scy9EZWFkYWx1cy1UYXVyaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmQgVG9vbHMvRGVhZGFsdXMtVGF1cmkvdGFpbHdpbmQuY29uZmlnLmNqc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZCUyMFRvb2xzL0RlYWRhbHVzLVRhdXJpL3RhaWx3aW5kLmNvbmZpZy5janNcIjsvKiogQHR5cGUge2ltcG9ydCgndGFpbHdpbmRjc3MnKS5Db25maWd9ICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29udGVudDogW1wiLi9pbmRleC5odG1sXCIsJy4vc3JjLyoqLyoue3N2ZWx0ZSxqcyx0c30nXSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHt9LFxuICB9LFxuICBwbHVnaW5zOiBbXSxcbiAgZGFya01vZGU6IHRydWUsXG5cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmQgVG9vbHMvRGVhZGFsdXMtVGF1cmlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kIFRvb2xzL0RlYWRhbHVzLVRhdXJpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kJTIwVG9vbHMvRGVhZGFsdXMtVGF1cmkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjtcbmltcG9ydCBwb3N0Y3NzIGZyb20gXCIuL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtzdmVsdGUoKV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3MsXG4gIH0sXG4gIC8vIFZpdGUgb3B0aW9ucyB0YWlsb3JlZCBmb3IgVGF1cmkgZGV2ZWxvcG1lbnQgYW5kIG9ubHkgYXBwbGllZCBpbiBgdGF1cmkgZGV2YCBvciBgdGF1cmkgYnVpbGRgXG4gIC8vIHByZXZlbnQgdml0ZSBmcm9tIG9ic2N1cmluZyBydXN0IGVycm9yc1xuICBjbGVhclNjcmVlbjogZmFsc2UsXG4gIC8vIHRhdXJpIGV4cGVjdHMgYSBmaXhlZCBwb3J0LCBmYWlsIGlmIHRoYXQgcG9ydCBpcyBub3QgYXZhaWxhYmxlXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDE0MjAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfSxcbiAgLy8gdG8gbWFrZSB1c2Ugb2YgYFRBVVJJX0RFQlVHYCBhbmQgb3RoZXIgZW52IHZhcmlhYmxlc1xuICAvLyBodHRwczovL3RhdXJpLnN0dWRpby92MS9hcGkvY29uZmlnI2J1aWxkY29uZmlnLmJlZm9yZWRldmNvbW1hbmRcbiAgZW52UHJlZml4OiBbXCJWSVRFX1wiLCBcIlRBVVJJX1wiXSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBUYXVyaSBzdXBwb3J0cyBlczIwMjFcbiAgICB0YXJnZXQ6IFtcImVzMjAyMVwiLCBcImNocm9tZTEwMFwiLCBcInNhZmFyaTEzXCJdLFxuICAgIC8vIGRvbid0IG1pbmlmeSBmb3IgZGVidWcgYnVpbGRzXG4gICAgbWluaWZ5OiAhcHJvY2Vzcy5lbnYuVEFVUklfREVCVUcgPyBcImVzYnVpbGRcIiA6IGZhbHNlLFxuICAgIC8vIHByb2R1Y2Ugc291cmNlbWFwcyBmb3IgZGVidWcgYnVpbGRzXG4gICAgc291cmNlbWFwOiAhIXByb2Nlc3MuZW52LlRBVVJJX0RFQlVHLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kIFRvb2xzL0RlYWRhbHVzLVRhdXJpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZCBUb29scy9EZWFkYWx1cy1UYXVyaS9wb3N0Y3NzLmNvbmZpZy5janNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmQlMjBUb29scy9EZWFkYWx1cy1UYXVyaS9wb3N0Y3NzLmNvbmZpZy5janNcIjtpbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgdGFpbHdpbmRDb25maWcgZnJvbSAnLi90YWlsd2luZC5jb25maWcuY2pzJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGx1Z2luczpbdGFpbHdpbmQodGFpbHdpbmRDb25maWcpLGF1dG9wcmVmaXhlcl1cbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLFdBQU8sVUFBVTtBQUFBLE1BQ2YsU0FBUyxDQUFDLGdCQUFlLDJCQUEyQjtBQUFBLE1BQ3BELE9BQU87QUFBQSxRQUNMLFFBQVEsQ0FBQztBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVMsQ0FBQztBQUFBLE1BQ1YsVUFBVTtBQUFBLElBRVo7QUFBQTtBQUFBOzs7QUNUZ1ksU0FBUyxvQkFBb0I7QUFDN1osU0FBUyxjQUFjOzs7QUNBdkIsNkJBQTJCO0FBRDZXLE9BQU8sY0FBYztBQUU3WixPQUFPLGtCQUFrQjtBQUV6QixJQUFPLHlCQUFRO0FBQUEsRUFDYixTQUFRLENBQUMsU0FBUyx1QkFBQUEsT0FBYyxHQUFFLFlBQVk7QUFDaEQ7OztBREZBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixLQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUdBLGFBQWE7QUFBQSxFQUViLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFHQSxXQUFXLENBQUMsU0FBUyxRQUFRO0FBQUEsRUFDN0IsT0FBTztBQUFBLElBRUwsUUFBUSxDQUFDLFVBQVUsYUFBYSxVQUFVO0FBQUEsSUFFMUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxjQUFjLFlBQVk7QUFBQSxJQUUvQyxXQUFXLENBQUMsQ0FBQyxRQUFRLElBQUk7QUFBQSxFQUMzQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInRhaWx3aW5kQ29uZmlnIl0KfQo=
