<script lang="ts">
  import { prodInfo } from "../stores/Store";
</script>

<header>
  <h2 class="text-red-400">Main Menu</h2>
</header>

<h1>{$prodInfo.productionName ? "Current Project: " + $prodInfo.productionName : "New Project"}</h1>

<style>
  h2,
  h1 {
    margin: auto;
  }
</style>
