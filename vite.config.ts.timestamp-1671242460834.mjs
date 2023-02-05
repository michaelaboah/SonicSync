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
import { defineConfig } from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/vite@3.2.5_@types+node@18.11.13/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@1.4.0_svelte@3.54.0+vite@3.2.5/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";

// postcss.config.cjs
var import_tailwind_config = __toESM(require_tailwind_config());
import tailwind from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/tailwindcss@3.2.4_v776zzvn44o7tpgzieipaairwm/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/michaelaboah/Documents/Programming/Sound%20Tools/Deadalus-Tauri/node_modules/.pnpm/autoprefixer@10.4.13_postcss@8.4.19/node_modules/autoprefixer/lib/autoprefixer.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGFpbHdpbmQuY29uZmlnLmNqcyIsICJ2aXRlLmNvbmZpZy50cyIsICJwb3N0Y3NzLmNvbmZpZy5janMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZCBUb29scy9EZWFkYWx1cy1UYXVyaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmQgVG9vbHMvRGVhZGFsdXMtVGF1cmkvdGFpbHdpbmQuY29uZmlnLmNqc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZCUyMFRvb2xzL0RlYWRhbHVzLVRhdXJpL3RhaWx3aW5kLmNvbmZpZy5janNcIjsvKiogQHR5cGUge2ltcG9ydCgndGFpbHdpbmRjc3MnKS5Db25maWd9ICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29udGVudDogW1wiLi9pbmRleC5odG1sXCIsJy4vc3JjLyoqLyoue3N2ZWx0ZSxqcyx0c30nXSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHt9LFxuICB9LFxuICBwbHVnaW5zOiBbXSxcbiAgZGFya01vZGU6IHRydWUsXG5cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmQgVG9vbHMvRGVhZGFsdXMtVGF1cmlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kIFRvb2xzL0RlYWRhbHVzLVRhdXJpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kJTIwVG9vbHMvRGVhZGFsdXMtVGF1cmkvdml0ZS5jb25maWcudHNcIjsvLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gXCJAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlXCI7XG5pbXBvcnQgcG9zdGNzcyBmcm9tIFwiLi9wb3N0Y3NzLmNvbmZpZy5janNcIjtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbc3ZlbHRlKCldLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzLFxuICB9LFxuICAvLyBWaXRlIG9wdGlvbnMgdGFpbG9yZWQgZm9yIFRhdXJpIGRldmVsb3BtZW50IGFuZCBvbmx5IGFwcGxpZWQgaW4gYHRhdXJpIGRldmAgb3IgYHRhdXJpIGJ1aWxkYFxuICAvLyBwcmV2ZW50IHZpdGUgZnJvbSBvYnNjdXJpbmcgcnVzdCBlcnJvcnNcbiAgY2xlYXJTY3JlZW46IGZhbHNlLFxuICAvLyB0YXVyaSBleHBlY3RzIGEgZml4ZWQgcG9ydCwgZmFpbCBpZiB0aGF0IHBvcnQgaXMgbm90IGF2YWlsYWJsZVxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAxNDIwLFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gIH0sXG4gIC8vIHRlc3Q6IHt9LFxuICAvLyB0byBtYWtlIHVzZSBvZiBgVEFVUklfREVCVUdgIGFuZCBvdGhlciBlbnYgdmFyaWFibGVzXG4gIC8vIGh0dHBzOi8vdGF1cmkuc3R1ZGlvL3YxL2FwaS9jb25maWcjYnVpbGRjb25maWcuYmVmb3JlZGV2Y29tbWFuZFxuICBlbnZQcmVmaXg6IFtcIlZJVEVfXCIsIFwiVEFVUklfXCJdLFxuICBidWlsZDoge1xuICAgIC8vIFRhdXJpIHN1cHBvcnRzIGVzMjAyMVxuICAgIHRhcmdldDogW1wiZXMyMDIxXCIsIFwiY2hyb21lMTAwXCIsIFwic2FmYXJpMTNcIl0sXG4gICAgLy8gZG9uJ3QgbWluaWZ5IGZvciBkZWJ1ZyBidWlsZHNcbiAgICBtaW5pZnk6ICFwcm9jZXNzLmVudi5UQVVSSV9ERUJVRyA/IFwiZXNidWlsZFwiIDogZmFsc2UsXG4gICAgLy8gcHJvZHVjZSBzb3VyY2VtYXBzIGZvciBkZWJ1ZyBidWlsZHNcbiAgICBzb3VyY2VtYXA6ICEhcHJvY2Vzcy5lbnYuVEFVUklfREVCVUcsXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pY2hhZWxhYm9haC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvU291bmQgVG9vbHMvRGVhZGFsdXMtVGF1cmlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taWNoYWVsYWJvYWgvRG9jdW1lbnRzL1Byb2dyYW1taW5nL1NvdW5kIFRvb2xzL0RlYWRhbHVzLVRhdXJpL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWljaGFlbGFib2FoL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9Tb3VuZCUyMFRvb2xzL0RlYWRhbHVzLVRhdXJpL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO2ltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCB0YWlsd2luZENvbmZpZyBmcm9tICcuL3RhaWx3aW5kLmNvbmZpZy5janMnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwbHVnaW5zOlt0YWlsd2luZCh0YWlsd2luZENvbmZpZyksYXV0b3ByZWZpeGVyXVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0EsV0FBTyxVQUFVO0FBQUEsTUFDZixTQUFTLENBQUMsZ0JBQWUsMkJBQTJCO0FBQUEsTUFDcEQsT0FBTztBQUFBLFFBQ0wsUUFBUSxDQUFDO0FBQUEsTUFDWDtBQUFBLE1BQ0EsU0FBUyxDQUFDO0FBQUEsTUFDVixVQUFVO0FBQUEsSUFFWjtBQUFBO0FBQUE7OztBQ1BBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsY0FBYzs7O0FDRnZCLDZCQUEyQjtBQUQ2VyxPQUFPLGNBQWM7QUFFN1osT0FBTyxrQkFBa0I7QUFFekIsSUFBTyx5QkFBUTtBQUFBLEVBQ2IsU0FBUSxDQUFDLFNBQVMsdUJBQUFBLE9BQWMsR0FBRSxZQUFZO0FBQ2hEOzs7QURBQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsS0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFHQSxhQUFhO0FBQUEsRUFFYixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBSUEsV0FBVyxDQUFDLFNBQVMsUUFBUTtBQUFBLEVBQzdCLE9BQU87QUFBQSxJQUVMLFFBQVEsQ0FBQyxVQUFVLGFBQWEsVUFBVTtBQUFBLElBRTFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxZQUFZO0FBQUEsSUFFL0MsV0FBVyxDQUFDLENBQUMsUUFBUSxJQUFJO0FBQUEsRUFDM0I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJ0YWlsd2luZENvbmZpZyJdCn0K
