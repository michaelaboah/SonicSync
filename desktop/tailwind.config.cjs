/** @type {import('tailwindcss').Config}*/
const config = {
  darkMode: "class",
	content: [
    // "./node_modules/@tauri-controls/svelte/**/*.{js,svelte,ts}",
    './src/**/*.{html,js,svelte,ts}',
    require("path").join(require.resolve(
     "@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    )
  ],  
	theme: {
		extend: {}
	},

	plugins: [
    require("@tailwindcss/forms"),
    ...require("@skeletonlabs/skeleton/tailwind/skeleton.cjs")()
  ]
};

module.exports = config;
