<script>
  import { RevoGrid } from '@revolist/svelte-datagrid';
  // import { defineCustomElements } from '@revolist/revogrid/loader';
  // import SelectTypePlugin from "@revolist/revogrid-column-select";

  // defineCustomElements();

  const columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Eyes', prop: 'eyeColor', pin: 'colPinStart' },
    { name: 'Company', prop: 'company', pin: 'colPinEnd' },
  ];

  let source = [{ 1: 'Hello', 2: 'World' }];
</script>

<div class="h-80">
  <RevoGrid source="{source}" resize="true" columns="{columns}" theme="material" />
</div>
