<script lang="ts">
  import { setContext } from "svelte";
  import { AppShell, SvelteUIProvider } from "@svelteuidev/core";
  import "@svelteuidev/prism";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Routes from "./components/Routes.svelte";
  import { themeKey } from "./utils/contextKeys";
  import { currentFile, loadProject } from "./stores/Store";
  import type { Project } from "./Classes";
  import { project } from "./stores/Store";
  let isDark: boolean;
  (async () => {
    isDark = await getDarkMode();
  })();

  async function getDarkMode() {
    const persistData = await window.api.handleUserStorage("preferences");
    return persistData.darkmode;
  }

  setContext(themeKey, {
    toggleDark: () => (isDark = !isDark),
  });
</script>

<SvelteUIProvider withGlobalStyles>
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
