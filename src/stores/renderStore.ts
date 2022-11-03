// import type ElectronStore from "electron-store";
import type { UserPreferences } from "src/Classes";
import { writable } from "svelte/store";
import { Store } from "tauri-plugin-store-api";

export const tauri_store = new Store("../settings.dat");

export const managePersistance = () => {
  const default_prefs = {
    darkMode: false,
    rememberMe: false,
    credentials: { email: "", password: "" },
    ui_font_size: "xs",
  } as UserPreferences;

  const { subscribe, set, update } = writable<UserPreferences>();
  set(default_prefs);
  tauri_store.get<UserPreferences>("preferences").then((value) => {
    //if no value then default
    if (!value) {
      console.log(`Getting value from store, was null: ${value}`);
      set(default_prefs);
    }
    // if !null check if undefined
    else if (value === undefined) {
      console.log(`Getting value from store, was undefined: ${Object.entries(value)}`);
      set(default_prefs);
    } else {
      console.log(`Getting value from store, was found!: ${JSON.stringify(value)}`);
      set(value);
    }
  });

  subscribe((n) => {
    if (n !== default_prefs) {
      console.log("False alarm");
    } else {
      tauri_store.set("preferences", n);
      tauri_store.save();
    }
  });

  return { subscribe, set, update };
};

export const persist = managePersistance();
