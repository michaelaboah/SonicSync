<script lang="ts">
    import { Box } from '@svelteuidev/core';
    import { listen } from '@tauri-apps/api/event';
    import { onMount } from 'svelte';
    import CommandPalette, { defineActions, createStoreMethods } from 'svelte-command-palette';
    import { push } from 'svelte-spa-router';
    import { persist } from '../stores/RenderStore';

    // define actions using the defineActions API

    const paletteMethods = createStoreMethods();

    const actions = defineActions([
        {
            actionId: 1,
            title: 'Go to Main Page',
            // subTitle: ""
            onRun: () => push('#/'),
            shortcut: '$mod+1',
        },
        {
            actionId: 2,
            title: 'Go to Equipment Page',
            // subTitle: ""
            onRun: () => push('#/EquipmentListPage'),
            shortcut: '$mod+2',
            keywords: ['Equipment', 'Gear'],
        },
        // { actionId: 3, title: "filler" },
        // { actionId: 4, title: "filler" },
        // { actionId: 5, title: "filler" },
        // { actionId: 6, title: "filler" },
        // { actionId: 7, title: "filler" },
        { actionId: 8, title: 'Go to Production Page', onRun: () => push('#/ProductionPage'), shortcut: '$mod+8' },
        {
            actionId: 9,
            title: 'Go to Preferences Page',
            onRun: () => push('#/ProductionPage'),
            shortcut: '$mod+9',
            keywords: ['Preferences', 'Settings', 'User', 'Page'],
        },
        {
            actionId: 20,
            title: 'Toggle Dark Mode',
            onRun: () => ($persist.darkMode = !$persist.darkMode),
            keywords: ['dark', 'mode', 'toggle'],
        },
        {
            actionId: 21,
            title: 'Default Font Size',
            description: 'Reverts to a default font size of 16pt',
            onRun: () => ($persist.fontSize = [16]),
            keywords: ['font', 'size', 'revert'],
        },
        {
            actionId: 25,
            title: 'Toggle Auto Store',
            description: 'Toggling this option will enable or disable the storage of new pieces of Gear/Items .',
            onRun: () => ($persist.sql_auto_store = !$persist.sql_auto_store),
            keywords: ['database', 'sql', 'toggle'],
        },
    ]);

    onMount(async () => {
        await listen('toggle-palette', (_event) => {
            paletteMethods.openPalette();
        });
    });
</script>

<Box css="{{ borderRadius: '$lg' }}">
    <CommandPalette
        commands="{actions}"
        inputClass="{$persist.darkMode ? 'bg-gray-500' : 'bg-slate-200'}"
        inputStyle="{{ height: '3vh', paddingBottom: '3vh', paddingTop: '3vh' }}"
        resultContainerClass="{$persist.darkMode ? 'bg-gray-600' : 'bg-slate-100'}"
        resultContainerStyle="{{ height: '1vh', padding: '2.5vh' }}"
        resultsContainerStyle="{{ scrollbarColor: 'yellow', overflowX: 'hidden' }}"
        resultsContainerClass="test"
        titleClass="{$persist.darkMode ? 'text-slate-200' : 'text-black'}"
        optionSelectedStyle="{$persist.darkMode
            ? { backgroundColor: 'slategrey' }
            : { backgroundColor: 'lightskyblue' }}"
        overlayStyle="{{ paddingTop: '4vw' }}"
        descriptionStyle="{{
            margin: '0',
            color: $persist.darkMode ? 'white' : 'black',
            textAlign: 'right',
        }}"
        keyboardButtonStyle="{{
            backgroundColor: $persist.darkMode ? 'grey' : 'whitesmoke',
            height: '3vh',
            fontSize: '4',
            color: $persist.darkMode ? 'white' : 'black',
        }}"
        subtitleStyle="{{
            margin: '0',
        }}"
        paletteWrapperInnerStyle="{{ backgroundColor: $persist.darkMode ? 'bg-gray-500' : 'bg-slate-200' }}"
    />
</Box>

<slot />

<style>
</style>
