<script lang="ts">
  import Router from "svelte-spa-router";
  import MainMenu from "../pages/MainMenu.svelte";
  import Bye from "../pages/Bye.svelte";
  import EquipmentListPage from "../pages/EquipmentListPage.svelte";
  import PreferencesPage from "../pages/PreferencesPage.svelte";
  import ProductionPage from "../pages/ProductionPage.svelte";
  const routes = {
    "/": MainMenu,
    "/Bye": Bye,
    "/EquipmentListPage": EquipmentListPage,
    "/PreferencesPage": PreferencesPage,
    "/ProductionPage": ProductionPage,
  };
</script>

<div>
  <Router routes="{routes}" />
</div>

<style>
  div {
    margin-top: 6vh;
    /* margin-left: 2vw; */
  }
</style>
