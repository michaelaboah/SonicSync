<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import type { Cable } from "$lib/@types/equipment";
  import TrashIcon from "~icons/bi/trash"
  import CloseIcon from "~icons/ri/close-circle-line"
	import { type AutocompleteOption, type PopupSettings, Autocomplete, popup } from "@skeletonlabs/skeleton";
	import { bundleList } from "$lib/stores/flow";
	import type { Bundle } from "$lib/@types/flow";
	import ConnectionCell from "$lib/components/tables/ConnectionCell.svelte";


  const cellClass = "!p-0.5 !px-4 border-surface-300 dark:border-surface-500"
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
      cable.bundle = null;
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
  
  <td class={cellClass} contenteditable="true" bind:innerText={cable.model}></td>

  <td class={cellClass + " w-28"}>

    <input class="input h-7 py-0 w-full m-0" type="number" bind:value={cable.length}/>

  </td>


    {#if cable.bundle !== null}

      <td class={cellClass + " w-52"}> 

        <div class="flex flex-row h-7">
          
          <input
            class="input w-full autocomplete text-xs"
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

          <button class="btn btn-icon p-0 m-0 h-7 w-fit" on:click={() => cable = removeBundle(cable)}>

            <span><CloseIcon/></span>
          
          </button>

        </div>

      </td>

    {:else}

      <td class={cellClass + " w-52"}> 

        <div class="flex justify-center"> 

          <button on:click={() => cable = addBundle(cable)} class="btn btn-sm variant-filled-primary p-1 h-7 text-sm">Add</button> 

        </div>

      </td>

    {/if}


   <ConnectionCell bind:connection={cable.source} connKind="source" cableKind={cable.cableKind}/>

   <ConnectionCell bind:connection={cable.destination} connKind="destination" cableKind={cable.cableKind}/> 

  <td class="!py-0.5 w-20">

    <div class="mx-4">

      <button class="btn btn-sm variant-filled-error p-0.5" on:click={handleDelete}>

        <span><TrashIcon/></span>

      </button>

    </div>

  </td>

</tr>
