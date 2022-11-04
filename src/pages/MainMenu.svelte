<script lang="ts">
  import { prodInfo } from "../stores/ProjectStore";
  import { persist } from "../stores/renderStore";
  import { Button, Text } from "@svelteuidev/core";
</script>

<header>
  <h2 class="text-red-400">Main Menu</h2>
</header>

<h1>{$prodInfo.productionName ? "Current Project: " + $prodInfo.productionName : "New Project"}</h1>
<Button on:click="{() => ($persist.ui_font_size = 'lg')}" color="grape">Change font</Button>

<Text size="{$persist.ui_font_size}">Here is some test text</Text>

<style>
  h2,
  h1 {
    margin: auto;
  }
</style>
