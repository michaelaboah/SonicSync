<script lang="ts">
	import type { AnalogCable } from "$lib/@types/enums";
  import type { Connection } from "$lib/@types/equipment"
	import { gearList } from "$lib/stores/equipment";
	import { type AutocompleteOption, type PopupSettings, Autocomplete, popup } from "@skeletonlabs/skeleton";
  import CloseIcon from "~icons/ri/close-circle-line"

  type ConnectionKind = "source" | "destination"

  export let cellClass = "!py-0.5 border-r border-surface-300 dark:border-surface-500"
  const popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom'
  };

  export let connection: Connection | null 
  export let kind: ConnectionKind;


  let connList: AutocompleteOption[] = $gearList.filter((g) => {
      if (g.equipment.details === null) {
        return false     
      } 
      
      switch(g.equipment.category) {
        case "CONSOLE": 
          // let deets = g.equipment.details as 
          break;
      } 
    
  }).map((x) => { return { label: x.equipment.model, value: x.equipment.model } as AutocompleteOption}) 

  console.log(connList)

  // function removeConnection():  {
  //   return null 
  // }

  function addConnection(kind: AnalogCable): Connection {
    connection = { name: "", kind } 
    return connection 
  }

  function onConnSelection(e: any): void {
  }
// Match the model of the cable to the capabilities of the gear
  // Some way to tell that the cable is analog

</script>

<td class={cellClass}>

    {#if connection}

      <div class="flex flex-row grow variant-ringed-secondary">

        <input
          class="input w-fit h-7 autocomplete text-xs"
          type="search"
          name="autocomplete-search"
          bind:value={connection.name}
          placeholder={kind === "source" ? "Find Source..." : "Find Dest..."}
          use:popup={popupSettings}
        />

        <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
          
            <Autocomplete bind:input={connection.name} bind:options={connList} on:selection={onConnSelection} />
        <!-- REDIRECT TO GEARLIST PAGE --> <!-- {#if bundleNames.length === 0 && cable.bundle !== ""} -->
            <!--   <div class="flex justify-center mt-1"> -->
            <!---->
            <!--     <button class="btn btn-xs px-1 py-0.5 variant-filled-secondary text-xs">Create</button> -->
            <!--   </div> -->
            <!-- {/if} -->
        </div>

        <button class="btn btn-icon p-0 m-0 h-fit w-fit" on:click={() => connection = null}><span><CloseIcon/></span></button>

      </div>

    {:else}

      <button on:click={() => connection = addConnection()} class="btn btn-sm variant-filled-primary p-1">Add</button> 

    {/if}

</td>
