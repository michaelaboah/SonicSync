<script lang="ts">
  import { Box, Divider, NativeSelect, Stack, Switch, Title } from "@svelteuidev/core";
  import { persist } from "../../stores/renderStore";
</script>

<Stack align="stretch" spacing="xl">
  <Box>
    <Switch
      size="md"
      onLabel="ON"
      offLabel="OFF"
      bind:checked="{$persist.darkMode}"
      label="Toggle Dark-Mode"
      color="dark"
    />

    <Box>
      <Title order="{3}">Font</Title>
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
