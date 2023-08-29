<script lang="ts">
  import { page } from "$app/stores"
  import GearIcon from '~icons/ri/settings-3-line'
  import DashIcon from '~icons/ri/dashboard-line'
  import ItemListIcon from '~icons/ri/list-settings-line'
  import CableIcon from '~icons/mdi/cable-data'
  import LibraryIcon from '~icons/ri/book-open-line'
  import ToolsIcon from '~icons/ri/tools-line'
  import FlowIcon from "~icons/bi/diagram-3"
  import IOIcon from "~icons/solar/transfer-vertical-bold-duotone"

  $: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-filled-primary' : '');
</script>

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
