<script lang="ts">
 import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
    import { Autocomplete, popup } from '@skeletonlabs/skeleton';
    export let name = ''
    let popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom'
    };

    let searchInput: string = name;
    let users: AutocompleteOption[] = [
        {
            label: 'John',
            value: 'John'
        },
        {
            label: 'Max',
            value: 'Max'
        }
    ];
    const denyList = ['John'];

    function onUserSelection(event: any): void {
        searchInput = event.detail.label;
    }
				
</script>

<ul class="my-1">
  <!-- <p>{name}</p> -->
  <section class="flex flex-row ">
  <div class="w-64">
    <input
      class="input autocomplete h-8"
      type="search"
      name="autocomplete-search"
      bind:value={searchInput}
      placeholder="Search..."
      use:popup={popupSettings}
    />
    <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
        <Autocomplete bind:input={searchInput} bind:options={users} on:selection={onUserSelection} />
    </div>
  </div>
  <div class="flex mb-0.5">
    <div class="flex"><strong class="ml-4 mr-2">Total Cost:</strong><p class="text-secondary-400">$400</p></div>
    <div class="flex"><strong class="ml-4 mr-2">Total Qty:</strong><p>2</p></div>
    <div class="flex"><strong class="ml-4 mr-2">Total Wattage:</strong><p>1.4 Watts</p></div>
  </div>
  </section>
  <section class="flex table-compact mt-2">
  <table class="table table-hover">
    <thead >
      <tr >
        <th class="!p-2">Description</th>
        <th class="!p-2">Purpose</th>
        <th class="!p-2">Quantity</th>
        <th class="!p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
        <tr class="">
          <td class="!py-1 italic text-opacity-30">Some Description</td>
          <td class="!py-1 italic text-opacity-30">Some Purspose</td>
          <td class="!py-1 italic text-opacity-30">Some Quanity</td>
          <td class="">
            <div class="btn-group scale-75 h-8">
              <button class="variant-filled-secondary">Temp</button>
              <button class="variant-filled-tertiary">Info</button>
              <button class="variant-filled-primary">Remove</button>
            </div>
          </td>
        </tr>
        <tr class="h-10">
          <td class="italic text-opacity-30 !pb-0">Some Description</td>
          <td class="italic text-opacity-30 !pb-0">Some Purspose</td>
          <td class="italic text-opacity-30 !pb-0">Some Quanity</td>
          <td class="">
            <div class="btn-group scale-75 h-8">
              <button class="variant-filled-secondary">Temp</button>
              <button class="variant-filled-tertiary">Info</button>
              <button class="variant-filled-primary">Remove</button>
            </div>
          </td>

        </tr>
      </tbody>
  </table>
</section>
</ul>
