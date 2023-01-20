<script lang="ts">
    import { prodInfo } from '../stores/ProjectStore';
    import { persist } from '../stores/RenderStore';
    import { Box, Button, Text } from '@svelteuidev/core';
    import { invoke } from '@tauri-apps/api/tauri';
    import { onMount } from 'svelte';

    onMount(async () => {
        let test = await invoke('find_single_item', { id: 7 });
        console.log(test);
    });
</script>

<Box>
    <header>
        <h2 class="text-red-400">Main Menu</h2>
    </header>

    <h1>{$prodInfo.productionName ? 'Current Project: ' + $prodInfo.productionName : 'New Project'}</h1>
    <Button on:click="{() => ($persist.ui_font_size = 'lg')}" color="grape">Change font</Button>

    <Text size="{$persist.ui_font_size}">Here is some test text</Text>
</Box>

<style>
    h2,
    h1 {
        margin: auto;
    }
</style>
