<script lang="ts">
  import { FileDropzone } from "@skeletonlabs/skeleton";
  import DownloadIcon from "~icons/ri/file-upload-line"
  import PhotoIcon from "~icons/ri/image-2-line"
  import StampIcon from "~icons/ph/stamp"
  import { prodInfo } from "$lib/stores/project";
  let prodImage: string | undefined 
  let stampImage: string 

  let acceptedMimes = ['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

  const reader = new FileReader()

  function handleFileChange(event: any, imageUrl: string) {
    const file = event.target.files[0];
    imageUrl = URL.createObjectURL(file);
    console.log(imageUrl)
  }
</script>

<div class="flex flex-row w-full h-full p-4">
  <section class="flex-grow w-1/2">
    <h2 class="h2">Team</h2> <h3 class="h6 italic mb-4 opacity-70">Add Team Members</h3> <hr class="my-4 mr-4"/>

    <p class="italic">TBA</p> 
   
<!-- Team Details -->
  </section>
  <span class="divider-vertical h-full w-0" />
  <section class="flex-grow w-1/2 ml-4 ">
    <h2 class="h2">Details</h2>
    <h4 class="h6 italic mb-4 opacity-70">Additional Information for Paperwork</h4>

    <hr class="my-4"/>
<!-- Production Details -->
    <div class="table-container">
      <table class="table table-hover">
        <tbody>
            <tr>
              <td class="flex"><p class="h6 py-auto">Production:</p></td>
              <td><input class="input" bind:value={$prodInfo.productionName}/></td>
            </tr>
            <tr>
              <td class="flex"><p class="h6 py-auto">Director:</p></td>
              <td><input class="input" bind:value={$prodInfo.director}/></td>
            </tr>
            <tr>
              <td class="flex"><p class="h6 py-auto">Venue:</p></td>
              <td><input class="input" bind:value={$prodInfo.venue}/></td>
            </tr>
            <tr>
              <td class="flex"><p class="h6 py-auto">Notes:</p></td>
              <td><textarea class="textarea" rows="3" bind:value={$prodInfo.notes}/></td>
            </tr>
        </tbody>
      </table>
  </div>

    <hr class="my-4"/>
<!-- File Drop Zones -->

    <div class="flex flex-row">
      <FileDropzone on:change={(e) => handleFileChange(e, prodImage)} class="w-1/2" type="file" name="Production Image" slotLead="object-center" slotMeta="variant"accept="image/*">
        <svelte:fragment slot="lead"><span class="text-4xl"><DownloadIcon/></span></svelte:fragment>
        <svelte:fragment slot="message">Place Production Image</svelte:fragment>
        <svelte:fragment slot="meta">Only PNG, JPEG, JPG allowed</svelte:fragment>
      </FileDropzone>
      <div class="card p-4 mx-4 w-1/2 flex justify-center items-center variant-ringed-surface">

        {#if prodImage}
        {prodImage}
          <img src={prodImage} alt="Production Image"/> 
          {:else}
            <div class="flex flex-row opacity-70">
              <span class="text-2xl"><PhotoIcon/></span>
              <strong class="">Production Image</strong>
            </div>
        {/if}
      </div>
    </div>
    <hr class="my-4"/>
    <div class="flex flex-row">
      <FileDropzone on:change={(e) => handleFileChange(e, stampImage)} class="w-1/2" name="Designer Stamp" slotLead="object-center" accept="image/*">
        <svelte:fragment slot="lead"><span class="text-4xl"><DownloadIcon/></span></svelte:fragment>
        <svelte:fragment slot="message">Place Designer Stamp</svelte:fragment>
        <svelte:fragment slot="meta">Only PNG, JPEG, JPG allowed</svelte:fragment>
      </FileDropzone>
      <div class="card p-4 mx-4 w-1/2 flex justify-center items-center variant-ringed-surface">
        {#if stampImage}
            <img src={stampImage} alt="Stamp Image"/> 
          {:else}
          <div class="flex flex-row opacity-70">
            <span class="text-2xl "><StampIcon/></span>
            <strong class="">Designer Stamp</strong>
          </div>
        {/if}
      </div>
    </div>
  </section>
</div>
