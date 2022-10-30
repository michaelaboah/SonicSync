<script lang="ts">
  import { Button, Center, Grid, Header, Kbd, Paper, Stack, Text } from "@svelteuidev/core";
  import { Box, Title } from "@svelteuidev/core";
  import { buildGear, type Gear } from "../Classes";
  import EquipmentComponent from "../components/EquipmentComponent.svelte";
  // import EquipmentHeader from "../components/EquipmentHeader.svelte";
  import { gearList } from "../stores/Store";

  let rest: any;
  const addGear = () => {
    $gearList = [...$gearList, buildGear({ ...({} as Gear), gearId: $gearList.length })];
    gearList.update((n) => n.map((x, index) => (x = { ...x, gearId: (x.gearId = index) })));
    // console.table($gearList);
  };

  function manual_id_update() {
    gearList.update((n) => n.map((x, index) => (x = { ...x, gearId: (x.gearId = index) })));
  }

  $: groups = $gearList.reduce((curr, val) => {
    let group = curr.length ? curr[curr.length - 1] : undefined;
    if (group && group.category === `${val.category}`) {
      group.values.push(val);
    } else {
      curr.push({ category: `${val.category}`, values: [val] });
    }
    return curr;
  }, []);

  $: {
    $gearList.sort((a: Gear, b) => {
      if (a.category > b.category) {
        return -1;
      } else if (a.category < b.category) {
        return +1;
      } else {
        return 0;
      }
    });
  }
</script>

<Header height="10" pb="4">
  <Grid>
    <Grid.Col span="{1}">
      <Button on:click="{addGear}">Add Gear</Button>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Button on:click="{manual_id_update}">Manual Update</Button>
    </Grid.Col>
  </Grid>
</Header>

{#each groups as group}
  <Stack align="stretch" justify="flex-start" spacing="xs">
    <Box css="{{ backgroundColor: '$cyan100' }}">
      <Stack>
        <Title order="{3}">{group.category === undefined ? "New Category" : group.category}</Title>
        {#each group.values as value (value)}
          <EquipmentComponent bind:gear="{value}" bind:index="{value.gearId}" />
        {/each}
      </Stack>
    </Box>
    <br />
  </Stack>
{:else}
  <Center inline={false}>
    <Paper>
      <Text size="xl" align="center">
        Empty list bud, try adding something using the Add Gear button or the
        <Kbd {...rest}>⌘</Kbd> + <Kbd {...rest}>N</Kbd>
      </Text>
    </Paper>
  </Center>
{/each}
