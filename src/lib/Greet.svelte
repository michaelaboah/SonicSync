<script async script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { emit, listen } from "@tauri-apps/api/event";
  import { dialog } from "@tauri-apps/api";

  let name = "";
  let greetMsg = "";

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name });
  }

  const save = async () => {
    let saved_path = dialog.save({
      title: "Save File",
      filters: [{ name: "Most common", extensions: ["txt", "json", "dae"] }],
    });

    // console.log(await saved_path);
    let saveFile = await invoke("save_as_file", {
      filePath: await saved_path,
      data: "name",
    });
  };

  const click = async () => {
    const unlisten = await listen("click", (event) => {
      console.log(event.event);
      console.log(event.payload);
    });
  };

  emit("click", {
    theMessage: "Tauri is cool",
  });
</script>

<div>
  <div class="row">
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button on:click={greet}> Greet </button>
    <button on:click={save}> Save </button>
    <button on:click={click}> Click </button>
  </div>
  <p>{greetMsg}</p>
</div>
