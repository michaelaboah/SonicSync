<script lang="ts">
    import { RevoGrid } from '@revolist/svelte-datagrid';
    import { defineCustomElements } from '@revolist/revogrid/loader';
    import { ioList } from '../../stores/ProjectStore';
    import { persist } from '../../stores/RenderStore';
    import { input_columns, output_columns, transformArray } from './Sheets.utils';
    import { Box, Footer, Group, NumberInput, SimpleGrid, Title } from '@svelteuidev/core';
    defineCustomElements();

    let numberOfInputs = $ioList.input_list.length;
    $: $ioList.input_list = [...transformArray($ioList.input_list, numberOfInputs)];

    let numberOfOutputs = $ioList.output_list.length;
    $: $ioList.output_list = [...transformArray($ioList.output_list, numberOfOutputs)];

    let inputGrid: RevoGrid;
    let outputGrid: RevoGrid;

    // outputGrid.getSelectedRange();
</script>

<Group direction="row" position="center" grow>
    <div class="revo-grid">
        <Title align="center">Input List</Title>
        <RevoGrid
            bind:this="{inputGrid}"
            resize="{false}"
            autoSizeColumn
            range
            useClipboard="{true}"
            filter
            canMoveColumns
            source="{$ioList.input_list}"
            columns="{input_columns}"
            theme="{$persist.darkMode ? 'darkMaterial' : 'material'}"
        />
    </div>
    <div class="revo-grid">
        <Title align="center">Output List</Title>
        <RevoGrid
            bind:this="{outputGrid}"
            resize="{false}"
            autoSizeColumn
            range
            useClipboard="{true}"
            filter
            canMoveColumns
            source="{$ioList.output_list}"
            columns="{output_columns}"
            theme="{$persist.darkMode ? 'darkMaterial' : 'material'}"
            on:beforerangeedit="{async () => console.log(outputGrid.$$.ctx[8])}"
        />
    </div>
</Group>
<Footer height="20" class="border-8" mt="lg">
    <SimpleGrid cols="{6}" m="{5}" spacing="lg">
        <Box>
            <NumberInput label="Number of Inputs" size="xs" min="{1}" step="{1}" bind:value="{numberOfInputs}" />
        </Box>
        <Box>
            <NumberInput label="Number of Outputs" size="xs" min="{1}" step="{1}" bind:value="{numberOfOutputs}" />
        </Box>
    </SimpleGrid>
</Footer>

<style>
    .revo-grid {
        height: 80vh;
        padding-top: 1vh;
        padding-left: 1vh;
        padding-bottom: 3vh;
        /* max-width: 50vw; */
        border: 1px;
        border-style: solid;
        border-color: grey;
    }

    .revo-grid::-webkit-scrollbar {
        display: none;
    }
</style>
