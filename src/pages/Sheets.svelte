<script lang="ts">
  import { RevoGrid } from '@revolist/svelte-datagrid';
  import { defineCustomElements } from '@revolist/revogrid/loader';
  import { ioList } from '../stores/ProjectStore';
  import { persist } from '../stores/renderStore';
  import { headerGrab } from './Sheets.utils.jsx';
  defineCustomElements();
  const columns = [
    {
      name: 'Channel #: ',
      prop: 'channel',
      size: 140,
      sortable: true,
    },
    {
      name: 'Input Device: ',
      prop: 'input_device',
      size: 150,
      autoSize: true,

      //Changes the cursor to indicate that this column can be moved.
      headerGrab,
      //     'div',
      //     {
      //       style: {
      //         cursor: 'grab',
      //       },
      //     },
      //     column.name
      //   );
      // },
    },
    {
      name: 'Source Description: ',
      prop: 'input_description',
      size: 200,
      headerGrab,
    },
    {
      name: 'Note: ',
      prop: 'note',
      size: 200,
    },
  ];
</script>

<div class="revo-grid">
  <RevoGrid
    source="{$ioList.input_list}"
    columns="{columns}"
    resize
    theme="{$persist.darkMode ? 'darkMaterial' : 'material'}"
    range
    useClipboard
    filter
    canMoveColumns
    autoSizeColumn="{{ allColumns: true, mode: 'autoSizeAll' }}"
  />
</div>

<style>
  .revo-grid {
    height: 88vh;
  }
</style>
