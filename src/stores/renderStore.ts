import type { UserPreferences } from '../Classes';
import { writable } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
import { fs, path } from '@tauri-apps/api';

async function setupPersist(storePath?: string) {
    // console.log(await path.appLocalDataDir());
}

setupPersist();
const default_prefs = {
    darkMode: false,
    rememberMe: false,
    credentials: { email: '', password: '' },
    ui_font_size: 'xs',
    sql_auto_store: true,
} as UserPreferences;
const tauri_store = new Store('.frontend_store.dat');

const managePersistance = () => {
    const { subscribe, set, update } = writable<UserPreferences>(default_prefs);
    tauri_store.get<UserPreferences>('preferences').then((value) => {
        console.log(value);
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
