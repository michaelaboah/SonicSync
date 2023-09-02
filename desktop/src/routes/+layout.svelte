<script lang="ts">
  import "../theme.postcss";
  import "@skeletonlabs/skeleton/styles/skeleton.css"
	import '../app.postcss';
  import { Toast, AppShell, modeCurrent, storePopup, Drawer, setInitialClassState,  } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { preferences } from "$lib/stores/user"
  import { setContextClient, Client, cacheExchange, fetchExchange } from '@urql/svelte';
  import ArrowIcon from "~icons/simple-line-icons/arrow-up"
	import ContextLayer from "$lib/components/layers/ContextLayer.svelte";
	import InvokeLayer from "$lib/components/layers/InvokeLayer.svelte";
	import CollapsedSidebar from "$lib/components/bars/CollapsedSidebar.svelte";
	import OpenSidebar from "$lib/components/bars/OpenSidebar.svelte";



  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  export const client = new Client({
    url: 'https://api.sonic-sync.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    // fetchOptions
  });

  $preferences.ui.darkMode = $modeCurrent

  setContextClient(client)


</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<Toast/>
<Drawer/>

<AppShell slotSidebarLeft="max-w-48 px-4 variant-ringed-surface rounded-sm relative" regionPage="variant-soft-surface">
  <svelte:fragment slot="sidebarLeft">
    {#if $preferences.ui.sidebar}
      <OpenSidebar/>    
      <button class="btn-icon opacity-30 absolute z-10 right-0 top-1/2 hover:translate-x-1 hover:opacity-100 -rotate-90" 
              on:click={() => {$preferences.ui.sidebar = !$preferences.ui.sidebar}}><ArrowIcon/></button>
    {:else}
      <CollapsedSidebar/>
      <button class="btn-icon opacity-30 absolute z-10 right-0 top-1/2 hover:translate-x-1 hover:opacity-100 rotate-90" 
              on:click={() => {$preferences.ui.sidebar = !$preferences.ui.sidebar}}><ArrowIcon/></button>
    {/if}
  </svelte:fragment>

  <InvokeLayer/>
  <ContextLayer/>


  <div class="w-full h-full">
    <slot />
  </div>
</AppShell>
