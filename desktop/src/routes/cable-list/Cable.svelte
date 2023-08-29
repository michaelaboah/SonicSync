<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import type { Cable } from "$lib/@types/equipment";
  import TrashIcon from "~icons/bi/trash"
  import CloseIcon from "~icons/ri/close-circle-line"
	import { type AutocompleteOption, type PopupSettings, Autocomplete, popup } from "@skeletonlabs/skeleton";

  export let cable: Cable

  const dispatch = createEventDispatcher();

  let bundleList: AutocompleteOption[] = []
  let sourceList: AutocompleteOption[] = []
  let destList: AutocompleteOption[] = []

  function addBundle(cable: Cable): Cable {
    cable.bundle = { name: ""} 
    return cable
  }

  function addConnection(cable: Cable, type: "source" | "destination"): Cable {
    if (type === "source") {
      cable.source = { name: "", kind: "" } 
    } else if (type === "destination") {
      cable.destination = { name: "", kind: "" } 
    }
    return cable
  }

  function handleDelete() {
    dispatch("delete", cable)
  }

  const popupSettings: PopupSettings = {
      event: 'focus-click',
      target: 'popupAutocomplete',
      placement: 'bottom'
  };

  function onBundleSelection(event: any): void {
    // gear.equipment.model = event.detail.label;

    // if (cloudSearch) {
    //   cloudFind(gear.equipment.model)
    // } else {
    //   localFind(gear.equipment.model)
    // }
  }

  function onSourceSelection(event: any): void {

  }

  function onDestSelection(event: any): void {

  }

  let cellClass = "!py-0.5 border-r border-surface-300 dark:border-surface-500"
</script>



<tr class="">
  <td class={cellClass} contenteditable="true" bind:innerText={cable.name}></td>
  <td class={cellClass} contenteditable="true" bind:innerText={cable.description}></td>
  <td class={cellClass}> 
    {#if cable.bundle}
      <div class="flex flex-row space-x-2">
        <input
          class="input w-1/3 autocomplete h-2.5 text-xs"
          type="search"
          name="autocomplete-search"
          bind:value={cable.bundle.name}
          placeholder="Find Bundle..."
          use:popup={popupSettings}
        />
        <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
            <Autocomplete bind:input={cable.bundle.name} bind:options={bundleList} on:selection={onBundleSelection} />
        </div>
        <button class="btn btn-icon p-0 m-0 h-fit w-fit" on:click={() => cable.bundle = null}><span><CloseIcon/></span></button>
      </div>
    {:else}
      <button on:click={() => cable = addBundle(cable)} class="btn btn-sm variant-filled-primary p-1">Add</button> 
    {/if}
  </td>
  <td class={cellClass} contenteditable="true" bind:innerText={cable.model}></td>
  <td class={cellClass} contenteditable="true" bind:innerText={cable.length}></td>
  <td class={cellClass}>
    {#if cable.source}
      <div class="flex flex-row variant-ringed-secondary">
        <input
          class="input w-fit autocomplete h-2.5 text-xs"
          type="search"
          name="autocomplete-search"
          bind:value={cable.source.name}
          placeholder="Find Source..."
          use:popup={popupSettings}
        />
        <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
            <Autocomplete bind:input={cable.source.name} bind:options={sourceList} on:selection={onSourceSelection} />
        </div>
        <button class="btn btn-icon p-0 m-0 h-fit w-fit" on:click={() => cable.source = null}><span><CloseIcon/></span></button>
      </div>
    {:else}
      <button on:click={() => cable = addConnection(cable, "source")} class="btn btn-sm variant-filled-primary p-1">Add</button> 
    {/if}
  </td>
  <td class={cellClass}>
    {#if cable.destination}
      <div class="flex flex-row variant-ringed-secondary">
        <input
          class="input w-fit autocomplete h-2.5 text-xs"
          type="search"
          name="autocomplete-search"
          bind:value={cable.destination.name}
          placeholder="Find Dest..."
          use:popup={popupSettings}
        />
        <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
            <Autocomplete bind:input={cable.destination.name} bind:options={destList} on:selection={onDestSelection} />
        </div>
        <button class="btn btn-icon p-0 m-0 h-fit w-fit" on:click={() => cable.destination = null}><span><CloseIcon/></span></button>
      </div>
    {:else}
      <button on:click={() => cable = addConnection(cable, "destination")} class="btn btn-sm variant-filled-primary p-1">Add</button> 
    {/if}
  </td>
  <td class="!py-0.5">
    <button class="btn btn-sm variant-filled-error p-0.5" on:click={handleDelete}>
      <span><TrashIcon/></span>
    </button>
  </td>
</tr>
