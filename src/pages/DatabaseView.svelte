<script lang="ts">
  import { Box, Button, InputWrapper, SimpleGrid, TextInput, Paper, Group } from "@svelteuidev/core";
  import Sqlite from "../database/Sqlite";

  let executeString = ``;
  let selectString = ``;
  let results: boolean;
  let response: Array<{ response: any }>;
  const executeQuery = async () => {
    const db = await Sqlite;
    results = await db.execute(executeString);
    console.log(results);
  };

  const selectQuery = async () => {
    const db = await Sqlite;
    response = await db.select<Array<{ response: any }>>(selectString);
    console.log(response);
  };
</script>

<Box class="h-full">
  <SimpleGrid cols="{2}" spacing="xl">
    <!-- Execute Coloumn -->
    <Box>
      <InputWrapper label="{'Execute Query'}" class="{'text-center'}" mb="xl">
        <Group>
          <TextInput bind:value="{executeString}" class="w-11/12" multiline="{true}" />
          <Button on:click="{executeQuery}">Fire</Button>
        </Group>
      </InputWrapper>
      <Paper withBorder class="text-center">{results}</Paper>
    </Box>
    <!-- Select Coloumn -->
    <Box>
      <InputWrapper label="{'Select Query'}" class="{'text-center'}" mb="xl">
        <Group>
          <TextInput bind:value="{selectString}" class="w-11/12" multiline="{true}" showRightSection />
          <Button on:click="{selectQuery}">Fire</Button>
        </Group>
      </InputWrapper>
      <Paper withBorder class="text-center">{JSON.stringify(response)}</Paper>
    </Box>
  </SimpleGrid>
</Box>

<style>
</style>
