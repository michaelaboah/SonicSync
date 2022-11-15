<script lang="ts">
  import { push } from "svelte-spa-router";
  import { ActionIcon, Box, Button, Grid, Header, theme, type SvelteUINumberSize } from "@svelteuidev/core";
  import { Gear } from "radix-icons-svelte";
  import { project } from "../stores/ProjectStore";
  import { persist } from "../stores/renderStore";
  let BUTTON_SIZE: SvelteUINumberSize = "sm";

  let isDark = $persist.darkMode ? theme.colors.white.toString() : theme.colors.black.toString();
</script>

<Header fixed height="full" override="{{ mt: '0' }}" pt="10" pb="10">
  <Box>
    <Grid spacing="md" cols="{24}">
      <Grid.Col span="{2}">
        <ActionIcon
          ml="lg"
          mr="lg"
          radius="md"
          size="md"
          variant="hover"
          color="{isDark}"
          on:click="{() => push('#/')}"
        >
          <div on:click="{() => push('/')}">Logo or Other</div>
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button size="{BUTTON_SIZE}" radius="sm" on:click="{() => push('#/EquipmentListPage')}">Equipment List</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button size="{BUTTON_SIZE}" on:click="{() => push('#/ProductionPage')}">Production Page</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button size="{BUTTON_SIZE}" on:click="{() => push('#/DatabaseView')}">Database Page</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button size="{BUTTON_SIZE}" on:click="{() => console.log($project.productionInformation)}">Project</Button>
      </Grid.Col>
      <Grid.Col span="{1}" offset="{13}">
        <ActionIcon radius="md" size="md" variant="hover" color="{isDark}" on:click="{() => push('#/PreferencesPage')}">
          <Gear size="{40}" />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  </Box>
</Header>

<style>
</style>
