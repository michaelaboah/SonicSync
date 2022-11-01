<script lang="ts">
  import { prodInfo } from "../stores/Store";
  import { invoke } from "@tauri-apps/api/tauri";
  // import { onMount } from "svelte";

  // onMount(async() => {

  // })

  const open = () => invoke("open_file", {}).then((value) => console.log(value));
</script>

<header>
  <h2 class="text-red-400">Main Menu</h2>
</header>

<h1>{$prodInfo.productionName ? "Current Project: " + $prodInfo.productionName : "New Project"}</h1>

<button on:click="{open}">Big ass button</button>

<style>
  h2,
  h1 {
    margin: auto;
  }
</style>
