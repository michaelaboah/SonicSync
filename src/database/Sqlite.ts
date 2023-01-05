import SQLite from 'tauri-plugin-sqlite';
import { resolveResource } from '@tauri-apps/api/path';
import { ROUTINE_PRAGMA_QUERIES, TABLES } from './entities/SQLController';
import { SQL_DB_PATH } from '../utils/ClientContants';

const ENABLE_FOREIGN_KEYS = `PRAGMA foreign_keys = ON;`;
const tableCheck = (tableName: string) => `
SELECT CASE WHEN EXISTS 
  (SELECT 1 FROM sqlite_master WHERE type='table' AND name = '${tableName}')
  THEN "true"
  ELSE "false"
  END AS TableExists
`;

console.log(SQL_DB_PATH);

export const initialize_database = async (): Promise<void> => {
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    TABLES.forEach((table) => createTables(table));

    ROUTINE_PRAGMA_QUERIES.forEach(async (routine: string) => await db.execute(routine));
    const check = await db.select<{ integrity_check: string }[]>(`PRAGMA integrity_check`);
    if (check[0].integrity_check === 'ok') {
        console.log('Database is OK');
    }
};

export const createTables = async (table: string) => {
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    await db.execute(ENABLE_FOREIGN_KEYS);
    await db.execute(table).catch((err: string) => {
        if (err.includes('code 1')) {
            // console.log('Normal Behavior');
        } else {
            console.log('Irregular Behavior' + err);
        }
    });
};

// export default Sqlite;
