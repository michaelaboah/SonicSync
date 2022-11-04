<script lang="ts">
  import { Box, Tabs } from "@svelteuidev/core";
  import AccountPref from "../components/Preferences/AccountPref.svelte";
  import GeneralPref from "../components/Preferences/GeneralPref.svelte";
  const fontSize = 20;
</script>

<Box>
  <Tabs orientation="vertical">
    <Tabs.Tab label="General" override="{{ fontSize }}" class="text-2xl">
      <Box class="max-w-screen-2xl w-screen ml-9">
        <GeneralPref />
      </Box>
    </Tabs.Tab>
    <Tabs.Tab label="Account" override="{{ fontSize }}" class="text-2xl">
      <AccountPref />
    </Tabs.Tab>
    <Tabs.Tab label="Cloud" override="{{ fontSize }}" class="text-2xl">Other Tab Content</Tabs.Tab>
  </Tabs>
</Box>
