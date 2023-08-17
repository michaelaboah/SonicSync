<script lang="ts">
  import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
  import { Autocomplete, popup } from '@skeletonlabs/skeleton';
  import type { Equip } from "$lib/@types/equipment"
  import { queryStore, gql, getContextClient } from "@urql/svelte"


  // const { data } = query(graphql(`
  //   query SearchModel($model: String!) {
  //     fuzzy_by_model(model_name: $model){
  //       model
  //     }
  //   }
  // `))
  $: items = queryStore({
    client: getContextClient(),
    query: gql`
      query SearchModels($model_name: String!) {
        fuzzy_by_model(model_name: $model_name) {
          model
        }
      }
    `,
    variables: { model_name: equipment.model }
  })


  $: totalWattage = equipment.items.length * equipment.wattage
  $: totalCost = equipment.items.length * equipment.cost


  let popupSettings: PopupSettings = {
      event: 'focus-click',
      target: 'popupAutocomplete',
      placement: 'bottom'
  };

  $: if ($items.data) {
    modelList = $items.data.fuzzy_by_model.map(({model}: any ) => {
      return {"label": model, "value": model}
    }) 
  }
    

  let modelList: AutocompleteOption[] = []

  // Should reflect the fuzzy search from the api

  function onModelSelection(event: any): void {
    equipment.model = event.detail.label;
  }
  
  export let equipment: Equip				
</script>

<ul class="my-1">
  <section class="flex flex-row ">
  <div class="w-64">
    <input
      class="input autocomplete h-8"
      type="search"
      name="autocomplete-search"
      bind:value={equipment.model}
      placeholder="Search..."
      use:popup={popupSettings}
    />
    <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
        <Autocomplete bind:input={equipment.model} bind:options={modelList} on:selection={onModelSelection} />
    </div>
  </div>
  <div class="flex mb-0.5">
    <div class="flex"><strong class="ml-4 mr-2">Total Cost:</strong><p class="text-secondary-400">${totalCost}</p></div>
    <div class="flex"><strong class="ml-4 mr-2">Total Qty:</strong><p>{equipment.items.length}</p></div>
    <div class="flex"><strong class="ml-4 mr-2">Total Wattage:</strong><p>{totalWattage}Watts</p></div>
  </div>
  </section>
  <section class="flex table-compact mt-2">
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="!p-2">Description</th>
        <th class="!p-2">Purpose</th>
        <th class="!p-2">Quantity</th>
        <th class="!p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each equipment.items as item (item.id)}
        <tr class="">
          <td class="!py-1 italic text-opacity-30">{item.description}</td>
          <td class="!py-1 italic text-opacity-30">{item.purpose}</td>
          <td class="!py-1 italic text-opacity-30">{item.quantity}</td>
          <td class="">
            <div class="btn-group scale-75 h-8">
              <button class="variant-filled-secondary">Temp</button>
              <button class="variant-filled-tertiary">Info</button>
              <button class="variant-filled-primary">Remove</button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
</ul>
