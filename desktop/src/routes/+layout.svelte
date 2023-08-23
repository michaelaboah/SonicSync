<script lang="ts">
  import "../theme.postcss";
  import "@skeletonlabs/skeleton/styles/skeleton.css"
	import '../app.postcss';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { page } from "$app/stores"
  import { preferences } from "$lib/stores/user"
  import { AppShell, modeCurrent, storePopup } from '@skeletonlabs/skeleton';
  import GearIcon from '~icons/ri/settings-3-line'
  import DashIcon from '~icons/ri/dashboard-line'
  import ItemListIcon from '~icons/ri/list-settings-line'
  import CableIcon from '~icons/mdi/cable-data'
  import LibraryIcon from '~icons/ri/book-open-line'
  import ToolsIcon from '~icons/ri/tools-line'
  import FlowIcon from "~icons/bi/diagram-3"
  import IOIcon from "~icons/solar/transfer-vertical-bold-duotone"
  import ArrowIcon from "~icons/simple-line-icons/arrow-up"

	import ContextLayer from "$lib/components/layers/ContextLayer.svelte";
	import InvokeLayer from "$lib/components/layers/InvokeLayer.svelte";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  import { setContextClient, Client, cacheExchange, fetchExchange } from '@urql/svelte';
	import CollapsedSidebar from "$lib/components/bars/CollapsedSidebar.svelte";

  export const client = new Client({
    url: 'https://api.sonic-sync.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    // fetchOptions
  });

  $preferences.ui.darkMode = $modeCurrent

  setContextClient(client)
  // console.log($preferences.ui)
  $: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-filled-primary' : '');
</script>
<AppShell slotSidebarLeft="max-w-48 px-4 variant-ringed-surface rounded-sm relative" regionPage="variant-soft-surface">
  <svelte:fragment slot="sidebarLeft">
    {#if $preferences.ui.sidebar}
    <nav class="list-nav pt-6">
      <ul>
        <li><a href="/" class="{classesActive('/')}">
          <span><DashIcon/></span>
          <span>Dashboard</span>
        </a></li>
        <li><a class="{classesActive('/equipment-list')}" href="/equipment-list">
          <span><ItemListIcon/></span>
          <span>Gear List</span>
        </a></li>
        <li><a class="{classesActive('/cable-list')}" href="/cable-list">
          <span class=""><CableIcon/></span>
          <span> Cable List</span>
        </a></li>
        <li><a class="{classesActive('/flow')}" href="/flow">
          <span class=""><FlowIcon/></span>
          <span>Flow Chart</span>
        </a></li>
        <li><a class="{classesActive('/io-list')}" href="/io-list">
          <span class=""><IOIcon/></span>
          <span>I/O List</span>
        </a></li>
        <li><a class="{classesActive('/equipment-library')}" href="/equipment-library">
          <span><LibraryIcon/></span>
          <span>Library</span>
        </a></li>
        <li><a class="{classesActive('/production-settings')}" href="/production-settings">
          <span><ToolsIcon/></span>
          <span>Production</span>
        </a></li>
        <li class="fixed bottom-0 my-auto pb-4">
          <hr class="mb-1"/>
          <div class="flex flex-row">
          <a href="/preferences" class="{classesActive('/preferences')}">
            <span><GearIcon/></span>
            <span>Preferences</span>
          </a>
          </div>
        </li>
      <ul>
    </nav>
      <button class="btn-icon opacity-30 absolute z-10 right-0 top-1/2 hover:translate-x-1 hover:opacity-100 -rotate-90" on:click={() => {$preferences.ui.sidebar = !$preferences.ui.sidebar}}><ArrowIcon/></button>
    {:else}
      <CollapsedSidebar/>
      <button class="btn-icon opacity-30 absolute z-10 right-0 top-1/2 hover:translate-x-1 hover:opacity-100 rotate-90" on:click={() => {$preferences.ui.sidebar = !$preferences.ui.sidebar}}><ArrowIcon/></button>
    {/if}
  </svelte:fragment>
  <ContextLayer/>  
  <div class="w-full h-full">
    <slot />
  </div>
</AppShell>
