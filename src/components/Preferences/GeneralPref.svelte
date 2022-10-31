<script lang="ts">
  import { Box, Switch } from "@svelteuidev/core";
  import { getContext, onMount } from "svelte";
  import { themeKey } from "../../utils/contextKeys";
  import { tauri_store } from "../../stores/renderStore";
  const { toggleDark } = getContext(themeKey);
  let dark: boolean;

  const handleDark = async () => {
    dark = toggleDark();

    const userData: any = await tauri_store.get("preferences");
    await tauri_store.set("preferences", { ...userData, darkmode: dark });
    // const userData = await window.api.handleUserStorage("preferences");
    // await window.api.handleUserStorage("preferences", { ...userData, darkmode: dark });
  };

  onMount(async () => {
    const userData: any = await tauri_store.get("preferences");
    dark = userData.darkmode;
  });
</script>

<Box>
  <Switch
    size="md"
    onLabel="ON"
    offLabel="OFF"
    bind:checked="{dark}"
    on:click="{handleDark}"
    label="Toggle Dark-Mode"
    color="dark"
    aria-label="Toggle Dark-Mode"
  />
  <!-- <button on:click="{() => console.log(toggleDark())}"></button> -->
</Box>
