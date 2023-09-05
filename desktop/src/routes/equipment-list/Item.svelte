<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
  import { Autocomplete, SlideToggle, ProgressRadial, popup, toastStore } from '@skeletonlabs/skeleton';
  import type { Equip, Gear, Item } from "$lib/@types/equipment"
  import InfoIcon from "~icons/ri/information-line"
  import PlusIcon from "~icons/ri/add-circle-line"
  import TrashIcon from "~icons/bi/trash"
	import { invoke } from '@tauri-apps/api/tauri';

  export let gear: Gear

  let cloudSearch = false; // Should be false by default to promote usage of local data before cloud and also reduce connectivity issues when offline
  let modelList: Promise<AutocompleteOption[]> = Promise.resolve([])

  const dispatch = createEventDispatcher();

  const popupTarget = (Math.random() + 1).toString(36).substring(7);

  const popupSettings: PopupSettings = {
      event: 'focus-click',
      target: popupTarget,
      placement: 'bottom'
  };


  $: totalWattage = 0
    // totalWattage = gear.items.length * gear.equipment.details.power.wattage
  $: totalCost = gear.items.length * gear.equipment.cost

  $: gear.equipment.model, handleModelUpdate() 

  function handleModelUpdate() {
    if (cloudSearch) {
      modelList = cloudFuzzySearch(gear.equipment.model)
    } else {
      modelList = localFuzzySearch(gear.equipment.model)
    }
  }


  function handleDelete() {
    dispatch("delete", gear)
  }

  // Should reflect the fuzzy search from the api

  // Search for compatible model names from the local database
  async function localFuzzySearch(model: String): Promise<AutocompleteOption[]>   {
    if (!model || model === "") {
      return []
    }
    
    // Clear the modelList from previous queries
    modelList = Promise.resolve(modelList.then((x) => x.filter(() => false)));

    const response = await invoke<String[]>("fuzzy_by_model", { model })
    
    if (response.length === 0) {
      return []
    }

    return response.map((x: String) => {
      return { label: x, value: x } as AutocompleteOption
    });

  }

  async function localFind(model: String) {
    const localItem = await invoke<Equip>("find_by_model", { model }) 
    
      
    if (!localItem) {
      // Give some indication of a failed search (Toaster of some kind)
      // Advise to search on the cloud or manually insert into library
      return
    }

    gear.equipment = localItem 
  }


  // Search for item on the cloud and store in database by default
  async function cloudFind(model: String) {
    const cloudResponse = await fetch(`http://localhost:8080/queries/find-model/${model}`)
    const json = await cloudResponse.json()
    
    gear.equipment = json.data

    // Store locally
    if (true) {
      // This operation can fail take care later
      const response: any | null = await invoke("database_insert", { item: json.data })

      if (response && response.error) {
        return   
      }

      toastStore.trigger({ message: `Item: ${model} Stored`, classes: "p-2", timeout: 1000 * 5  })
    }
  }

  // Search for compatible model names
  async function cloudFuzzySearch(model: String): Promise<AutocompleteOption[]> {
    if (!model || model === "") {
      return []
    }

    // Clear the modelList from previous queries
    modelList = Promise.resolve(modelList.then((x) => x.filter(() => false)));

    const response = await fetch(`http://localhost:8080/queries/fuzzy-find/${model}`)

    const json: { data: String[] } = await response.json()

    if (!json.data) {
      return []
    }

    return json.data.map((x: String) => {
      return { label: x, value: x } as AutocompleteOption
    });
  }


  function onModelSelection(event: any): void {
    gear.equipment.model = event.detail.label;

    if (cloudSearch) {
      cloudFind(gear.equipment.model)
    } else {
      localFind(gear.equipment.model)
    }
  }

  function addItem(newId: number): Item {
    return {    
      id: newId,
      description: "", 
      quantity: 0,
      purpose: "",
      publicNotes: "",
      privateNotes: "",
    }
  }
  
</script>

<ul class="my-1">
  <table class="w-full">
  <tr class="flex w-full h-fit">
    <td class="flex flex-row">

      <input
        class="input w-fit autocomplete h-8"
        type="search"
        name="autocomplete-search"
        bind:value={gear.equipment.model}
        placeholder="Search for model..."
        use:popup={popupSettings}
      />

      <div data-popup={popupTarget} class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">

          {#await modelList}
            <div class="mx-auto w-fit h-8"><ProgressRadial width="w-8"/></div> 
          {:then list } 
            <Autocomplete bind:input={gear.equipment.model} options={list} on:selection={onModelSelection} />
          {/await}
            
      </div>
          <!-- Add Tooltip later -->
        <SlideToggle 
          name="search-mode-slide" 
          size="sm" 
          bind:checked={cloudSearch} 
          class="mt-1 ml-2" 
          label="Search Mode" 
          active="variant-filled-secondary" 
          background="variant-ringed-secondary"
        />

    </td>
    <td class="w-fit mt-1 flex flex-row">
      <strong class="ml-4 mr-2 whitespace-nowrap">Total Cost:</strong>
      <p class="text-secondary-400">${totalCost}</p>
    </td>
    <td class="w-fit flex mt-1 flex-row"><strong class="ml-4 mr-2 whitespace-nowrap">Total Qty:</strong><p>{gear.items.length}</p></td>
    <td class="w-fit flex mt-1 flex-row"><strong class="ml-4 mr-2 whitespace-nowrap">Total Wattage:</strong><p class=" whitespace-nowrap">{totalWattage} Watts</p></td>
    <td class="w-full grow flex flex-row">
<!-- Spacer-->
    </td>
    <td class="flex-none scale-75 pt-0">
        <button on:click={() => gear.items = [...gear.items, addItem(gear.items.length)]} class="btn-icon variant-filled-secondary">
          <span class="scale-150"><PlusIcon/></span>
        </button>
    </td>
    <td class="flex-none scale-75 pt-0">
        <button class="btn-icon variant-filled-secondary">
          <span class="scale-150"><InfoIcon/></span>
        </button>
    </td> 
    <td class="flex-none scale-75 pt-0">
        <button class="btn-icon variant-filled-error" on:click={handleDelete}>
          <span class="scale-125"><TrashIcon/></span>
        </button>
    </td>
  </tr>
  </table>
  <section class="flex mt-0">
  <table class="table table-hover">
    <thead>
      <tr>
        <th class="!p-2 !pl-1.5">Description</th>
        <th class="!p-1">Purpose</th>
        <th class="!p-1">Quantity</th>
        <th class="!p-1">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each gear.items as item (item.id) }
        <tr class="h-0">
          <td contenteditable="true" bind:innerText={item.description} class="@apply !py-0 !pt-1 italic text-opacity-30 border-r border-surface-300 dark:border-surface-500"></td>
          <td contenteditable="true" bind:innerText={item.purpose} class="@apply !py-0 italic text-opacity-30 border-r border-surface-300 dark:border-surface-500"></td>
          <td class="@apply !py-0 !pt-1 italic text-opacity-30  border-r border-surface-300 dark:border-surface-500">
            <input class="input h-fit py-0 w-20 m-0" type="number" bind:value={item.quantity}/>
          </td>
          <td class="@apply !py-0">
            <!-- <div class="btn-group scale-75"> -->
              <!-- <button class="variant-filled-secondary">Temp</button> -->
              <!-- <button class="variant-filled-tertiary">Info</button> -->
              <button on:click={() => {gear.items = gear.items.filter(g => g !== item)}} class="p-0.5 mt-1 btn btn-sm variant-filled-error">
                <span class=""><TrashIcon/></span>
              </button>
            <!-- </div> -->
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
</ul>
