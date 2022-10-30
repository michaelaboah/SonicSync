<script lang="ts">
  import { Box, Tabs } from "@svelteuidev/core";
  import AccountPref from "../components/Preferences/AccountPref.svelte";
  import GeneralPref from "../components/Preferences/GeneralPref.svelte";
</script>

<Box>
  <Tabs orientation="vertical">
    <Tabs.Tab label="General" override="{{ fontSize: 24 }}">
      <GeneralPref />
    </Tabs.Tab>
    <Tabs.Tab label="Account" override="{{ fontSize: 24 }}">
      <AccountPref />
    </Tabs.Tab>
    <Tabs.Tab label="Cloud" override="{{ fontSize: 24 }}">Other Tab Content</Tabs.Tab>
  </Tabs>
</Box>
