import { sveltekit } from '@sveltejs/kit/vite'
import houdini from 'houdini/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [ /*Icons({compiler: "svelte"}) */, houdini(), sveltekit(), ]
});
