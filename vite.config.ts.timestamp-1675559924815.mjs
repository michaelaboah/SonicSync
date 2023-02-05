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
import { defineConfig } from "file:///Users/michaelaboah/Documents/Programming/SoundTools/Deadalus-Tauri/node_modules/.pnpm/vite@3.2.5_@types+node@18.11.13/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/michaelaboah/Documents/Programming/SoundTools/Deadalus-Tauri/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@1.4.0_svelte@3.54.0+vite@3.2.5/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";

// postcss.config.cjs
var import_tailwind_config = __toESM(require_tailwind_config());
import tailwind from "file:///Users/michaelaboah/Documents/Programming/SoundTools/Deadalus-Tauri/node_modules/.pnpm/tailwindcss@3.2.4_v776zzvn44o7tpgzieipaairwm/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/michaelaboah/Documents/Programming/SoundTools/Deadalus-Tauri/node_modules/.pnpm/autoprefixer@10.4.13_postcss@8.4.19/node_modules/autoprefixer/lib/autoprefixer.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGFpbHdpbmQuY29uZmlnLmNqcyIsICJ2aXRlLmNvbmZpZy50cyIsICJwb3N0Y3NzLmNvbmZpZy5janMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZFRvb2xzL0RlYWRhbHVzLVRhdXJpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZFRvb2xzL0RlYWRhbHVzLVRhdXJpL3RhaWx3aW5kLmNvbmZpZy5janNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmRUb29scy9EZWFkYWx1cy1UYXVyaS90YWlsd2luZC5jb25maWcuY2pzXCI7LyoqIEB0eXBlIHtpbXBvcnQoJ3RhaWx3aW5kY3NzJykuQ29uZmlnfSAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbnRlbnQ6IFtcIi4vaW5kZXguaHRtbFwiLCcuL3NyYy8qKi8qLntzdmVsdGUsanMsdHN9J10sXG4gIHRoZW1lOiB7XG4gICAgZXh0ZW5kOiB7fSxcbiAgfSxcbiAgcGx1Z2luczogW10sXG4gIGRhcmtNb2RlOiB0cnVlLFxuXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kVG9vbHMvRGVhZGFsdXMtVGF1cmlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kVG9vbHMvRGVhZGFsdXMtVGF1cmkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmRUb29scy9EZWFkYWx1cy1UYXVyaS92aXRlLmNvbmZpZy50c1wiOy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjtcbmltcG9ydCBwb3N0Y3NzIGZyb20gXCIuL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtzdmVsdGUoKV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3MsXG4gIH0sXG4gIC8vIFZpdGUgb3B0aW9ucyB0YWlsb3JlZCBmb3IgVGF1cmkgZGV2ZWxvcG1lbnQgYW5kIG9ubHkgYXBwbGllZCBpbiBgdGF1cmkgZGV2YCBvciBgdGF1cmkgYnVpbGRgXG4gIC8vIHByZXZlbnQgdml0ZSBmcm9tIG9ic2N1cmluZyBydXN0IGVycm9yc1xuICBjbGVhclNjcmVlbjogZmFsc2UsXG4gIC8vIHRhdXJpIGV4cGVjdHMgYSBmaXhlZCBwb3J0LCBmYWlsIGlmIHRoYXQgcG9ydCBpcyBub3QgYXZhaWxhYmxlXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDE0MjAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfSxcbiAgLy8gdGVzdDoge30sXG4gIC8vIHRvIG1ha2UgdXNlIG9mIGBUQVVSSV9ERUJVR2AgYW5kIG90aGVyIGVudiB2YXJpYWJsZXNcbiAgLy8gaHR0cHM6Ly90YXVyaS5zdHVkaW8vdjEvYXBpL2NvbmZpZyNidWlsZGNvbmZpZy5iZWZvcmVkZXZjb21tYW5kXG4gIGVudlByZWZpeDogW1wiVklURV9cIiwgXCJUQVVSSV9cIl0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gVGF1cmkgc3VwcG9ydHMgZXMyMDIxXG4gICAgdGFyZ2V0OiBbXCJlczIwMjFcIiwgXCJjaHJvbWUxMDBcIiwgXCJzYWZhcmkxM1wiXSxcbiAgICAvLyBkb24ndCBtaW5pZnkgZm9yIGRlYnVnIGJ1aWxkc1xuICAgIG1pbmlmeTogIXByb2Nlc3MuZW52LlRBVVJJX0RFQlVHID8gXCJlc2J1aWxkXCIgOiBmYWxzZSxcbiAgICAvLyBwcm9kdWNlIHNvdXJjZW1hcHMgZm9yIGRlYnVnIGJ1aWxkc1xuICAgIHNvdXJjZW1hcDogISFwcm9jZXNzLmVudi5UQVVSSV9ERUJVRyxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZFRvb2xzL0RlYWRhbHVzLVRhdXJpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZFRvb2xzL0RlYWRhbHVzLVRhdXJpL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZFRvb2xzL0RlYWRhbHVzLVRhdXJpL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO2ltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCB0YWlsd2luZENvbmZpZyBmcm9tICcuL3RhaWx3aW5kLmNvbmZpZy5janMnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwbHVnaW5zOlt0YWlsd2luZCh0YWlsd2luZENvbmZpZyksYXV0b3ByZWZpeGVyXVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsV0FBTyxVQUFVO0FBQUEsTUFDZixTQUFTLENBQUMsZ0JBQWUsMkJBQTJCO0FBQUEsTUFDcEQsT0FBTztBQUFBLFFBQ0wsUUFBUSxDQUFDO0FBQUEsTUFDWDtBQUFBLE1BQ0EsU0FBUyxDQUFDO0FBQUEsTUFDVixVQUFVO0FBQUEsSUFFWjtBQUFBO0FBQUE7OztBQ1BBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsY0FBYzs7O0FDRnZCLDZCQUEyQjtBQUR3VyxPQUFPLGNBQWM7QUFFeFosT0FBTyxrQkFBa0I7QUFFekIsSUFBTyx5QkFBUTtBQUFBLEVBQ2IsU0FBUSxDQUFDLFNBQVMsdUJBQUFBLE9BQWMsR0FBRSxZQUFZO0FBQ2hEOzs7QURBQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsS0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFHQSxhQUFhO0FBQUEsRUFFYixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBSUEsV0FBVyxDQUFDLFNBQVMsUUFBUTtBQUFBLEVBQzdCLE9BQU87QUFBQSxJQUVMLFFBQVEsQ0FBQyxVQUFVLGFBQWEsVUFBVTtBQUFBLElBRTFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxZQUFZO0FBQUEsSUFFL0MsV0FBVyxDQUFDLENBQUMsUUFBUSxJQUFJO0FBQUEsRUFDM0I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJ0YWlsd2luZENvbmZpZyJdCn0K
