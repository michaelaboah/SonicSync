import App from './App.svelte';
// import { trace } from 'tauri-plugin-log-api';
const app = new App({
    target: document.getElementById('app'),
});
export default app;

// trace('Hello');
