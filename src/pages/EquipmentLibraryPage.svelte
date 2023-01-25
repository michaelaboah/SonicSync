<script lang="ts">
    import { Box, Button, Divider, Footer, Grid, Group, NumberInput, Skeleton, Stack, Text, theme } from '@svelteuidev/core';
    import { persist } from '../stores/RenderStore';
    import { useStylesDisabled } from '../utils/styles';
    import { invoke } from '@tauri-apps/api/tauri';
    import {listen} from "@tauri-apps/api/event"
    import type { Item } from 'src/generated/graphql';

    $: internalItems = invoke<Item[]>("find_all_items")
    $: ({ cx, getStyles } = useStylesDisabled());
</script>

<!-- 
<Group > -->
<Box />
<Stack align="strech" spacing="xs">
    <Grid cols="{7}" spacing="xs">
        <Grid.Col span="{1}" override="{{ maxWidth: 80 }}"><Text align="center" size="lg">Item ID</Text></Grid.Col>
        <Grid.Col span="{1}"><Text weight="bold" align="center" size="lg">Model</Text></Grid.Col>
        <Grid.Col span="{1}"><Text weight="bold" align="center" size="lg">Category</Text></Grid.Col>
        <Grid.Col span="{1}"><Text weight="bold" align="center" size="lg">Cost</Text></Grid.Col>
        <Grid.Col span="{1}"><Text weight="bold" align="center" size="lg">Dimensions</Text></Grid.Col>
        <Grid.Col span="{1}"><Text weight="bold" align="center" size="lg">Rack Units</Text></Grid.Col>
        <Grid.Col span="{1}"><Text weight="bold" align="center" size="lg">Notes</Text></Grid.Col>
    </Grid>

    {#await internalItems}

    <Skeleton height="{8}" width="50%" radius="xl" override="{{ marginTop: '8px' }}" class="object-center" />
    {:then items}
    <button on:click="{() => console.log(internalItems)}">Test</button>
    {#key items}
        {#each items as { model, category, id, dimensions, notes, cost } (id)}
            <Box
                css="{{
                    backgroundColor: $persist.darkMode ? theme.colors.dark300 : theme.colors.gray300,
                    borderStyle: 'solid',
                    borderWidth: 2,
                    borderColor: '$blue900',
                    borderRadius: '$lg',
                }}"
                p="1"
            >
                <Grid cols="{8}" spacing="xs">
                    <Grid.Col span="{1}" override="{{ maxWidth: 80 }}">{id}</Grid.Col>
                    <Grid.Col span="{1}">{model}</Grid.Col>
                    <Grid.Col span="{1}">{category}</Grid.Col>
                    <Grid.Col span="{1}">${cost ?  cost : "N/A"}</Grid.Col>
                    <Grid.Col span="{1}">{dimensions?.length}</Grid.Col>
                    <Grid.Col span="{1}">{dimensions?.rack_unit ? dimensions.rack_unit : 'N/A'}</Grid.Col>
                    <Grid.Col span="{1}">{notes ? notes : 'N/A'}</Grid.Col>
                    <Grid.Col span="{1}" class=""><Button color="red" on:click={async() => {
                        invoke("delete_single_item", {id}); 
                        internalItems = invoke('find_all_items');
                        }}>Delete</Button></Grid.Col>
                </Grid>
            </Box>
            <Divider />
        {/each}
        {/key}
    {:catch error}
        {error}
        <!-- internalItems was rejected -->
    {/await}
</Stack>

<Footer fixed height="35" p="md">
    <Group>
        <Text>Total Items Stored:</Text>
        <div class="w-24">
            {#await internalItems}
                <NumberInput value="{999}" min="{0}" size="xs" hideControls disabled class="{cx(getStyles())}" />
            {:then items}
                <NumberInput
                    value="{items.length}"
                    min="{0}"
                    size="xs"
                    hideControls
                    disabled
                    class="{cx(getStyles())}"
                />
            {:catch error}
                <NumberInput value="{0}" min="{0}" size="xs" hideControls disabled />
            {/await}
        </div>
    </Group>
</Footer>

<!-- </Group> -->
<style>
</style>
