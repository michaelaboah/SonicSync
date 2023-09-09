<script lang="ts">
  import { AppBar, SlideToggle } from "@skeletonlabs/skeleton";
	import  { type Equip } from "$lib/@types/equipment";
	import { invoke } from "@tauri-apps/api/tauri";
  import TrashIcon from "~icons/bi/trash"
  import EditIcon from "~icons/ri/edit-2-line"
  import PlusIcon from "~icons/ri/add-circle-line"
  import InfoIcon from "~icons/ri/information-line"
	import CustomModal from "$lib/components/modals/CustomModal.svelte";
	import MicrophoneModal from "$lib/components/modals/items/MicrophoneModal.svelte";
	import { Category } from "$lib/@types/graphql";

  let selectedItem: Equip | null = null 
  let infoModal = false;
  let isEditing = false;

  $: items = [] as Equip[]
  $: if (infoModal === false) {
    selectedItem = null;
    console.log(selectedItem)
  }
  async function getEquipment() {
    const response = await invoke<Equip[]>("get_all_items");
    items = response
  }


  getEquipment()

  async function deleteItem(model: string) {
    const response = await invoke<Equip[]>("delete_by_model", { model });
    console.log(response)

  }


  async function updateItem() {
    const response = await invoke("update_item", { _id: selectedItem?._id, item: selectedItem })

    infoModal = false;  
  }

  

</script>

<AppBar class="variant-ringed-surface py-2 my-2 rounded mt-1" slotTrail="w-full">

  <svelte:fragment slot="lead">
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <div class="">
      <span class="">Add Equipment:</span> 
      <button class="btn btn-icon variant-filled-secondary scale-75" on:click={() => {}}><span class="scale-150"><PlusIcon/></span></button>
    </div> 
  </svelte:fragment>

</AppBar >


<!-- Responsive Container (recommended) -->
<div class="flex">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Model</th>
				<th>Category</th>
				<th>Manufacturer</th>
				<th>Weight</th>
				<th>Dimensions</th>
				<th>Notes</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody >
         
        {#each items as row, i (i)}
         
          <tr class="">

            <td class="!py-2" >{row.model}</td>
            <td class="!py-2" >{row.category}</td>
            <td class="!py-2" >{row.manufacturer}</td>
            <td class="!py-2" >{row.weight}</td>
            <td class="!py-2 w-1/6" >
               <span class="font-bold h5">L</span> x {row.dimensions.length}in 
               <span class="font-bold h5">W</span> x {row.dimensions.width}in
               <span class="font-bold h5">H</span> x {row.dimensions.height}in
            </td>

            <td class="!py-2 w-1/5">
              <textarea bind:value={row.notes} class="textarea text-xs italic" name="" id="" cols="8" rows="1"></textarea>
            </td>

            <td class="!py-2">

              <div class="flex flex-row w-10 gap-2">
                <button class="btn btn-sm variant-filled-primary" on:click={() => {infoModal = true; selectedItem = row}}><span><InfoIcon/></span></button> 
                <!-- <button class="btn btn-sm variant-filled-secondary" on:click={() => {infoModal = true; selectedItem = row}}><span><EditIcon/></span></button>  -->
                <button class="btn btn-sm variant-filled-error" on:click={() => deleteItem(row.model)}><span><TrashIcon/></span></button> 
              </div>

            </td>
          </tr>

        {/each}

    
		</tbody>
		<tfoot class="absolute bottom-0 w-full">
			<tr>
				<th colspan="3">Total:</th> <td>{items.length}</td> 
			</tr>
		</tfoot>
	</table>
</div>







{#if selectedItem}

  <CustomModal bind:open={infoModal}>

    <svelte:fragment slot="header">
      <h3 class="h3">Edit {selectedItem.model}</h3>
      <SlideToggle name="" size="sm" bind:checked={isEditing} />
    </svelte:fragment>


    {#if selectedItem.category === Category.Microphones}

      <MicrophoneModal bind:edit={isEditing} bind:microphone={selectedItem.details}/>

    {:else if selectedItem.category === Category.Amplifier} 
      Amplifier 
    {:else if selectedItem.category === Category.Console} 
      Console 
    {:else if selectedItem.category === Category.Speaker} 
      Speaker 
    {:else if selectedItem.category === Category.Computer} 
      Computer 
    {:else} 
      Generic POS
    {/if}

    <svelte:fragment slot="footer">
      <div class="justify-between">
        <button class="btn variant-filled-secondary" on:click={() => infoModal = false}>View Details</button>
        <button class="btn variant-filled-primary"   on:click={updateItem}>Update Item</button>
      </div>
    </svelte:fragment>
      
  </CustomModal>

{/if}
