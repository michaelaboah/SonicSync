<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import type { Cable } from "$lib/@types/equipment";
  import TrashIcon from "~icons/bi/trash"
  import CloseIcon from "~icons/ri/close-circle-line"
	import { type AutocompleteOption, type PopupSettings, Autocomplete, popup } from "@skeletonlabs/skeleton";
	import { bundleList } from "$lib/stores/flow";
	import type { Bundle } from "$lib/@types/flow";
	import ConnectionCell from "$lib/components/tables/ConnectionCell.svelte";


  const cellClass = "!py-0.5 border-r border-surface-300 dark:border-surface-500"
  const dispatch = createEventDispatcher();
  const popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom'
  };

  export let cable: Cable

  let bundleOptions: AutocompleteOption[] = $bundleList.map((x) => {
    return { label: x.name, value: x.name } as AutocompleteOption
  }) 

  $: bundleNames = bundleOptions.filter((x) => cable.bundle ? x.label.toLowerCase().includes(cable.bundle.toLowerCase()) : null) 


  function addBundle(cable: Cable): Cable {
    cable.bundle = "";
    return cable
  }

  function removeBundle(cable: Cable): Cable {
    let foundBundle: Bundle | undefined = $bundleList.find((b) => b.name == cable.bundle)
    if (!foundBundle) {
      return cable
    } 

    foundBundle.cableIds.delete(cable.name)
    
    cable.bundle = null;
    return cable
  }


  function handleDelete() {
    dispatch("delete", cable)
  }

  function onBundleSelection(event: any): void {
    cable.bundle = event.detail.label;
    let foundBundle: Bundle | undefined = $bundleList.find((b) => b.name == cable.bundle)
    if (!foundBundle) {
      return
    } 
    foundBundle.cableIds.add(cable.name)
  }

</script>

<tr class="">

  <td class={cellClass} contenteditable="true" bind:innerText={cable.name}></td>

  <td class={cellClass} contenteditable="true" bind:innerText={cable.description}></td>

  <td class={cellClass}> 

    {#if cable.bundle !== null}

      <div class="flex flex-row space-x-2">
        
        <input
          class="input w-1/3 h-7 autocomplete text-xs"
          type="search"
          name="autocomplete-search"
          bind:value={cable.bundle}
          placeholder="Find Bundle..."
          use:popup={popupSettings}
        />

        <div data-popup="popupAutocomplete" class="card w-40 max-w-sm max-h-48 text-xs p-1 m-0 overflow-y-auto" tabindex="-1">
            <Autocomplete input={cable.bundle} bind:options={bundleOptions} on:selection={onBundleSelection} />
             
            {#if bundleNames.length === 0 && cable.bundle !== ""}
              <div class="flex justify-center mt-1">

                <button class="btn btn-xs px-1 py-0.5 variant-filled-secondary text-xs">Create</button>
              </div>
            {/if}
        </div>

        <button class="btn btn-icon p-0 m-0 h-fit w-fit" on:click={() => cable = removeBundle(cable)}>
          <span><CloseIcon/></span>
        </button>

      </div>

    {:else}
      
      <button on:click={() => cable = addBundle(cable)} class="btn btn-sm variant-filled-primary p-1">Add</button> 

    {/if}
  </td>

  <td class={cellClass} contenteditable="true" bind:innerText={cable.model}></td>

  <td class={cellClass}>
    <input class="input h-fit py-0 w-20 m-0" type="number" bind:value={cable.length}/>
  </td>


   <ConnectionCell connection={cable.source} kind="source"/>

   <ConnectionCell connection={cable.destination} kind="destination"/> 

  <td class="!py-0.5">

    <button class="btn btn-sm variant-filled-error p-0.5" on:click={handleDelete}>

      <span><TrashIcon/></span>

    </button>

  </td>

</tr>
