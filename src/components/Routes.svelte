<script lang="ts">
    import Router from 'svelte-spa-router';
    import MainMenu from '../pages/MainMenu.svelte';
    import Bye from '../pages/Bye.svelte';
    import EquipmentListPage from '../pages/EquipmentListPage.svelte';
    import PreferencesPage from '../pages/PreferencesPage.svelte';
    import ProductionPage from '../pages/ProductionPage.svelte';
    import { Box } from '@svelteuidev/core';
    import EquipmentLibraryPage from '../pages/EquipmentLibraryPage.svelte';
    const routes = {
        '/': MainMenu,
        '/Bye': Bye,
        '/EquipmentListPage': EquipmentListPage,
        '/PreferencesPage': PreferencesPage,
        '/ProductionPage': ProductionPage,
        '/EquipmentLibraryPage': EquipmentLibraryPage,
    };
</script>

<Box mt="{63}">
    <Router routes="{routes}" />
</Box>

<style>
    /* div {
    margin-top: 7vh;
  } */
</style>
