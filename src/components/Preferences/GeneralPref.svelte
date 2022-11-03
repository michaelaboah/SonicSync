<script lang="ts">
  import { Box, Switch } from "@svelteuidev/core";
  import { persist } from "../../stores/renderStore";
</script>

<Box>
  <Switch
    size="md"
    onLabel="ON"
    offLabel="OFF"
    bind:checked="{$persist.darkMode}"
    label="Toggle Dark-Mode"
    color="dark"
    aria-label="Toggle Dark-Mode"
  />
</Box>
