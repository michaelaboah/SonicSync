<script lang="ts">
  import PhotoDrop from "../components/PhotoDrop.svelte";
  import {
    Box,
    Button,
    Center,
    Checkbox,
    Group,
    InputWrapper,
    SimpleGrid,
    TextInput,
    Title,
    // Tooltip,
  } from "@svelteuidev/core";
  import { prodInfo } from "../stores/Store";
  const size = "lg";

  $: positions = [
    { label: "Associate Designer", tuple: ($prodInfo.associate ??= ["", false]) },
    { label: "Assistant Designer", tuple: ($prodInfo.assistant ??= ["", false]) },
    { label: "Production Sound", tuple: ($prodInfo.productionSound ??= ["", false]) },
    { label: "Assistant Production Sound", tuple: ($prodInfo.asstProdSound ??= ["", false]) },
    { label: "A1 / Board Op", tuple: ($prodInfo.audio1 ??= ["", false]) },
    { label: "A2", value: false, tuple: ($prodInfo.audio2 ??= ["", false]) },
  ];
</script>

<Box>
  <Title mb="xl">Production Configuration</Title>
  <SimpleGrid cols="{2}" ml="lg">
    <InputWrapper label="{''}" labelElement="{undefined}" size="{size}">
      <Group>
        {#each positions as { label, tuple: [_vari, bool] }}
          <Checkbox bind:checked="{bool}" label="{label}" />
        {/each}
        <!-- <Tooltip opened={opened} label=""> -->
        <Button disabled>Select All</Button>
        <!-- </Tooltip> -->
      </Group>
      <TextInput
        placeholder="WALL-E"
        label="Production or Show name: "
        bind:value="{$prodInfo.productionName}"
        size="{size}"
      />
      <SimpleGrid cols="{3}">
        <TextInput placeholder="Ben Burtt" label="Designer: " bind:value="{$prodInfo.designer}" size="{size}" />
        <TextInput
          placeholder="(123)-456-7890 "
          label="Designer Phone #: "
          bind:value="{$prodInfo.designerPhone}"
          size="{size}"
        />
        <TextInput
          placeholder="Ben-Burtt@wall-eve.com"
          label="Designer Email: "
          bind:value="{$prodInfo.designerEmail}"
          size="{size}"
        />

        {#each positions as { label, tuple: [vari, bool] }}
          {#if bool}
            <TextInput label="{label + ': '}" bind:value="{vari}" size="{size}" />
          {/if}
        {/each}
      </SimpleGrid>
    </InputWrapper>
    <Center inline="{false}">
      <PhotoDrop bind:image="{$prodInfo.showImage}" dropZoneName="{'Production Image'}" />
    </Center>
    <Box />
    <Center inline="{false}">
      <PhotoDrop bind:image="{$prodInfo.designerStamp}" dropZoneName="{'Designer Stamp'}" />
    </Center>
  </SimpleGrid>
</Box>
