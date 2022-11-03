<script lang="ts">
  import { Box, Divider, NativeSelect, Stack, Switch, Title } from "@svelteuidev/core";
  import { getContext, onMount } from "svelte";
  import { themeKey } from "../../utils/contextKeys";
  import { tauri_store } from "../../stores/renderStore";
  import type { UserPreferences } from "src/Classes";
  import { fontSizeTest } from "../../stores/PrefsStore";
  //@ts-ignore
  const { toggleDark } = getContext(themeKey);
  let dark: boolean;

  const handleDark = async () => {
    dark = toggleDark();

    const userData = await tauri_store.get<UserPreferences>("preferences");
    await tauri_store.set("preferences", { ...userData, darkmode: dark } as UserPreferences);
  };

  onMount(async () => {
    const userData = await tauri_store.get<UserPreferences>("preferences");
    console.log(userData);
    if (userData) dark = userData.darkmode;
  });
</script>

<Stack align="stretch" spacing="xl">
  <Box>
    <!-- <Center inline="{true}"> -->
    <Title order="{3}">Appearance</Title>
    <Divider size="md" />
    <Switch
      size="{$fontSizeTest}"
      onLabel="ON"
      offLabel="OFF"
      bind:checked="{dark}"
      on:click="{handleDark}"
      label="Toggle Dark-Mode"
      color="dark"
    />
    <!-- </Center> -->
    <!-- <button on:click="{() => console.log(toggleDark())}"></button> -->
  </Box>

  <!-- <Box>
    <Title order="{3}">Font</Title>
    <Divider size="md" />
    <NativeSelect
      data="{['xs', 'sm', 'md', 'lg', 'xl']}"
      bind:value="{$fontSizeTest}"
      label="Select your prefered Font-Size"
      size="{$fontSizeTest}"
      description="test description"
    />
  </Box> -->
</Stack>
