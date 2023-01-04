import type { UserPreferences } from '../Classes';
import { writable } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
import { fs, path } from '@tauri-apps/api';

async function setupPersist(storePath?: string) {
    // console.log(await path.appLocalDataDir());
}

setupPersist();

export const tauri_store = new Store('settings.dat');
// tauri_store.load();
console.log('hello');

const managePersistance = () => {
    const default_prefs = {
        darkMode: false,
        rememberMe: false,
        credentials: { email: '', password: '' },
        ui_font_size: 'xs',
        sql_auto_store: true,
    } as UserPreferences;

    const { subscribe, set, update } = writable<UserPreferences>(default_prefs);
    tauri_store.get<UserPreferences>('preferences').then((value) => {
        if (!value || value === undefined) {
            set(default_prefs);
        } else {
            set(value);
        }
    });

    subscribe((n) => {
        console.log(JSON.stringify(tauri_store));
        if (n !== default_prefs) {
            tauri_store.set('preferences', n);
            tauri_store.save();
        }
    });

    return { subscribe, set, update };
};

export const persist = managePersistance();
