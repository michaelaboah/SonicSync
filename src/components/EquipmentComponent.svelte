<script lang="ts">
  import { Box, Button, CloseButton, Grid, NumberInput, SimpleGrid, Text, TextInput, theme } from "@svelteuidev/core";
  import { buildItem, type Equipment, type Gear, type Item } from "../Classes";
  import { AsyncFuzzyTextSearch } from "../generated/graphql";
  //@ts-ignore
  import Select from "svelte-select";
  import { gearList } from "../stores/ProjectStore";
  import { persist } from "../stores/renderStore";
  let size = $persist.ui_font_size;
  export let gear: Gear;
  export let index: number;
  $: totalCost = gear.quantity * gear.cost;
  $: totalPower = gear.quantity * (gear.powerDraw ??= 0);

  const asyncTest = async (fillerText: string) => {
    const response = await AsyncFuzzyTextSearch({ variables: { fuzzySearch: fillerText } });
    return response.data.fuzzyTextSearch;
  };

  const addItem = () => {
    gear.items = [...gear.items, buildItem({ ...({} as Item), itemId: gear.items.length })];
  };
  const deleteItem = (itemId: number) => {
    gear.items.splice(itemId, 1);
    gear.items = gear.items.map((x, index) => (x = { ...x, itemId: (x.itemId = index) }));
  };

  const deleteGear = () => {
    $gearList.splice(index, 1);
    $gearList = $gearList.map((x, index) => (x = { ...x, gearId: (x.gearId = index) }));
  };

  //handle total item count
  const handleItemChange = () => {
    const sum = gear.items.map((item) => item.itemQuantity);
    gear.quantity = sum.reduce((partial, i) => partial + i, 0);
  };

  // const handleCreateGear = (newGear: Equipment) => {
  //   let createEquip = buildEquipment();
  //   return ($gearList[index] = createEquip);
  // };

  const handleSelect = (e: { detail: Equipment }) => {
    gear = { ...gear, ...e.detail };
    $gearList[index] = gear;
  };

  function getModel(e: any) {
    return e.model;
  }
</script>

<Box css="{{ backgroundColor: $persist.darkMode ? theme.colors.dark400 : theme.colors.dark100 }}">
  <Grid cols="{12}" grow>
    <Grid.Col span="{3}">
      <Text weight="bold" size="{size}" m="xs">Quick Search Model</Text>
      <div class="autocomplete">
        <Select
          value="{gear.model}"
          loadOptions="{asyncTest}"
          placeholder=""
          on:select="{handleSelect}"
          getSelectionLabel="{getModel}"
          getOptionLabel="{getModel}"
          optionIdentifier="model"
        />
      </div>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="{size}" m="xs">Total Quantity</Text>
      <NumberInput defaultValue="{0}" bind:value="{gear.quantity}" min="{0}" size="sm" hideControls />
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="{size}" m="xs">Initial Cost</Text>
      <NumberInput bind:value="{gear.cost}" min="{0}" size="sm" />
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="{size}" m="xs">Total Cost: ${totalCost}</Text>
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="{size}" m="xs">Total Power Draw: {totalPower}</Text>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Button on:click="{addItem}" disabled="{!gear.model}">Add Item</Button>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Button on:click="{deleteGear}">Remove Gear: {index}</Button>
    </Grid.Col>
    {#each gear.items as { description, itemQuantity, publicNotes, privateNotes, itemId } (itemId)}
      <SimpleGrid cols="{6}" ml="lg" mb="lg">
        <TextInput label="Description" placeholder="{'Enter Usage / Purpose: '}" bind:value="{description}" />
        <NumberInput label="Quantity" min="{0}" on:change="{handleItemChange}" bind:value="{itemQuantity}" />
        <TextInput label="Public Notes" bind:value="{publicNotes}" />
        <TextInput label="Private Notes" bind:value="{privateNotes}" />
        <CloseButton iconSize="md" on:click="{() => deleteItem(itemId)}" variant="outline" />
      </SimpleGrid>
    {/each}
  </Grid>
</Box>

<style>
  .autocomplete {
    margin-left: 1vw;
  }
</style>
