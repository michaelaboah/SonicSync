<script lang="ts">
    import { listen } from '@tauri-apps/api/event';
    import { onMount } from 'svelte';
    import CommandPalette, { defineActions, createStoreMethods } from 'svelte-command-palette';
    // import { persist } from '../stores/RenderStore';
    import { modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    // define actions using the defineActions API

    const paletteMethods = createStoreMethods();

    const actions = defineActions([
        {
            actionId: 1,
            title: 'Go to Dashboard',
            // subTitle: ""
            onRun: () => goto('/'),
            shortcut: '$mod+1',
        },
        {
            actionId: 2,
            title: 'Go to Gear List',
            onRun: () => goto('/equipment-list'),
            shortcut: '$mod+2',
            keywords: ['Equipment', 'Gear', 'List'],
        },{
            actionId: 3,
            title: 'Go to Equipment Page',
            onRun: () => goto('/equipment-list'),
            shortcut: '$mod+2',
            keywords: ['Equipment', 'Gear'],
        },
        // { actionId: 3, title: "filler" },
        // { actionId: 4, title: "filler" },
        // { actionId: 5, title: "filler" },
        // { actionId: 6, title: "filler" },
        // { actionId: 7, title: "filler" },
        { actionId: 8, title: 'Go to Production Page', onRun: () => goto('/production-settings'), shortcut: '$mod+8', keywords: ['production', 'settings'] },
        {
            actionId: 9,
            title: 'Go to Preferences Page',
            onRun: () => goto('/preferences'),
            shortcut: '$mod+9',
            keywords: ['Preferences', 'Settings', 'User', 'Page'],
        },
        {
            actionId: 20,
            title: 'Toggle Dark Mode',
            onRun: () => (setModeCurrent(!$modeCurrent)),
            keywords: ['dark', 'mode', 'toggle'],
        },
        // {
        //     actionId: 21,
        //     title: 'Default Font Size',
        //     description: 'Reverts to a default font size of 16pt',
        //     onRun: () => ($persist.fontSize = [16]),
        //     keywords: ['font', 'size', 'revert'],
        // },
        // {
        //     actionId: 25,
        //     title: 'Toggle Auto Store',
        //     description: 'Toggling this option will enable or disable the storage of new pieces of Gear/Items .',
        //     onRun: () => ($persist.sql_auto_store = !$persist.sql_auto_store),
        //     keywords: ['database', 'sql', 'toggle'],
        // },
    ]);

    // onMount(async () => {
    //     await listen('toggle-palette', (_event) => {
    //         paletteMethods.openPalette();
    //     });
    // });
</script>
  <!-- <p class="te-black"></p> -->
    <CommandPalette
        commands="{actions}"
        inputClass="{$modeCurrent ? 'variant-glass-surface' : 'bg-surface-500 variant-glass'}"
        inputStyle="{{ height: '3vh', paddingBottom: '3vh', paddingTop: '3vh' }}"
        resultContainerClass="{$modeCurrent ? 'bg-surface-100 text-black' : 'bg-surface-500 text-primary-500'}"
        resultContainerStyle="{{ height: '1vh', padding: '2.5vh' }}"
        resultsContainerStyle="{{ overflowX: 'hidden' }}"
        resultsContainerClass="test"
        titleClass="{$modeCurrent ? 'text-slate-200' : 'text-black'}"
        optionSelectedStyle="{$modeCurrent
            ? { backgroundColor: 'bg-primary-200' }
            : { backgroundColor: 'bg-primary-200' }}"
        overlayStyle="{{ paddingTop: '4vw' }}"
        descriptionStyle="{{
            margin: '0',
            color: $modeCurrent ? 'green' : 'red',
            textAlign: 'right',
        }}"
        keyboardButtonStyle="{{
            backgroundColor: $modeCurrent ? 'bg-surface-500' : 'variant-glass-surface',
            height: '3vh',
            fontSize: '4',
            color: $modeCurrent ? 'red' : 'black',
  
        }}"
        subtitleStyle="{{
            margin: '0',
        }}"
        paletteWrapperInnerStyle="{{ backgroundColor: $modeCurrent ? 'variant-soft-surface' : 'bg-green-500' }}"
    />

<slot />

<style>
</style>
