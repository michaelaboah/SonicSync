<script lang="ts">
  import { RevoGrid } from '@revolist/svelte-datagrid';
  import { defineCustomElements } from '@revolist/revogrid/loader';
  import { ioList } from '../stores/ProjectStore';
  import { persist } from '../stores/renderStore';
  import { columns } from './Sheets.utils';
  import { Group, Title } from '@svelteuidev/core';
  defineCustomElements();
</script>

<Group direction="row" position="center" grow>
  <div class="revo-grid">
    <Title align="center">Input List</Title>
    <RevoGrid
      resize="{false}"
      autoSizeColumn
      range
      useClipboard
      filter
      canMoveColumns
      source="{$ioList.input_list}"
      columns="{columns}"
      theme="{$persist.darkMode ? 'darkMaterial' : 'material'}"
    />
  </div>
  <div class="revo-grid">
    <Title align="center">Output List</Title>
    <RevoGrid
      resize="{false}"
      autoSizeColumn
      range
      useClipboard
      filter
      canMoveColumns
      source="{$ioList.input_list}"
      columns="{columns}"
      theme="{$persist.darkMode ? 'darkMaterial' : 'material'}"
    />
  </div>
</Group>

<style>
  .revo-grid {
    height: 88vh;
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
