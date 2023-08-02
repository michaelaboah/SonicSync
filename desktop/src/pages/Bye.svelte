<script lang="ts">
  import { Bye } from "../generated/graphql";

  $: status = Bye({ fetchPolicy: "network-only" });
  console.log("status");
</script>

<div>Hello</div>
{#if $status.loading}
  <div>...loading</div>
{:else if $status.errors}
  <div>{$status.errors}</div>
{:else if !$status.data}
  <div>No Data</div>
{:else}
  <div>{$status.data.bye}</div>
{/if}
