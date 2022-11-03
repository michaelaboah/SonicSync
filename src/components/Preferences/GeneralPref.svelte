<script lang="ts">
  import { Box, Divider, NativeSelect, Stack, Switch, Title } from "@svelteuidev/core";
  import { persist } from "../../stores/renderStore";
</script>

<Title align="right" mb="lg" order="{3}">Appearance</Title>
<Stack align="stretch" spacing="xl">
  <Box m="40">
    <Title order="{4}">Theme</Title>
    <Divider size="md" />
    <Switch
      size="md"
      mt="lg"
      onLabel="ON"
      offLabel="OFF"
      bind:checked="{$persist.darkMode}"
      label="Toggle Dark-Mode"
      color="dark"
    />

    <Box>
      <Title order="{4}">Font</Title>
      <Divider size="md" />
      <NativeSelect
        data="{['xs', 'sm', 'md', 'lg', 'xl']}"
        bind:value="{$persist.ui_font_size}"
        label="Select your prefered Font-Size"
        size="{$persist.ui_font_size}"
        description="test description"
      />
    </Box>
  </Box>
</Stack>
