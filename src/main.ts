import App from './App.svelte';
import { tauri_store } from './stores/RenderStore';

const app = new App({
    target: document.getElementById('app'),
});

export default app;
