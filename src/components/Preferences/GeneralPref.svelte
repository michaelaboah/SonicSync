<script lang="ts">
  import { Box, Divider, Group, NativeSelect, Space, Stack, Switch, Title } from "@svelteuidev/core";
  import { persist } from "../../stores/renderStore";
</script>

<Title align="left" mb="lg" order="{3}">Appearance</Title>
<Stack align="stretch" spacing="{'xl'}">
  <Box m="40">
    <Title align="right" order="{4}">Theme</Title>
    <Divider size="md" />
    <Group position="right">
      <Switch
        size="md"
        m="xl"
        onLabel="ON"
        offLabel="OFF"
        bind:checked="{$persist.darkMode}"
        label="Toggle Dark-Mode"
        color="dark"
      />
    </Group>
  </Box>

  <Box m="40">
    <Group position="right" grow ml="lg">
      <Space />
      <Box>
        <Title align="right" order="{4}">Font</Title>
        <Divider size="md" />
        <Group position="right" grow>
          <Space />
          <NativeSelect
            data="{['xs', 'sm', 'md', 'lg', 'xl']}"
            bind:value="{$persist.ui_font_size}"
            label="Select your prefered Font-Size"
            size="{$persist.ui_font_size}"
            description="test description"
          />
        </Group>
      </Box>
    </Group>
  </Box>
</Stack>
