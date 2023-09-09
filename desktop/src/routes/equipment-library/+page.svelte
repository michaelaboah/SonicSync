<script lang="ts">
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
  import EquipmentTab from "./EquipmentTab.svelte";


  let tabSet = 0;
				
</script>


<section class="px-2 pt-4 w-full">

  <TabGroup>

    <Tab bind:group={tabSet} name="Equipment" title="Equipment" value={0} >
      <!-- What?  -->
      <!-- <svelte:fragment slot="lead"> -->
        Equipment 
      <!-- </svelte:fragment> -->
    </Tab>

    <Tab bind:group={tabSet} name="Cable" title="Cable" value={1} >
      <!-- What?  -->
      <!-- <svelte:fragment slot="lead"> -->
        Cables 
      <!-- </svelte:fragment> -->
    </Tab>

    <svelte:fragment slot="panel">
      {#if tabSet === 0 }

        <EquipmentTab/> 

      {:else if tabSet === 1}
        Cables
      {:else if tabSet === 2}
        How did you get here?
      {/if} 
    </svelte:fragment>

  </TabGroup>

</section>
