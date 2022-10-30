<style>
  .zone {
    background-color: #eeeeee;
    padding: var(--theme-pad);
    border: 2px solid #dddddd;
  }
  .droppable {
    border-color: #1f79ff;
  }
</style>

<script lang="ts">
  import { FileDrop } from "svelte-droplet";
  import {
    Box,
    Center,
    CloseButton,
    Group,
    Image,
    Text,
    // Tooltip,
  } from "@svelteuidev/core";
  let rest: any;
  export let image: string | undefined;
  export let dropZoneName: string = "Image";
  export let acceptedMimes = ["image/webp", "image/jpeg", "image/png", "image/gif", "image/svg+xml"];
  let alt = "";

  let dropZonePadding: string | undefined;
  const photoReader = new FileReader();

  async function handleFiles(files: File[]) {
    photoReader.onloadend = function () {
      image = photoReader.result?.toString();
    };
    photoReader.readAsDataURL(files[0]);
    alt = files[0].name;
  }

  $: image ? (dropZonePadding = "0.5vw") : (dropZonePadding = "4vw");
</script>

<Box
  ml="xl"
  css="{{ p: '$6', borderColor: '$black', borderBlockStyle: 'solid', bc: 'LightGrey', width: 'max-content' }}"
>
  <Group position="apart" noWrap>
    <Text align="right" size="xl" weight="{'semibold'}" mb="{'md'}">{dropZoneName}</Text>
    <CloseButton iconSize="xl" on:click="{() => (image = undefined)}" />
  </Group>

  <FileDrop max="{1}" let:droppable handleFiles="{handleFiles}" acceptedMimes="{acceptedMimes}">
    <div class="zone" class:droppable style="--theme-pad: {dropZonePadding}">
      {#if image}
        <Center inline="{false}">
          <Image
            bind:src="{image}"
            fit="contain"
            width="{400}"
            height="{300}"
            alt="{alt}"
            usePlaceholder="{false}"
            {...rest}
          />
        </Center>
      {:else}
        <Text align="center" size="xl">Drag and Drop 1 Image</Text>
      {/if}
    </div>
  </FileDrop>
</Box>
