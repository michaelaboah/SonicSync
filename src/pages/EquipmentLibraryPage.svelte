<script lang="ts">
    import { Box, Center, Divider, Group, Skeleton, Stack, Text, theme } from '@svelteuidev/core';
    import { queryItems } from '../database/entities/SQLController';
    import { persist } from '../stores/RenderStore';

    $: internalItems = queryItems();
</script>

<Group grow noWrap>
    <Stack align="strech">
        {#await internalItems}
            <Skeleton height="{8}" width="50%" radius="xl" override="{{ marginTop: '8px' }}" class="object-center" />
        {:then items}
            {#each items as { model, category, id, dimensions, notes, cost }}
                <Box css="{{ backgroundColor: $persist.darkMode ? theme.colors.dark400 : theme.colors.dark50 }}" />
                <Group noWrap>
                    <Text>{id}</Text>
                    <Text>{model}</Text>
                    <Text>{category}</Text>
                    <Text>{cost}</Text>
                    <Text>{dimensions?.length}</Text>
                    <Text>{dimensions?.rack_unit}</Text>
                    <Text>{notes}</Text>
                </Group>

                <Divider />
            {/each}
        {:catch error}
            {error}
            <!-- internalItems was rejected -->
        {/await}
    </Stack>
</Group>

<style>
</style>
