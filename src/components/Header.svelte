<script lang="ts">
    import { push } from 'svelte-spa-router';
    import { ActionIcon, Box, Button, Grid, Header, Image, theme, type SvelteUINumberSize } from '@svelteuidev/core';
    import { Gear } from 'radix-icons-svelte';
    import { project } from '../stores/ProjectStore';
    import { persist } from '../stores/renderStore';

    let BUTTON_SIZE: SvelteUINumberSize = 'sm';

    let isDark = $persist.darkMode ? theme.colors.white.toString() : theme.colors.black.toString();
</script>

<Header fixed height="full" override="{{ mt: '0' }}" pt="10" pb="10">
    <Box>
        <Grid spacing="md" cols="{28}">
            <Grid.Col span="{2}" >
                <ActionIcon
                override={{left: 30, top: 5}}
                    radius="md"
                    size="md"
                    variant="hover"
                    color="{isDark}"
                    
                    on:click="{() => push('#/')}"
                >
                    <img src="src/static-assets/App-Icon.png" alt="" class="icon" />              
                </ActionIcon>
            </Grid.Col>
            <Grid.Col span="{2}">
                <Button size="{BUTTON_SIZE}" radius="sm" on:click="{() => push('#/EquipmentListPage')}"
                    >Equipment List</Button
                >
            </Grid.Col>
            <Grid.Col span="{2}">
                <Button size="{BUTTON_SIZE}" on:click="{() => push('#/ProductionPage')}">Production Page</Button>
            </Grid.Col>
            <Grid.Col span="{2}">
                <Button size="{BUTTON_SIZE}" on:click="{() => {}}" disabled>Fill Page</Button>
            </Grid.Col>
            <Grid.Col span="{2}">
                <Button disabled size="{BUTTON_SIZE}" on:click="{() => {}}">IO List</Button>
            </Grid.Col>
            <Grid.Col span="{2}">
                <Button size="{BUTTON_SIZE}" on:click="{() => push('#/EquipmentLibraryPage')}">Equipment Library</Button
                >
            </Grid.Col>
            <Grid.Col span="{2}">
                <Button size="{BUTTON_SIZE}" on:click="{() => console.log($project)}">Project</Button>
            </Grid.Col>
            <Grid.Col span="{1}" offset="{13}">
                <ActionIcon
                    radius="md"
                    size="md"
                    variant="hover"
                    color="{isDark}"
                    on:click="{() => push('#/PreferencesPage')}"
                >
                    <Gear size="{40}" />
                </ActionIcon>
            </Grid.Col>
        </Grid>
    </Box>
</Header>

<style>
    img {
        transform: scale(1.7);
        margin: 10%;
        border-radius: 100%;
    }
</style>
