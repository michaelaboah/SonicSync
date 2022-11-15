<script lang="ts">
  import { Box, Divider, Group, Stack, Switch, Tabs, Title, Tooltip } from "@svelteuidev/core";
  import { persist } from "../stores/renderStore";
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
      <Box class="max-w-screen-2xl w-screen ml-9">
        <AccountPref />
      </Box>
    </Tabs.Tab>
    <Tabs.Tab label="Cloud" override="{{ fontSize }}" class="text-2xl">
      <!--  -->

      <Box class="max-w-screen-2xl w-screen ml-9">
        <Title align="left" mb="lg" order="{3}">Database Settings</Title>
        <Stack>
          <Box m="40">
            <Title align="right" order="{4}">Theme</Title>
            <Divider size="md" />
            <Group position="right">
              <Tooltip
                label="Toggling this option will enable or disable the storage of new pieces of Gear/Items that have been requested from the server."
                openDelay="{400}"
                color="blue"
                withArrow
                arrowSize="{5}"
              >
                <Switch
                  onLabel="ON"
                  offLabel="OFF"
                  label="{'Auto Store New Items'}"
                  size="md"
                  bind:checked="{$persist.sql_auto_store}"
                />
              </Tooltip>
            </Group>
          </Box>
        </Stack>
      </Box>

      <!--  -->
    </Tabs.Tab>
  </Tabs>
</Box>
