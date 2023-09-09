<script lang="ts">
  import  { type Microphone, PolarPattern, MicrophoneType, Analog } from "$lib/@types/graphql"
	import { SlideToggle } from "@skeletonlabs/skeleton";

  export let microphone: Microphone  
  export let edit = false;
  let patterns: Record<string, boolean> = Object.values(PolarPattern).map((x) => {
    return { x: false }
  })



</script>

{#if edit}
<div class="flex">
  <table class="table table-compact">
    
    <tbody> 
      <tr>
        <td>
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Type: </h3>
            <select class="select text-xs" bind:value={microphone.microphone_type}>
              {#each Object.values(MicrophoneType) as type }
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>
        </td>

        <td>
          <div class="flex flex-row h-fit w-fit">
            <h3 class="h6 mr-4">Pattern: </h3>
            <select class="select text-xs h-8 hover:h-fit" size={Object.values(PolarPattern).length} multiple bind:value={microphone.pattern}>
              {#each Object.values(PolarPattern) as pattern }
                <option value={pattern}>{pattern}</option> 
              {/each} 
            </select> 

          </div>
        </td>

        <td class="w-2/5">
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Connector: </h3>
              <select class="select text-xs" bind:value={microphone.connector}>
              {#each Object.values(Analog) as type }
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Phantom:</h3>
            {#if microphone.phantom}
              <SlideToggle name="phantom" size="sm" bind:checked={microphone.phantom}/>
            {:else}
              N/A
            {/if}
          </div>
        </td>

        <td>
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Low Cut:</h3>
            {#if microphone.low_cut}
              <SlideToggle name="phantom" size="sm" bind:checked={microphone.low_cut}/>
            {:else}
              N/A
            {/if}
          </div>
        </td>

        <td>
          <div class="flex flex-row h-8">
          <h3 class="h6 mr-4">Pad:</h3>
            {#if microphone.pad}
              <SlideToggle name="phantom" size="sm" bind:checked={microphone.pad}/>         
            {:else}
              N/A
            {/if}
          </div>
        </td>

      </tr>
    </tbody>
  </table>
</div>
{:else}
<div class="flex">
  <table class="table table-compact">
    
    <tbody> 
      <tr>
        <td>
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Type: </h3>
            <p class="text-xs">{microphone.microphone_type}</p>
          </div>
        </td>

        <td>
          <div class="flex flex-row h-fit w-fit">
            <h3 class="h6 mr-4">Pattern: </h3>
            <p class="text-xs">{microphone.pattern}</p> 
          </div>
        </td>

        <td class="w-2/5">
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Connector: </h3>
            <p class="text-xs">{microphone.connector}</p> 
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Phantom:</h3>
            {#if microphone.phantom}
              <p class="text-xs">{microphone.phantom}</p>         
            {:else}
              N/A
            {/if}
          </div>
        </td>

        <td>
          <div class="flex flex-row h-8">
            <h3 class="h6 mr-4">Low Cut:</h3>
            {#if microphone.low_cut}
              <p class="text-xs">{microphone.low_cut}</p>         
            {:else}
              N/A
            {/if}
          </div>
        </td>

        <td>
          <div class="flex flex-row h-8">
          <h3 class="h6 mr-4">Pad:</h3>
            {#if microphone.pad}
              <p class="text-xs">{microphone.pad}</p>         
            {:else}
              N/A
            {/if}
          </div>
        </td>

      </tr>
    </tbody>
  </table>
</div>
{/if}
