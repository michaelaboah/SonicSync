import { writable, get } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
import { modeCurrent, setModeCurrent } from "@skeletonlabs/skeleton" 
import { DEFAULT, type Preferences } from '$lib/@types/user';

export const tauri_store = new Store('.preferences.dat');


export const preferences = writable<Preferences>(DEFAULT);
tauri_store.get<Preferences>("preferences").then((stored) => {
  if (stored) {
    console.log("Retreived Stored Prefs: "+ stored.ui.darkMode)
    setModeCurrent(stored.ui.darkMode)
    preferences.set(stored)
  } else {
    preferences.set(DEFAULT)
    tauri_store.set("preferences", DEFAULT)
    tauri_store.save()
  }
})
 

preferences.subscribe((v) => {
  tauri_store.set("preferences", v)
  tauri_store.save()
})

modeCurrent.subscribe((b) => {
  console.log("Current Mode: " + b)
  let curr = get(preferences)
  curr.ui.darkMode = b
  preferences.set(curr)
})
export const accessToken = writable('');
export const currentFile = writable<string>('');
