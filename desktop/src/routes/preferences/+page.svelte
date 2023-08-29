<script lang="ts">
	import { RadioItem, RadioGroup, setModeCurrent, modeOsPrefers, modeCurrent } from "@skeletonlabs/skeleton";
  import { tauri_store } from "$lib/stores/user"
  import SunIcon from "~icons/ri/sun-line"
  import MoonIcon from "~icons/ri/moon-clear-fill"
  let value = $modeCurrent ? 0 : 1 

  $: if (value === 0) {
    setModeCurrent(true)
  } else if (value === 1) {
    setModeCurrent(false)
  } //else if (value === 2) {
  //   setModeCurrent($modeOsPrefers)
  // }

</script>

<section class="p-4">
  <h2 class="h2">User Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>

  <!-- Implement "Are You Sure?" -->
    <button class="btn variant-filled-error" on:click={() => tauri_store.reset()}>Reset Preferences</button>


  <h2 class="h2">Appearance Settings</h2>
    <hr class="w-5/6 mt-4 mb-2"/>
  <div class="flex flex-row">
    <h4 class="h4"><strong>Theme: </strong></h4>


    <RadioGroup rounded="rounded-token" active="variant-filled-primary" class="scale-90" >
      <RadioItem bind:group={value} name="justify" value={0}>Light</RadioItem>
      <RadioItem bind:group={value} name="justify" value={1}>Dark</RadioItem>
      <!-- <RadioItem bind:group={value} name="justify" title="Sync With System" value={2}>System</RadioItem> -->
    </RadioGroup>

  </div>

</section>
