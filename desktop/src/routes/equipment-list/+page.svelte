<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";
  import Item from "./Item.svelte"
  import type { Equip } from "$lib/@types/equipment"
  // import DownArrow from "~icons/ri/arrow-down-fill" 
  // import UpArrow from "~icons/ri/arrow-up-fill" 
  let ribbonToggle = true;
  let items = [
    { name: 'Yamaha QL5', category: 'Console' },
    { name: 'Meyer Galaxy 816', category: 'Processor' },
    { name: 'Yamaha Rio 3224', category: 'Processor' },
    { name: 'Meyer X-32 Ultra', category: 'Speaker' },
    { name: 'Meyer 750-LFC', category: 'Speaker' },
    { name: 'D&B T10', category: 'Speaker' },
    { name: 'Shure ULX-D', category: 'RF' },
    { name: 'Shure UA874', category: 'RF' },
    { name: 'PSA co-8wl', category: 'Microphone' },
    { name: 'Shure SM-58', category: 'Microphone' },
    // { name: 'Item 3', category: 'Category 1' },
    // { name: 'Item 4', category: 'Category 2' },
    // { name: 'Item 5', category: 'Category 3' },
    // { name: 'Item 6', category: 'Category 3' },
  ];

  let gearList: Equip[] = [
    {
      category: "Console",
      model: "",
      cost: 6000,
      wattage: 15.3,
      items: [{description: "Yello"}]
    }
  ] 

  $: categories = gearList.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  function toggleRibbon() {
    ribbonToggle = !ribbonToggle
  }
</script>

<!-- {#if ribbonToggle } -->
  <AppBar class="variant-ringed-surface " slotTrail="w-full">
    <svelte:fragment slot="lead">
      <button type="button" class="btn variant-filled-primary">New Item</button>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <!-- <button type="button" class="btn variant-filled-secondary" on:click={toggleRibbon}>Hide Ribbon</button> -->
    </svelte:fragment>
    <!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
  </AppBar>
<!-- {:else} -->
  <!-- <div class=""></div> -->
  <!--     <button type="button" class="btn-icon btn-sm variant-glass-secondary" on:click={toggleRibbon}> -->
  <!--       <span><DownArrow/></span> -->
  <!--     </button>    -->

<!-- {/if} -->



{#each Object.entries(categories) as [category, items]}
  <div class="variant-ghost-surface p-4 pt-2 my-2 rounded">
    <h2 class="font-bold text-primary-400">{category.toUpperCase()}</h2>
    <ul class="list-disc list-inside">
      {#each gearList as item (item.model)}
        <Item equipment={item}/>
      {/each}
    </ul>
  </div>
{:else}
  <div class="card h-full flex justify-center items-center variant-ringed-surface flex-col">
    <h1 class="h3">Empty Equipment List</h1> 
    <p class="underline">Use (some action) to create an item</p>
  </div>
{/each}
