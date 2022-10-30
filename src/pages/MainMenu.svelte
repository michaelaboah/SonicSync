<style>
  h2,
  h1 {
    margin: auto;
  }
</style>

<script lang="ts">
  import { prodInfo } from "../stores/Store";
</script>

<header>
  <h2>Main Menu</h2>
</header>

<h1>{$prodInfo.productionName ? "Current Project: " + $prodInfo.productionName : "New Project"}</h1>
