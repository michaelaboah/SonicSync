import { resolveResource, appDataDir } from '@tauri-apps/api/path';
export const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT_LOCAL;
export const REFRESH_ENDPOINT = import.meta.env.VITE_REFRESH_ENDPOINT_LOCAL;
export let SQL_DB_PATH = '';

function get(test: string) {
    SQL_DB_PATH = test;
    console.log(SQL_DB_PATH);
}
resolveResource('sqlite-internal.db').then((path) => get(path));
