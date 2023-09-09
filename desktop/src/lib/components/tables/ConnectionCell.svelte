<script lang="ts">
  import { Analog } from "$lib/@types/graphql";
  import type { Connection } from "$lib/@types/equipment"
	import { gearList } from "$lib/stores/equipment";
	import { type AutocompleteOption, type PopupSettings, Autocomplete, popup } from "@skeletonlabs/skeleton";
  import CloseIcon from "~icons/ri/close-circle-line"
  import EditIcon from "~icons/ri/edit-2-line"

  type ConnectionKind = "source" | "destination"

  export let cellClass = "!py-0.5 border-surface-300 dark:border-surface-500"
  const popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'connectionDropdownAutocomplete',
    placement: 'bottom'
  };

  export let connection: Connection | null;
  export let connKind: ConnectionKind;
  export let cableKind: "Power" | "Analog" | "Digital" = "Analog";

  let showConnectionModal = false;
  $: possibleEquips = $gearList.filter((x) => JSON.stringify(x).includes("analog_connections")).map((t) => {
    console.log(t)
    return { label: t.equipment.model, value: t.equipment.model } as AutocompleteOption 
  })


  function addConnection(): Connection {
    showConnectionModal = true;
    connection = { name: "", kind: "" } 
    return connection 
  }

  function onConnSelection(e: any): void {
    connection.name = e.detail.label;
  }

</script>

{#if connection}
{@const variants = Object.values(Analog)}

  <td class={cellClass + " w-1/5"}>

    <div class="flex flex-row h-7">


      <input
        class="input w-full autocomplete text-xs"
        type="search"
        name="autocomplete-search"
        bind:value={connection.name}
        placeholder={connKind === "source" ? "Find Source..." : "Find Dest..."}
        use:popup={popupSettings}
      />

      <div data-popup="connectionDropdownAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
          <Autocomplete bind:input={connection.name} bind:options={possibleEquips} on:selection={onConnSelection} />
      </div>
      
      <select class="select w-full text-sm pl-1 p-0" name="Choose" bind:value={connection.kind}>

        {#each variants as v }

          <option value={v}>{v}</option> 

        {/each} 
      
      </select>

      <div class="flex flex-row">

        <!-- <button class="btn btn-icon p-0 m-0 h-7 w-fit" on:click={() => showConnectionModal = true}><span><EditIcon/></span></button> -->
        <button class="btn btn-icon p-0 m-0 h-7 w-fit" on:click={() => connection = null}><span><CloseIcon/></span></button>

      </div>

    </div>

  </td>

{:else}

  <td class={cellClass + " w-1/5"}>

      <div class="flex flex-row justify-center ">

      <button on:click={() => {connection = addConnection()}} class="btn btn-sm variant-filled-primary p-1">Add</button> 

    </div>

  </td>

{/if}
