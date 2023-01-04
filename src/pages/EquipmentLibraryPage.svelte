<script lang="ts">
    import { Box, Divider, Footer, Grid, Group, NumberInput, Skeleton, Stack, Text, theme } from '@svelteuidev/core';
    import { queryItems } from '../database/entities/SQLController';
    import { persist } from '../stores/RenderStore';
    import { useStylesDisabled } from '../utils/styles';

    $: internalItems = queryItems();
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
                <Grid cols="{7}" spacing="xs">
                    <Grid.Col span="{1}" override="{{ maxWidth: 80 }}">{id}</Grid.Col>
                    <Grid.Col span="{1}">{model}</Grid.Col>
                    <Grid.Col span="{1}">{category}</Grid.Col>
                    <Grid.Col span="{1}">$ {cost}</Grid.Col>
                    <Grid.Col span="{1}">{dimensions?.length}</Grid.Col>
                    <Grid.Col span="{1}">{dimensions?.rack_unit}</Grid.Col>
                    <Grid.Col span="{1}">{notes}</Grid.Col>
                </Grid>
            </Box>
            <Divider />
        {/each}
    {:catch error}
        {error}
        <!-- internalItems was rejected -->
    {/await}
</Stack>

<Footer fixed height="35" p="xl">
    <Group>
        <Text>Total Items Stored:</Text>
        <div class="w-24">
            <NumberInput value="{5}" min="{0}" size="xs" hideControls disabled class="{cx(getStyles())}" />
        </div>
    </Group>
</Footer>

<!-- </Group> -->
<style>
</style>
