<script lang="ts">
  import { listen } from "@tauri-apps/api/event";
  import { onMount } from "svelte";
  import CommandPalette, { defineActions, createStoreMethods } from "svelte-command-palette";
  import { push } from "svelte-spa-router";

  // define actions using the defineActions API

  const paletteMethods = createStoreMethods();

  const actions = defineActions([
    {
      actionId: 1,
      title: "Go to Main Page",
      // subTitle: ""
      onRun: () => push("#/"),
      shortcut: "$mod+1",
    },
    {
      actionId: 2,
      title: "Go to Main Page",
      // subTitle: ""
      onRun: () => push("#/EquipmentListPage"),
      shortcut: "$mod+1",
    },
    // {actionId: 3},
    // {actionId: 4},
    // {actionId: 5},
    // {actionId: 6},
    // {actionId: 7},
    { actionId: 8, title: "Go to Production Page", onRun: () => push("#/ProductionPage"), shortcut: "$mod+8" },
  ]);

  onMount(async () => {
    await listen("toggle-palette", (_event) => {
      paletteMethods.openPalette();
    });
  });
</script>

<CommandPalette commands="{actions}" />
<slot />

<style>
</style>
