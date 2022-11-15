import Database from "tauri-plugin-sqlite";
import { CREATE_CONSOLE_TABLE } from "./entities/ConsoleItem";
import { CreateItemTable } from "./entities/Item";
import { CREATE_PROCESSOR_TABLE } from "./entities/ProcessingItem";
export const Sqlite = Database.open("sqlite:internal.db");

export const TABLES = [CreateItemTable, CREATE_CONSOLE_TABLE, CREATE_PROCESSOR_TABLE];
const tableNames = ["'item'", "'console_item'", "'processing_item'"];

const ENABLE_FOREIGN_KEYS = `PRAGMA foreign_keys = ON;`;
const tableCheck = (tableName: string) => `
SELECT CASE WHEN EXISTS 
  (SELECT 1 FROM sqlite_master WHERE type='table' AND name = ${tableName})
  THEN "true"
  ELSE "false"
  END AS TableExists
`;

export const initialize_database = async (): Promise<void> => {
  const db = await Sqlite;

  tableNames.forEach(async (name, index: number) => {
    const results = await db.select<{ exists: string }[]>(tableCheck(name));
    if (!Object.values(results[0])[0]) createTables(TABLES[index]);
  });
};

export const createTables = async (table: string) => {
  const db = await Sqlite;
  await db.execute(ENABLE_FOREIGN_KEYS);
  await db.execute(table).catch((err: string) => {
    if (err.includes("code 1")) {
      console.log("Normal Behavior");
    } else {
      console.log("Irregular Behavior" + err);
    }
  });
};

export default Sqlite;
