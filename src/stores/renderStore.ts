// import type ElectronStore from "electron-store";
// import Store from "electron-store";
import { writable } from "svelte/store";

// Store.initRenderer();

export const managePersistance = () => {
  const { subscribe, set, update } = writable<UserPreferences>();
  return { subscribe, set, update };
};

type UserPreferences = {
  rememberMe: { username: string; password: string };
};

export const persist = managePersistance();
