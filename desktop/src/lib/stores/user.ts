import { writable } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
import type UserPreferences from "$lib/@types/user"

const default_prefs = {
    darkMode: false,
    rememberMe: false,
    credentials: { email: '', password: '' },
    dbAutoStore: false,
} as UserPreferences;

const tauri_store = new Store('.frontend_store.dat');

function managePersistance() {
    const { subscribe, set, update } = writable<UserPreferences>(default_prefs);
    tauri_store.get<UserPreferences>('preferences').then((value) => {
        // if get is undefined/null then initialize the file.
        if (!value || value === undefined) {
            tauri_store.set('preferences', default_prefs);
            tauri_store.save();
        } else {
            set(value);
        }
    });
    subscribe((n) => {
        if (n !== default_prefs) {
            tauri_store.set('preferences', n);
            tauri_store.save();
        }
    });
    
    return { subscribe, set, update };
};

export const persist = managePersistance();

export const accessToken = writable('');
export const currentFile = writable<string>('');

