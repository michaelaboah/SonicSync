<script lang="ts">
  import {
    Box,
    Button,
    CloseButton,
    createStyles,
    Grid,
    Group,
    NumberInput,
    Text,
    TextInput,
    theme,
    Tooltip,
  } from "@svelteuidev/core";
  import { buildItem, type Gear, type Item } from "../Classes";
  import { AsyncGlobalItemSearch, type Item as ItemGraphql } from "../generated/graphql";
  //@ts-ignore
  import Select from "svelte-select";
  import { gearList } from "../stores/ProjectStore";
  import { persist } from "../stores/renderStore";
  let size = $persist.ui_font_size;
  export let gear: Gear;
  export let index: number;

  $: if (gear.category) {
    basePower = gear[gear.category.toLowerCase()].power.wattage as number;
  }

  let basePower: number = 0;
  $: totalCost = gear.quantity * (gear.cost ??= 0);
  $: totalPower = (gear.quantity * basePower) as number;

  const asyncTest = async (fillerText: string) => {
    const response = await AsyncGlobalItemSearch({ variables: { model: fillerText } });
    return response.data.fuzzyItemSearch;
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

  const handleSelect = (e: { detail: ItemGraphql }) => {
    gear = { ...gear, ...e.detail };
    $gearList[index] = gear;
  };

  function getModel(e: any) {
    return e.model;
  }

  const numberFormatter = (value: string | undefined) => {
    if (value) return !Number.isNaN(parseFloat(value)) ? ("$ " + value).replace(/B(?=(d{3})+(?!d))/g, ",") : "$ ";
    else return "Not a Number";
  };

  const wattageFormatter = (value: string | undefined) => {
    if (value) return !Number.isNaN(parseFloat(value)) ? `${value} watts` : "bad";
    else return "N/A";
  };

  const useStylesDisabled = createStyles((theme) => ({
    root: {
      textAlign: "center",
      "& input:disabled": {
        backgroundColor: "white !important",
        color: "black !important",
        border: "1px solid var(--svelteui-colors-gray400) !important",
        opacity: "1 !important",
        // width: "6rem",
        [`${theme.dark} &`]: {
          // using of SvelteUI utilities
          // bc === backgroundColor
          backgroundColor: theme.colors.dark800 + "!important",
          opacity: "1 !important",
          color: "white !important",
          border: "0px solid var(--svelteui-colors-gray400) !important",
        },
      },
    },
  }));

  $: ({ cx, getStyles } = useStylesDisabled());

  let isDark = $persist.darkMode ? theme.colors.dark200 : theme.colors.white;
</script>

<Box css="{{ backgroundColor: $persist.darkMode ? theme.colors.dark400 : theme.colors.dark50 }}">
  <Grid grow>
    <Grid.Col span="{9}">
      <Group>
        <div style="{`--background: ${isDark}; `} + {`--border: green`}" class="ml-3 mr-2 w-1/4">
          <Text mt="md" mb="xs" weight="normal" size="{size}">Quick Search Model</Text>
          <Select
            value="{gear.model}"
            loadOptions="{asyncTest}"
            placeholder="placeholder"
            on:select="{handleSelect}"
            getSelectionLabel="{getModel}"
            getOptionLabel="{getModel}"
            optionIdentifier="model"
          />
        </div>
        <div class="w-24">
          <NumberInput
            defaultValue="{0}"
            bind:value="{gear.quantity}"
            min="{0}"
            size="xs"
            hideControls
            label="Total Quantity"
            disabled
            class="{cx(getStyles())}"
          />
        </div>
        <Tooltip
          closeDelay="{300}"
          label="This is the Initial or Default cost of this Item, please change as necessary"
          wrapLines
          width="{200}"
          withArrow
          arrowSize="{4}"
          color="indigo"
          override="{{ textAlign: 'center' }}"
        >
          <div class="w-32">
            <NumberInput
              bind:value="{gear.cost}"
              min="{0}"
              defaultValue="{basePower}"
              size="xs"
              label="Initial Cost"
              formatter="{numberFormatter}"
            />
          </div>
        </Tooltip>
        <div class="w-32">
          <NumberInput
            value="{totalCost}"
            min="{0}"
            size="xs"
            label="Total Cost"
            hideControls
            formatter="{numberFormatter}"
            disabled
            class="{cx(getStyles())}"
          />
        </div>

        <div class="w-32">
          <NumberInput
            value="{totalPower}"
            min="{0}"
            size="xs"
            label="Total Power Usage"
            hideControls
            formatter="{wattageFormatter}"
            disabled
            defaultValue="{0}"
            class="{cx(getStyles())}"
          />
        </div>
        <!-- <Text weight="bold" size="{size}" m="xs">Total Cost: ${totalCost}</Text> -->
        <!-- <Text weight="bold" size="{size}" m="xs">Total Power Draw: {totalPower}</Text> -->
      </Group>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Group position="left" mt="xl">
        <Button compact on:click="{addItem}" disabled="{!gear.model}">Add Item</Button>
        <Button compact on:click="{deleteGear}">Remove Gear: {index}</Button>
      </Group>
    </Grid.Col>
  </Grid>
  {#each gear.items as { description, itemQuantity, publicNotes, privateNotes, itemId } (itemId)}
    <Group direction="row" ml="sm" mb="sm" mt="sm">
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
        />
      </div>
      <TextInput size="xs" label="Public Notes" bind:value="{publicNotes}" />
      <TextInput size="xs" label="Private Notes" bind:value="{privateNotes}" labelProps="{{ color: 'red' }}" />
      <Tooltip label="Delete Item" openDelay="{300}">
        <CloseButton iconSize="md" on:click="{() => deleteItem(itemId)}" variant="outline" mt="lg" />
      </Tooltip>
    </Group>
    <!-- </SimpleGrid> -->
  {/each}
  <!-- </Grid> -->
</Box>
