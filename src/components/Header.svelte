<script lang="ts">
  import { push } from "svelte-spa-router";
  import { ActionIcon, Box, Button, Grid, Header } from "@svelteuidev/core";
  import { Gear } from "radix-icons-svelte";
  import { project } from "../stores/Store";
</script>

<Header fixed height="40" m="10">
  <Box>
    <Grid spacing="md" cols="{24}">
      <Grid.Col span="{2}">
        <ActionIcon ml="lg" mr="lg" radius="md" size="md" variant="hover" color="dark" on:click="{() => push('#/')}">
          <div on:click="{() => push('/')}">Logo or Other</div>
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button radius="sm" on:click="{() => push('#/EquipmentListPage')}">Equipment List</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button fullSize on:click="{() => push('#/ProductionPage')}">Production Page</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button on:click="{() => push('#/PreferencesPage')}">Remove Me</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button on:click="{() => console.log($project.productionInformation)}">Project</Button>
      </Grid.Col>
      <Grid.Col span="{1}" offset="{13}">
        <ActionIcon radius="md" size="md" variant="hover" color="dark" on:click="{() => push('#/PreferencesPage')}">
          <Gear size="{40}" />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  </Box>
</Header>

<style>
</style>
