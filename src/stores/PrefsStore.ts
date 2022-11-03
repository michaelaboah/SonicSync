import type { SvelteUISize } from "@svelteuidev/core";
import type { UserPreferences } from "src/Classes";
import { writable } from "svelte/store";
import { tauri_store } from "./renderStore";

export const isDark = writable<boolean>(false);

export async function getDarkMode(): Promise<boolean> {
  const persistData: any = await tauri_store.get("preferences");
  return persistData.darkmode as boolean;
}

export const userPrefs = writable<UserPreferences>({
  darkmode: false,
  rememberMe: false,
  credentials: { email: "", password: "" },
  ui_font_size: "sm",
});

const handleUserFontSize = () => {
  const { subscribe, set, update } = writable<SvelteUISize>("sm");

  subscribe(async (size) => {
    const userData: any = await tauri_store.get("preferences");
    await tauri_store.set("preferences", { ...userData, SvelteUIFontSize: size });
  });

  tauri_store.get<UserPreferences>("preferences").then((value) => {
    if (value) {
      set(value.ui_font_size);
    }
  });
  return { set, update, subscribe };
};

export const fontSizeTest = handleUserFontSize();
// tauri_store.get("preferences").then((_userData: any) => {
//   console.log("userData");
// });
