<script lang="ts">
  import { Box, Tabs } from "@svelteuidev/core";
  import AccountPref from "../components/Preferences/AccountPref.svelte";
  import GeneralPref from "../components/Preferences/GeneralPref.svelte";
  const fontSize = 20;
</script>

<Box>
  <Tabs orientation="vertical">
    <Tabs.Tab label="General" override="{{ fontSize }}">
      <GeneralPref />
    </Tabs.Tab>
    <Tabs.Tab label="Account" override="{{ fontSize }}">
      <AccountPref />
    </Tabs.Tab>
    <Tabs.Tab label="Cloud" override="{{ fontSize }}">Other Tab Content</Tabs.Tab>
  </Tabs>
</Box>
