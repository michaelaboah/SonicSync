import Database from "tauri-plugin-sqlite";
// import { CREATE_CONSOLE_TABLE } from "./entities/ConsoleItem";
import { CreateItemTable } from "./entities/Item";
// import { CREATE_PROCESSOR_TABLE } from "./entities/ProcessingItem";
export const Sqlite = Database.open("sqlite:internal.db");

export const TABLES = [
  CreateItemTable,
  // CREATE_PROCESSOR_TABLE, CREATE_CONSOLE_TABLE
];

export const initialize_database = async () => {
  const db = await Sqlite;
  await db.execute(ENABLE_FOREIGN_KEYS);

  const results = await db.select(TABLE_CHECK);
  return results;
  //   TABLES.forEach((tableQuery) => {
  //     db.execute(tableQuery).catch((err) => {
  //       if (!err) console.log(err);
  //     });
  //   });
};

export default Sqlite;

const ENABLE_FOREIGN_KEYS = `PRAGMA foreign_keys = ON;`;
const TABLE_CHECK = `
SELECT EXISTS ( SELECT name FROM sqlite_master WHERE type="table" AND name IN ("items") );
`;
