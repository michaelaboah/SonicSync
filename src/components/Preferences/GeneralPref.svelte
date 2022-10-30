<script lang="ts">
  import { Box, Switch } from "@svelteuidev/core";
  import { getContext, onDestroy, onMount } from "svelte";
  import { themeKey } from "../../utils/contextKeys";
  const { toggleDark } = getContext(themeKey);
  let dark: boolean;

  const handleDark = async () => {
    dark = toggleDark();
    const userData = await window.api.handleUserStorage("preferences");
    await window.api.handleUserStorage("preferences", { ...userData, darkmode: dark });
  };

  onMount(async () => {
    const userData = await window.api.handleUserStorage("preferences");
    dark = userData.darkmode;
  });
</script>

<Box>
  <Switch
    size="xl"
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
