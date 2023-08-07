<script lang="ts">
  import { FileDropzone } from "@skeletonlabs/skeleton";
  // import DownloadIcon from "~icons/ri/file-upload-line"
  // import PhotoIcon from "~icons/ri/image-2-line"
  // import StampIcon from "~icons/ph/stamp"
  let prodImage: File 
  let stampImage: File


  let productionDetails = [
    {label: "Production", textInput: "Sweeny Todd"},
    {label: "Director", textInput: "John Carmack"},
    {label: "Venue", textInput: "Strathmore Music Hall"},
  ]
  let notes = ""
</script>

<div class="flex flex-row w-full h-full">
  <section class="flex-grow w-1/2">
    <h2 class="h2">Team</h2>
    <h3 class="h4 mb-4 opacity-70">Add Team Members</h3>
  </section>
  <span class="divider-vertical h-full w-0" />
  <section class="flex-grow w-1/2 ml-4 mr-8">
    <h2 class="h2">Details</h2>
    <h3 class="h4 mb-4 opacity-70">Additional Information for Paperwork</h3>

    <hr class="my-4"/>
<!-- Production Details -->
    <!-- <ul class="list ml-4 "> -->
    <!--   <li class="flex flex-row "> -->
    <!--     <strong class="flex-none">Production: </strong> -->
    <!--     <input class="input h-3/4 grow-0" type="text" placeholder="Sweeny Todd"/> -->
    <!--   </li> -->
    <!--   <li class="flex flex-row"> -->
    <!--     <strong>Director: </strong> -->
    <!--   </li> -->
    <!--   <li class="flex flex-row"> -->
    <!--     <strong>Venue: </strong> -->
    <!--   </li> -->
    <!--   <li class="flex flex-row"> -->
    <!--     <strong>Notes: </strong> -->
    <!--   </li> -->
    <!-- </ul> -->
    <div class="table-container">
      <table class="table table-hover">
        <tbody>
          {#each productionDetails as {label, textInput}}
            <tr>
              <td class="flex ">
                <p class="h5 py-auto">{label}:</p>
              </td>
              <td>
              <input class="input" bind:value={textInput}/>
              </td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <td>
            <p class="h5">Notes:</p>
          </td>
          <td>
            <textarea class="textarea" rows="4" bind:value={notes}/>
          </td>
        </tfoot>
      </table>
  </div>

    <hr class="my-4"/>
<!-- File Drop Zones -->

    <div class="flex flex-row">
      <FileDropzone class="w-1/2" name="Production Image" slotLead="object-center" slotMet="variant"accept="image/*">
        <!-- <svelte:fragment slot="lead"><span class="text-4xl"><DownloadIcon/></span></svelte:fragment> -->
        <svelte:fragment slot="message">Place Production Image</svelte:fragment>
        <svelte:fragment slot="meta">Only PNG, JPEG, JPG allowed</svelte:fragment>
      </FileDropzone>
      <div class="card p-4 mx-4 w-1/2 flex justify-center items-center variant-ringed-surface">
        {#if prodImage}
           <!-- content here -->
          {:else}
            <div class="flex flex-row opacity-70">
              <!-- <span class="text-2xl"><PhotoIcon/></span> -->
              <strong class="">Production Image</strong>
            </div>
        {/if}
      </div>
    </div>
    <hr class="my-4"/>
    <div class="flex flex-row">
      <FileDropzone class="w-1/2" name="Designer Stamp" slotLead="object-center" accept="image/*">
        <!-- <svelte:fragment slot="lead"><span class="text-4xl"><DownloadIcon/></span></svelte:fragment> -->
        <svelte:fragment slot="message">Place Designer Stamp</svelte:fragment>
        <svelte:fragment slot="meta">Only PNG, JPEG, JPG allowed</svelte:fragment>
      </FileDropzone>
      <div class="card p-4 mx-4 w-1/2 flex justify-center items-center variant-ringed-surface">
        {#if stampImage}
           <!-- content here -->
          {:else}
          <div class="flex flex-row opacity-70">
            <!-- <span class="text-2xl "><StampIcon/></span> -->
            <strong class="">Designer Stamp</strong>
          </div>
        {/if}
      </div>
    </div>
  </section>
</div>
