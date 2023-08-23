<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";
  import { gearList } from "$lib/stores/equipment";
  import Item from "./Item.svelte";

  $: categories = $gearList.reduce((acc, item) => {
    (acc[item.equipment.category] = acc[item.equipment.category] || []).push(item);
    return acc;
  }, {});


  function deleteItem(itemToDelete: any ) {
    $gearList = $gearList.filter((i) => i !== itemToDelete);
  }
</script>

<section class="p-2">
  <AppBar class="variant-ringed-surface py-2 rounded mt-1" slotTrail="w-full">
    <svelte:fragment slot="lead">
      <button type="button" class="btn btn-sm variant-filled-primary">New Item</button>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <button type="button" class="btn btn-sm variant-filled-secondary" >Filler</button>
    </svelte:fragment>
    <!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
  </AppBar >



  {#each Object.entries(categories) as [category, items]}
    <div class="variant-ghost-surface px-2 p-1 my-1 rounded">
      <h2 class="font-bold text-primary-400">{category.toUpperCase()}</h2>
      <ul class="list-disc list-inside">
        {#each items as item (item.equipment.model)}
          <Item gear={item} on:delete={(e) => deleteItem(e.detail)}/>
        {/each}
      </ul>
    </div>
  {:else}
    <div class="card h-full flex justify-center items-center variant-ringed-surface flex-col">
      <h1 class="h3">Empty Equipment List</h1> 
      <p class="underline">Use (some action) to create an item</p>
    </div>
  {/each}
</section>
