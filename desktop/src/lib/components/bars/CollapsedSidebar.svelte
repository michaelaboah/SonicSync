<script lang="ts">
  import GearIcon from '~icons/ri/settings-3-line'
  import DashIcon from '~icons/ri/dashboard-line'
  import ItemListIcon from '~icons/ri/list-settings-line'
  import CableIcon from '~icons/mdi/cable-data'
  import LibraryIcon from '~icons/ri/book-open-line'
  import ToolsIcon from '~icons/ri/tools-line'
  import FlowIcon from "~icons/bi/diagram-3"
  import IOIcon from "~icons/solar/transfer-vertical-bold-duotone"
  import ArrowIcon from "~icons/simple-line-icons/arrow-up"
  import { page } from "$app/stores"

  $: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-filled-primary' : '');
</script>

<nav class="list-nav pt-6">
  <ul>
    <li><a href="/" class="{classesActive('/')}  mb-2.5">
      <span><DashIcon/></span>
    </a></li>
    <li><a class="{classesActive('/equipment-list')} mb-2.5" href="/equipment-list">
      <span><ItemListIcon/></span>
    </a></li>
    <li><a class="{classesActive('/cable-list')} mb-2.5" href="/cable-list">
      <span class=""><CableIcon/></span>
    </a></li>
    <li><a class="{classesActive('/flow')} mb-2.5" href="/flow">
      <span class=""><FlowIcon/></span>
    </a></li>
    <li><a class="{classesActive('/io-list')} mb-2.5" href="/io-list">
      <span class=""><IOIcon/></span>
    </a></li>
    <li><a class="{classesActive('/equipment-library')} mb-2.5" href="/equipment-library">
      <span><LibraryIcon/></span>
    </a></li>
    <li><a class="{classesActive('/production-settings')} mb-2.5" href="/production-settings">
      <span><ToolsIcon/></span>
    </a></li>
    <li class="fixed bottom-0 my-auto pb-4">
      <hr class="mb-1"/>
      <div class="flex flex-row">
      <a href="/preferences" class="{classesActive('/preferences')} mb-2.5">
        <span><GearIcon/></span>
      </a>
      </div>
    </li>
  <ul>
</nav>


