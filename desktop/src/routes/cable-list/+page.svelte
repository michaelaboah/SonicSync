<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";
  import { cableList } from "$lib/stores/equipment"
	import type { Cable } from "$lib/@types/equipment";
  import { default as CableComponent }  from "./Cable.svelte"

  function addEmptyCable(id: number) {
    let emptyCable = {
      id: id,
      name: "",
      description: "",
      bundle: null, 
      model: "",
      length: 0,
      source: null,
      destination: null,
    }

    $cableList = [...$cableList, emptyCable]
  }

  

  function deleteCable(cableToDelete: any ) {
    $cableList = $cableList.filter((i) => i !== cableToDelete);
  }
</script>

<section class="p-2">
  <AppBar class="variant-ringed-surface py-2 rounded mt-1" slotTrail="w-full">
    <svelte:fragment slot="lead">
      <button type="button" class="btn btn-sm variant-filled-primary" on:click={() => addEmptyCable($cableList.length)}>Add</button>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <button type="button" class="btn btn-sm variant-filled-error" on:click={() => $cableList = $cableList.filter(() => false)}>Remove All</button>
    </svelte:fragment>
  </AppBar >

  {#if $cableList.length !== 0 }
    <div class="my-1">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="!p-1 text-center">Name</th>
            <th class="!p-1 text-center">Description</th>
            <th class="!p-1 text-center">Model</th>
            <th class="!p-1 text-center">Length</th>
            <th class="!p-1 text-center">Bundle</th>
            <th class="!p-1 text-center">Source</th>
            <th class="!p-1 text-center">Destination</th>
            <th class="!p-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each $cableList as cable (cable) }
            <CableComponent {cable} on:delete={(e) => deleteCable(e.detail)}/>       
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="card px-2 p-4 my-1 h-full flex justify-center items-center variant-ringed-surface flex-col">
      <h1 class="h3 font-bold">Empty Cable List</h1> 
      <p class="italic">Use 
        <button type="button" class="btn p-1 btn-sm variant-filled-primary" on:click={() => {}}>Add</button>
         Button to Create a Cable</p>
      <p>Or</p>
      <p class="italic">
        Press <kbd class="kbd">Ctl + Shift + N</kbd>
      </p>
    </div>
  {/if}
</section>
