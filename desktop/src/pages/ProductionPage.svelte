<script lang="ts">
  import PhotoDrop from '../components/PhotoDrop.svelte';
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
    Tooltip,
  } from '@svelteuidev/core';
  import { prodInfo } from '../stores/ProjectStore';
  const size = 'sm';

  $: positions = [
    { label: 'Associate Designer', tuple: ($prodInfo.associate ??= ['', false]) },
    { label: 'Assistant Designer', tuple: ($prodInfo.assistant ??= ['', false]) },
    { label: 'Production Sound', tuple: ($prodInfo.productionSound ??= ['', false]) },
    { label: 'Assistant Production Sound', tuple: ($prodInfo.asstProdSound ??= ['', false]) },
    { label: 'A1 / Board Op', tuple: ($prodInfo.audio1 ??= ['', false]) },
    { label: 'A2', value: false, tuple: ($prodInfo.audio2 ??= ['', false]) },
  ];
  let selectButton = 'Select All';
  const selectAll = () => {
    let selectButton = 'Deselect All';
    positions.forEach((x) => {
      x.tuple[1] = !x.tuple[1];
      if (x.tuple[1]) {
        selectButton = 'Deselect All';
      }
    });
    positions = positions;
  };
</script>

<Box>
  <Title underline mb="lg">Production Configuration</Title>
  <SimpleGrid cols="{2}" ml="lg">
    <InputWrapper label="" labelElement="{undefined}" size="{size}">
      <Group>
        {#each positions as { label, tuple: [_, bool] }}
          <Checkbox bind:checked="{bool}" label="{label}" size="{size}" />
        {/each}
        <Tooltip label="Select all positions">
          <Button on:click="{selectAll}">{selectButton}</Button>
        </Tooltip>
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
            <TextInput label="{`${label}: `}" bind:value="{vari}" size="{size}" />
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
