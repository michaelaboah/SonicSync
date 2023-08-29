<script lang="ts">
	import { listen } from "@tauri-apps/api/event";
	import { onMount } from "svelte";
  import { loadProject, meta, project } from "$lib/stores/project"
	import { invoke } from "@tauri-apps/api/tauri";
	import type { Project } from "$lib/@types/project";
	import { preferences } from "$lib/stores/user";
  import { toastStore } from "@skeletonlabs/skeleton" 
 

  $: console.log($meta)

  onMount(async () => {

    setInterval(async () => {
      if ($meta === undefined) {
        return 
      }

      invoke("save", { path: $meta.currentFilePath, object: $project })
        toastStore.trigger({ message: "Saved Project [Auto]"})

    }, $preferences.general.autoSaveTimer) 

    listen('load-project', ({ payload: [path, project] }) => {
      meta.set(path) 
      loadProject(project as Project)
    }) 

    listen("save-project-fetch", ({ payload: path }) => {
      meta.set(path) 
      invoke("save", { path, object: $project })
    })

  })
</script>

