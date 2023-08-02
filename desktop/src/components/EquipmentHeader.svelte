<script lang="ts">
  import { Box, Stack, Title } from "@svelteuidev/core";
  export let categoryName: string = "Null";
</script>

<Box css="{{ backgroundColor: '$cyan100' }}">
  <Stack>
    <Title order="{3}">{categoryName}</Title>
    <slot />
  </Stack>
</Box>
