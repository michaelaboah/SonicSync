<script lang="ts">
  import { createEventDispatcher } from "svelte";
	import type { Cable } from "$lib/@types/equipment";
  import TrashIcon from "~icons/bi/trash"

  export let cable: Cable


  const dispatch = createEventDispatcher();





  function addBundle(cable: Cable): Cable {
    cable.bundle = { name: ""} 
    return cable
  }


  function handleDelete() {
    dispatch("delete", cable)
  }
</script>



<tr class="">
  <td class="!py-0.5" contenteditable="true" bind:innerText={cable.name}></td>
  <td class="!py-0.5" contenteditable="true" bind:innerText={cable.description}></td>
  <td class="!py-0.5"> 
    {#if cable.bundle}
      {cable.bundle.name}
    {:else}
      <button on:click={() => cable = addBundle(cable)} class="btn btn-sm variant-filled-primary p-1">Add</button> 
    {/if}
  </td>
  <td class="!py-0.5" contenteditable="true" bind:innerText={cable.model}></td>
  <td class="!py-0.5" contenteditable="true" bind:innerText={cable.length}></td>
  <td class="!py-0.5" contenteditable="true">{cable.source}</td>
  <td class="!py-0.5"></td>
  <td class="!py-0.5">
    <button class="btn btn-sm variant-filled-error p-0.5" on:click={handleDelete}>
      <span><TrashIcon/></span>
    </button>
  </td>
</tr>
