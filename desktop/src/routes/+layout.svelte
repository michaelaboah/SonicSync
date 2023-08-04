<script lang="ts">
  import "../theme.postcss";
  import "@skeletonlabs/skeleton/styles/skeleton.css"
	import '../app.postcss';
  import {AppShell} from "@skeletonlabs/skeleton"

  let selectedPage = undefined
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-48 p-4">
  <svelte:fragment slot="sidebarLeft">
    <nav class="list-nav">
      <ul>
        <li class="btn btn-sm variant-filled-primary"><a href="/">Dashboard</a></li>
        <li><a href="/equipment-list">Equipment List</a></li>
        <li><a href="/cable-list">Cable List</a></li>
        <li><a href="/cable-list">Equipment Library</a></li>
        <li><a href="/production-settings">Production Settings</a></li>
        <li class="absolute bottom-0"><a href="/preferences">Preferences</a></li>
      <ul>
    </nav>
  </svelte:fragment>

  <slot />
</AppShell>
