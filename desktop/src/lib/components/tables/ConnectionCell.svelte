<script lang="ts">
  import { Analog } from "$lib/@types/graphql";
  import type { Connection } from "$lib/@types/equipment"
	import { gearList } from "$lib/stores/equipment";
	import { type AutocompleteOption, type PopupSettings, Autocomplete, popup } from "@skeletonlabs/skeleton";
  import CloseIcon from "~icons/ri/close-circle-line"
  import EditIcon from "~icons/ri/edit-2-line"

  type ConnectionKind = "source" | "destination"

  export let cellClass = "!py-0.5 border-r border-surface-300 dark:border-surface-500"
  const popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom'
  };

  export let connection: Connection | null;
  export let connKind: ConnectionKind;
  export let cableKind: "Power" | "Analog" | "Digital" = "Analog";

  let showConnectionModal = false;
  let possibleEquips = $gearList.filter((x) => JSON.stringify(x).includes("analog")).map((t) => {
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

<td class={cellClass+ " "}>

    {#if connection}

      {@const variants = Object.values(Analog)}

      <div class="flex flex-row h-7 w-32">

        <input
          class="input w-fit autocomplete text-xs"
          type="search"
          name="autocomplete-search"
          bind:value={connection.name}
          placeholder={connKind === "source" ? "Find Source..." : "Find Dest..."}
          use:popup={popupSettings}
        />

        <div data-popup="popupAutocomplete" class="card w-52 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
            <Autocomplete bind:input={connection.name} bind:options={possibleEquips} on:selection={onConnSelection} />
        </div>
        
        <select class="select " name="Choose" bind:value={connection.kind}>

          {#each variants as v }

            <option value={v}>{v}</option> 

          {/each} 
        
        </select>

        <div class="flex flex-row">

          <button class="btn btn-icon p-0 m-0 h-7 " on:click={() => showConnectionModal = true}><span><EditIcon/></span></button>
          <button class="btn btn-icon p-0 m-0 h-7 " on:click={() => connection = null}><span><CloseIcon/></span></button>

        </div>

      </div>

    {:else}

      <div class="flex flex-row justify-between ">

        <p>Empty</p>

        <button on:click={() => connection = addConnection()} class="btn btn-sm variant-filled-primary p-1">Add</button> 

      </div>

    {/if}

              
<!-- {#if showConnectionModal} -->
    <!-- Modal Time -->
<!---->
  <!-- {@const variants = Object.values(Analog)} -->


  <!-- <div class="modal fixed top-0 left-0 flex items-center justify-center  h-full w-full p-10 z-50"> -->
  <!---->
  <!--     <div class="modal-overlay fixed w-full h-full bg-surface-900 opacity-50"></div> -->
  <!---->
  <!--     <div class="bg-surface-400 w-full lg:h-1/2 lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"> -->
  <!---->
  <!--       <div class="card px-8 pt-2 h-full"> -->
  <!---->
  <!--         <header class="card-header justify-between flex flex-row"> -->
  <!---->
  <!--           <h2 class="h3"> Create Connection at {connKind.toLocaleUpperCase()} </h2> -->
  <!---->
  <!--           <button class="btn-icon" on:click={() => showConnectionModal = false}><span class="scale-125"><CloseIcon/></span></button> -->
  <!---->
  <!--         </header> -->
  <!---->
  <!--         <!-- ------ --> 
  <!--         <section class="flex flex-row space-x-4"> -->
  <!--            -->
  <!--           <input -->
  <!--             class="input w-fit autocomplete" -->
  <!--             type="search" -->
  <!--             name="autocomplete-search" -->
  <!--             bind:value={connection.name} -->
  <!--             placeholder={connKind === "source" ? "Find Source..." : "Find Dest..."} -->
  <!--             use:popup={popupSettings} -->
  <!--           /> -->
  <!--        -->
  <!--           <div data-popup="popupAutocomplete" class="card w-56 max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1"> -->
  <!--               <Autocomplete bind:input={connection.name} bind:options={possibleEquips} on:selection={onConnSelection} /> -->
  <!--           </div> -->
  <!---->
  <!--           <select class="select" name="Choose" bind:value={connection.kind}> -->
  <!--         -->
  <!--             {#each variants as v } -->
  <!--          -->
  <!--               <option value={v}>{v}</option>  -->
  <!--           -->
  <!--             {/each}  -->
  <!--            -->
  <!--           </select> -->
  <!---->
  <!--         </section> -->
  <!---->
  <!--       </div> -->
  <!---->
  <!--     </div> -->
  <!---->
  <!-- </div>  -->

<!-- {/if} -->

</td>
