<script lang="ts">
    import {
        Badge,
        Box,
        Button,
        CloseButton,
        Grid,
        Group,
        NumberInput,
        Text,
        TextInput,
        theme,
        Tooltip,
    } from '@svelteuidev/core';
    import { buildItem, type Gear, type Item } from '../Classes';
    import { AsyncFuzzyItemSearch, type Item as ItemGraphql } from '../generated/graphql';
    //@ts-ignore
    import Select from 'svelte-select';
    import { gearList } from '../stores/ProjectStore';
    import { persist } from '../stores/RenderStore';
    import { useStylesDisabled, costFormatter, wattageFormatter } from '../utils/styles';
    import { invoke } from '@tauri-apps/api/tauri';

    export let gear: Gear;
    export let index: number;

    let size = $persist.ui_font_size;
    // let cat: string = gear.category.toLowerCase();
    //Find how to get the power from within the sub-category
    let basePower = 0;
    $: totalCost = gear.quantity * (gear.cost ??= 0);
    $: totalPower = (gear.quantity * basePower) as number;

    // $: console.log(gear.model);
    const quickSearch = async (modelName: string) => {
        const databaseResponse = await invoke<Item[]>('find_similar_item', { model: modelName });
        if (databaseResponse.length === 0) {
            const serverResponse = await AsyncFuzzyItemSearch({ variables: { model: modelName } });
            return serverResponse.data.fuzzyItemSearch;
        }
        return databaseResponse;
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

        if ($persist.sql_auto_store) {
            invoke('insert_single_item', { json: gear });
        }
    };

    function getModel(e: any) {
        return e.model;
    }

    $: ({ cx, getStyles } = useStylesDisabled());

    let isDark = $persist.darkMode ? theme.colors.dark200 : theme.colors.white;

    $: promise_stored = false;
    //Need to get errors back from commands necessary traits must be impl
    // item_exists(gear.model);
</script>

<Box css="{{ backgroundColor: $persist.darkMode ? theme.colors.dark400 : theme.colors.dark50 }}">
    <Grid grow>
        <Grid.Col span="{9}">
            <Group>
                <!-- Select Fuzzy Search -->
                <div style="{`--background: ${isDark}; `} + {`--border: green`}" class="ml-3 mr-2 w-1/4">
                    <Group noWrap position="apart">
                        <Text inherit mt="md" mb="xs" weight="normal" size="{size}">Quick Search Model</Text>
                        <!-- {@const thing = insert_item(gear)} -->
                        {#await promise_stored then value}
                            <!-- {value}   -->
                            {#if typeof value === 'boolean' && value === true}
                                <Tooltip label="This item is stored locally." openDelay="{1300}">
                                    <Badge>Stored!</Badge>
                                </Tooltip>
                            {/if}
                        {/await}
                    </Group>
                    <!-- Add limit of 4 -->
                    <Select
                        value="{gear.model}"
                        loadOptions="{quickSearch}"
                        placeholder="Placeholder"
                        on:select="{handleSelect}"
                        getSelectionLabel="{getModel}"
                        getOptionLabel="{getModel}"
                        optionIdentifier="model"
                    />
                </div>
                <!-- Quantity -->
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
                <!-- Cost -->
                <div>
                    <Tooltip
                        closeDelay="{1300}"
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
                                formatter="{costFormatter}"
                            />
                        </div>
                    </Tooltip>
                </div>
                <!-- Total Cost -->
                <div class="w-32">
                    <NumberInput
                        value="{totalCost}"
                        min="{0}"
                        size="xs"
                        label="Total Cost"
                        hideControls
                        formatter="{costFormatter}"
                        disabled
                        class="{cx(getStyles())}"
                    />
                </div>
                <!-- Total Power -->
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
                <!-- <Text inherit weight="bold" size="{size}" m="xs">Total Cost: ${totalCost}</Text> -->
                <!-- <Text inherit weight="bold" size="{size}" m="xs">Total Power Draw: {totalPower}</Text> -->
            </Group>
        </Grid.Col>
        <Grid.Col span="{1}">
            <Group position="left" mt="xl" direction="column">
                <Button compact on:click="{addItem}" disabled="{!gear.model}">Add Item</Button>
                <Button compact on:click="{deleteGear}">Remove Gear</Button>
            </Group>
        </Grid.Col>
    </Grid>
    {#each gear.items as { description, itemQuantity, publicNotes, privateNotes, itemId } (itemId)}
        <Group direction="row" ml="sm" mb="sm" mt="sm">
            <!-- Description -->
            <TextInput
                size="xs"
                label="Description"
                placeholder="{'Enter Usage / Purpose: '}"
                class="w-1/5"
                bind:value="{description}"
            />
            <!-- Quantity -->
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
