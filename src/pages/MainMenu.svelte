<script lang="ts">
  import { prodInfo } from "../stores/ProjectStore";
  import { fontSizeTest } from "../stores/PrefsStore";
  import { Button, Text } from "@svelteuidev/core";
</script>

<header>
  <h2 class="text-red-400">Main Menu</h2>
</header>

<h1>{$prodInfo.productionName ? "Current Project: " + $prodInfo.productionName : "New Project"}</h1>
<Button on:click="{() => ($fontSizeTest = 'lg')}" color="grape">Change font</Button>

<Text size="{$fontSizeTest}">Here is some test text</Text>

<style>
  h2,
  h1 {
    margin: auto;
  }
</style>
