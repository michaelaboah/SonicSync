<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { listen } from "@tauri-apps/api/event";
  import { fs } from "@tauri-apps/api"
  let name = "";
  let greetMsg = "";

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name });
  }

  (async () => {
    await listen("save", (_event) => {
      invoke("save_as_file", { data: "hello" }).then((value) => {
        console.log(value);
      });
    });
  })();

  // (async () => {
  //   const deaf = await listen("save-as", (event) => {
  //     emit("data-to-save", { cool: "beans" });
  //   });
  // })();
</script>

<div>
  <div class="row">
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button on:click={greet}> Greet </button>
    <button on:click={() => {}}>Click</button>

    <!-- <button on:click={} /> -->
  </div>
  <p>{greetMsg}</p>
  <!-- <p>{payload}</p> -->
</div>
