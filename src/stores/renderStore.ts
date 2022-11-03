// import type ElectronStore from "electron-store";
// import Store from "electron-store";
import { writable } from "svelte/store";
import { Store } from "tauri-plugin-store-api";

// Store.initRenderer();

export const managePersistance = () => {
  const { subscribe, set, update } = writable<UserPreferences>();
  return { subscribe, set, update };
};

type UserPreferences = {
  rememberMe: { username: string; password: string };
};

export const persist = managePersistance();

export const tauri_store = new Store("../settings.dat");

tauri_store
  .get("preferences")
  .then((value) => console.log(value))
  .catch((err) => console.log(err));
