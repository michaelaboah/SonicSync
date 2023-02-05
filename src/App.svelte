<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import { listen } from '@tauri-apps/api/event';
    import { invoke } from '@tauri-apps/api/tauri';
    import { AppShell, SvelteUIProvider } from '@svelteuidev/core';
    import '@svelteuidev/prism';
    import Footer from './components/Footer.svelte';
    import Header from './components/Header.svelte';
    import Routes from './components/Routes.svelte';
    import ContextLayer from './components/ContextLayer.svelte';
    import { themeKey } from './utils/contextKeys';
    import { currentFile, loadProject, project } from './stores/ProjectStore'; //, loadProject
    import { persist } from './stores/RenderStore';
    import { push } from 'svelte-spa-router';
    // import { trace, info, error, attachConsole } from 'tauri-plugin-log-api';

    onMount(async () => {
        // await attachConsole();

        // trace('Trace');
        // info('Info');
        // error('Error');

        await listen('save', (_event) => {
            invoke('save_as_file', { file_path: $currentFile, data: $project }).then((value) => {
                console.log(value);
            });
        });

        await listen('save-as', (_event) => {
            invoke('save_as_file', { data: $project }).then((value) => {
                console.log(value);
            });
        });

        await listen('open-project-file', async () => {
            loadProject(JSON.parse(await invoke('open_project')));
        });

        await listen('open-preferences', () => {
            push('#/PreferencesPage');
        });

        await listen('load-json-array-to-db', () => {});

        window.onkeydown = function (e) {
            if (e.key === 'Backspace' && e.target == document.body) e.preventDefault();
        };
    });

    setContext(themeKey, {
        toggleDark: () => ($persist.darkMode = !$persist.darkMode),
    });
</script>

<SvelteUIProvider
    withGlobalStyles
    themeObserver="{$persist.darkMode ? 'dark' : 'light'}"
    override="{{ fs: $persist.fontSize[0] }}"
>
    <AppShell>
        {#key $persist.darkMode}
            <ContextLayer>
                <Header />
                <Routes />
                <Footer />
            </ContextLayer>
        {/key}
    </AppShell>
</SvelteUIProvider>

<style global lang="postcss">
    @tailwind utilities;
    @tailwind components;
    @tailwind base;
</style>
