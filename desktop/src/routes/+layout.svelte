<script lang="ts">
  import "../theme.postcss";
  import "@skeletonlabs/skeleton/styles/skeleton.css"
	import '../app.postcss';
  import {page} from "$app/stores"

  import {AppShell} from "@skeletonlabs/skeleton"
  import GearIcon from '~icons/ri/settings-3-line'
  import DashIcon from '~icons/ri/dashboard-line'
  import ItemListIcon from '~icons/ri/list-settings-line'
  import CableIcon from '~icons/mdi/cable-data'
  import LibraryIcon from '~icons/ri/book-open-line'
  import ToolsIcon from '~icons/ri/tools-line'
  import FlowIcon from "~icons/bi/diagram-3"
  import IOIcon from "~icons/solar/transfer-vertical-bold-duotone"
  
  $: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-filled-primary' : 'variant-glass-primary');
</script>

<AppShell slotSidebarLeft="w-48 variant-glass-surface rounded-sm" regionPage="variant-soft-surface">
  <svelte:fragment slot="sidebarLeft">
    <nav class="list-nav">
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
          <span> Cables</span>
        </a></li>
        <li><a class="{classesActive('/flow')}" href="/flow">
          <span class=""><FlowIcon/></span>
          <span>Flow</span>
        </a></li>
        <li><a class="{classesActive('/io-list')}" href="/io-list">
          <span class=""><IOIcon/></span>
          <span>I/O</span>
        </a></li>
        <li><a class="{classesActive('/equipment-library')}" href="/equipment-library">
          <span><LibraryIcon/></span>
          <span>Library</span>
        </a></li>
        <li><a class="{classesActive('/production-settings')}" href="/production-settings">
          <span><ToolsIcon/></span>
          <span>Production</span>
        </a></li>
        <li class="absolute bottom-0 w-full pb-4">
          <a href="/preferences" class="{classesActive('/preferences')}">
            <span><GearIcon/></span>
            <span>Preferences</span>
          </a>
        </li>
      <ul>
    </nav>
  </svelte:fragment>

  <slot class="mr-4"/>
</AppShell>
