<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { invoke } from "@tauri-apps/api/tauri";
  import { AppShell, SvelteUIProvider } from "@svelteuidev/core";
  import "@svelteuidev/prism";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Routes from "./components/Routes.svelte";
  import { themeKey } from "./utils/contextKeys";
  import { currentFile, loadProject, project } from "./stores/ProjectStore"; //, loadProject
  import { getDarkMode, isDark } from "./stores/PrefsStore";

  onMount(async () => {
    //Write to darkmode store, from tauri_store("preferences")
    $isDark = await getDarkMode();

    // tauri_store.get("preferences").then((userData: any) => {
    //   console.log(userData);
    // });

    await listen("save", (_event) => {
      invoke("save_as_file", { file_path: $currentFile, data: $project }).then((value) => {
        console.log(value);
      });
    });

    await listen("save-as", (_event) => {
      invoke("save_as_file", { data: $project }).then((value) => {
        console.log(value);
      });
    });

    await listen("open-project-file", async () => {
      loadProject(JSON.parse(await invoke("open_project")));
    });
  });

  setContext(themeKey, {
    toggleDark: () => ($isDark = !$isDark),
  });
</script>

<SvelteUIProvider withGlobalStyles themeObserver="{$isDark ? 'dark' : 'light'}">
  <AppShell>
    <Header />
    <Routes />
    <Footer />
  </AppShell>
</SvelteUIProvider>

<style global lang="postcss">
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
