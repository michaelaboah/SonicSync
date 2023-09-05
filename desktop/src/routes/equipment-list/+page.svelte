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

  function addEmptyGear(gearId: number) { 
    let empty = {
      equipment: { id: gearId, category: "", model: "", manufactuer: "", cost: 0, wattage: 0.0, details: {} },  
      items: [{id: 0, description: "", quantity: 0}]
    };

    $gearList = [...$gearList, empty];
  }
</script>

<section class="p-2">
  <AppBar class="variant-ringed-surface py-2 rounded mt-1" slotTrail="w-full">
    <svelte:fragment slot="lead">
      <button type="button" class="btn btn-sm variant-filled-primary" on:click={() => addEmptyGear($gearList.length)}>Add</button>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <button type="button" class="btn btn-sm variant-filled-error" on:click={() => $gearList = $gearList.filter(() => false)}>Remove All</button>
    </svelte:fragment>
    <!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
  </AppBar >



  {#each Object.entries(categories) as [category, items]}
    <div class="variant-ghost-surface px-2 p-1 my-1 rounded">
      <h2 class="font-bold text-primary-400">{category !== "" ? category.toUpperCase() : "EMPTY"}</h2>
      <ul class="list-disc list-inside">
        {#each items as item (item.equipment.id)}
          <Item gear={item}  on:delete={(e) => deleteItem(e.detail)}/>
        {/each}
      </ul>
    </div>
  {:else}
    <div class="card px-2 p-4 my-1 h-full flex justify-center items-center variant-ringed-surface flex-col">
      <h1 class="h3 font-bold">Empty Equipment List</h1> 
      <p class="italic">Use 
        <button type="button" class="btn p-1 btn-sm variant-filled-primary" on:click={() => addEmptyGear($gearList.length)}>Add</button>
         Button to Create an Item</p>
      <p>Or</p>
      <p class="italic">
        Press <kbd class="kbd">Ctl + Shift + N</kbd>
      </p>
    </div>
  {/each}
</section>
