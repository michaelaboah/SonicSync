import SQLite from 'tauri-plugin-sqlite';
import type { ComputerItem } from '../../../generated/graphql';

const CREATE_COMPUTER_ITEM_TABLE = `CREATE TABLE computer_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  cpu_processor text NOT NULL,
  ram_size integer NOT NULL,
  total_storage integer NOT NULL,
  model_year text NULL,
  operating_system text NULL,
  dedicated_graphics integer NOT NULL,
  network_connectivity JSON NULL,
  computer_ports JSON NULL,
  power JSON NULL
);`;
export default CREATE_COMPUTER_ITEM_TABLE;

export const insertComputerItem = async (computer: ComputerItem) => {
  const db = await SQLite.open('sqlite:internal.db');
  const result = await db.execute(
    `INSERT INTO computer_item (cpu_processor, ram_size, total_storage, model_year, operating_system, dedicated_graphics, network_connectivity, power) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);`,
    Object.values(computer)
  );
  // await db.close();
  return result;
};
