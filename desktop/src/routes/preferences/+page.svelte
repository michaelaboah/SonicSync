<script lang="ts">
	import { RadioItem, RadioGroup, setModeCurrent, modeOsPrefers, modeCurrent } from "@skeletonlabs/skeleton";
  import { tauri_store } from "$lib/stores/user"
  import SunIcon from "~icons/ri/sun-line"
  import MoonIcon from "~icons/ri/moon-clear-fill"
	import { invoke } from "@tauri-apps/api/tauri";
  let value = $modeCurrent ? 0 : 1 

  $: if (value === 0) {
    setModeCurrent(true)
  } else if (value === 1) {
    setModeCurrent(false)
  } //else if (value === 2) {
  //   setModeCurrent($modeOsPrefers)
  // }

</script>

<div class="p-4 space-y-8">

  <section>
    <h2 class="h3">User Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>

    <!-- Implement "Are You Sure?" -->
     
    <div class="flex flex-row ml-4">

      <button class="btn variant-filled-error" on:click={() => tauri_store.reset()}>Reset Preferences</button>

    </div>
  </section>

  <section>

    <h2 class="h3">Appearance Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>

    <div class="flex flex-row ml-4">

      <h4 class="h5 mt-1"><strong>Theme: </strong></h4>

      <RadioGroup rounded="rounded-token" active="variant-filled-primary" class="scale-75" >
        <RadioItem bind:group={value} name="justify" value={0}>Light</RadioItem>
        <RadioItem bind:group={value} name="justify" value={1}>Dark</RadioItem>
        <!-- <RadioItem bind:group={value} name="justify" title="Sync With System" value={2}>System</RadioItem> -->
      </RadioGroup>

    </div>

  </section>

  <section>
    <h2 class="h3">Database Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>
  
    <div class="flex flex-row ml-4">
      <button class="btn btn-md variant-filled-error" on:click={() => invoke("delete_all")}>Clear Database</button> 
    </div>

  </section>

</div>
