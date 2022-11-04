import type { UserPreferences } from "../Classes";
import { writable } from "svelte/store";
import { Store } from "tauri-plugin-store-api";

const tauri_store = new Store("../settings.dat");

const managePersistance = () => {
  const default_prefs = {
    darkMode: false,
    rememberMe: false,
    credentials: { email: "", password: "" },
    ui_font_size: "xs",
  } as UserPreferences;

  const { subscribe, set, update } = writable<UserPreferences>(default_prefs);
  tauri_store.get<UserPreferences>("preferences").then((value) => {
    if (!value || value === undefined) {
      set(default_prefs);
    } else {
      set(value);
    }
  });

  subscribe((n) => {
    if (n !== default_prefs) {
      tauri_store.set("preferences", n);
      tauri_store.save();
    }
  });

  return { subscribe, set, update };
};

export const persist = managePersistance();
