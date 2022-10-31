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
  import { currentFile } from "./stores/Store"; //, loadProject
  import { project } from "./stores/Store";
  import { tauri_store } from "./stores/renderStore";

  let isDark: boolean;
  (async () => {
    isDark = await getDarkMode();
  })();

  onMount(async () => {
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
  });

  async function getDarkMode() {
    const persistData: any = await tauri_store.get("preferences");
    return persistData.darkmode;
  }

  setContext(themeKey, {
    toggleDark: () => (isDark = !isDark),
  });
</script>

<SvelteUIProvider withGlobalStyles themeObserver="{isDark ? 'dark' : 'light'}">
  <AppShell>
    <Routes />
    <Header />
    <Footer />
  </AppShell>
</SvelteUIProvider>

<style global lang="postcss">
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
