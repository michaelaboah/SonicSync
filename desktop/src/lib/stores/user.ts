import { derived, writable, get } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
import { modeCurrent } from "@skeletonlabs/skeleton" 
import { DEFAULT, type Preferences } from '$lib/@types/user';

const tauri_store = new Store('.preferences.dat');


function managePersistance() {
    const { subscribe, set, update } = writable<Preferences>(DEFAULT);
    tauri_store.get<Preferences>('preferences').then((value) => {
        // // if get is undefined/null then initialize the file.
        //     console.log(value)
        if (!value || value === undefined) {
            tauri_store.set('preferences',  DEFAULT);
        } else {
            set(value);
            modeCurrent.set(value.ui.darkMode)
        } 

        tauri_store.save();
    });
    subscribe((n) => {
        if (n !== undefined) {
              console.log(n)
            tauri_store.set('preferences', n);
            tauri_store.save();
        }
    });
    
    return { subscribe, set, update };
};



export const preferences = managePersistance();

modeCurrent.subscribe((b) => {
  let curr = get(preferences)
  curr.ui.darkMode = b
  preferences.set(curr)
  console.log(curr.ui)
})
export const accessToken = writable('');
export const currentFile = writable<string>('');
// export const sidebarToggle = writable<boolean>();
