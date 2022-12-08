import SQLite from 'tauri-plugin-sqlite';
import type { NetworkItem } from '../../../generated/graphql';

const CREATE_NETWORK_ITEM = `CREATE TABLE network_item (
    id integer NOT NULL PRIMARY KEY autoincrement,
    network_type integer NOT NULL,
    poe_ports integer NOT NULL,
    max_speed integer NOT NULL,
    fiber integer NULL,
    network_connectivity JSON NULL,
    power JSON NULL
);`;

export default CREATE_NETWORK_ITEM;
export const insert_network_item = async (network: NetworkItem): Promise<number | string> => {
  const db = await SQLite.open('sqlite:internal.db');
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO network_item (
                network_type,
                poe_ports,
                max_speed,
                fiber,
                network_connectivity,
                power
            ) VALUES (
                ?1,
                ?2,
                ?3,
                ?4,
                ?5,
                ?6
            ) RETURNING id;`,
      [
        network.network_type,
        network.poe_ports,
        network.max_speed,
        network.fiber,
        JSON.stringify(network.network_connectivity),
        JSON.stringify(network.power),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting network item: ${error.message}`);
    return JSON.stringify(error);
  }
};
