<script lang="ts">
  import { Box, Button, InputWrapper, SimpleGrid, TextInput, Paper, Group } from "@svelteuidev/core";
  import { ADD_ITEM } from "../database/entities/Item";
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

  const test = async () => {
    const db = await Sqlite;
    const thing = await db.execute(ADD_ITEM, [
      ["date", "date", "Test Model", null, null, "Search", "public notes", 2, 5, "JSON", 0],
    ]);
    console.log(thing);
  };

  test();
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
