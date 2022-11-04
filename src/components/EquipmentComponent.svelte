<script lang="ts">
  import { Box, Button, CloseButton, Group, NumberInput, Text, TextInput, theme, Tooltip } from "@svelteuidev/core";
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

  const formatter = (value: string | undefined) => {
    if (value) return !Number.isNaN(parseFloat(value)) ? ("$ " + value).replace(/B(?=(d{3})+(?!d))/g, ",") : "$ ";
    else return "Not a Number";
  };

  // const parser = (value: any) => {
  //   return value.replace(/$s?|(,*)/g, "");
  // };

  let isDark = $persist.darkMode ? theme.colors.dark200 : theme.colors.white;
</script>

<Box css="{{ backgroundColor: $persist.darkMode ? theme.colors.dark400 : theme.colors.dark50 }}">
  <Group>
    <div style="{`--background: ${isDark}; `} + {`--border: green`}" class="ml-3 mr-2 w-1/4">
      <Text mt="md" mb="xs" weight="bold" size="{size}">Quick Search Model</Text>
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

    <NumberInput
      defaultValue="{0}"
      bind:value="{gear.quantity}"
      min="{0}"
      size="xs"
      hideControls
      label="Total Quantity"
      class="w-24"
    />

    <div class="w-32">
      <NumberInput bind:value="{gear.cost}" min="{0}" size="xs" label="Initial Cost" formatter="{formatter}" />
    </div>

    <Text weight="bold" size="{size}" m="xs">Total Cost: ${totalCost}</Text>

    <Text weight="bold" size="{size}" m="xs">Total Power Draw: {totalPower}</Text>
    <Button on:click="{addItem}" disabled="{!gear.model}">Add Item</Button>
    <Button on:click="{deleteGear}">Remove Gear: {index}</Button>
  </Group>
  {#each gear.items as { description, itemQuantity, publicNotes, privateNotes, itemId } (itemId)}
    <Group direction="row" ml="sm" mb="sm">
      <TextInput
        size="xs"
        label="Description"
        placeholder="{'Enter Usage / Purpose: '}"
        class="w-1/5"
        bind:value="{description}"
      />
      <div class="w-32">
        <NumberInput
          size="xs"
          label="Quantity"
          min="{0}"
          defaultValue="{0}"
          on:change="{handleItemChange}"
          bind:value="{itemQuantity}"
          formatter="{formatter}"
        />
      </div>
      <TextInput size="xs" label="Public Notes" bind:value="{publicNotes}" />
      <TextInput size="xs" label="Private Notes" bind:value="{privateNotes}" />
      <Tooltip label="Delete Item" openDelay="{300}">
        <CloseButton iconSize="md" on:click="{() => deleteItem(itemId)}" variant="outline" />
      </Tooltip>
    </Group>
    <!-- </SimpleGrid> -->
  {/each}
  <!-- </Grid> -->
</Box>
