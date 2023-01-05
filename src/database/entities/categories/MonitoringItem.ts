import SQLite from 'tauri-plugin-sqlite';
import { resolveResource } from '@tauri-apps/api/path';
import type { MonitoringItem } from '../../../generated/graphql';

const CREATE_MONITORING_ITEM = `
CREATE TABLE monitoring_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  distro integer NULL,
  network_connectivity JSON NULL,
  physical_connectivity JSON NULL,
  power JSON NULL
);
`;

export const insert_monitoring_item = async (monitoring: MonitoringItem): Promise<number | string> => {
    if (monitoring.id) {
        delete monitoring.id;
    }
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    console.log(Object.values(monitoring));
    try {
        const result = await db.select<{ id: number }[]>(
            `INSERT INTO monitoring_item (
      distro,
      network_connectivity,
      physical_connectivity,
      power
    )
    VALUES (
      ?1,
      ?2,
      ?3,
      ?4
    ) RETURNING id;`,
            [
                monitoring.distro,
                JSON.stringify(monitoring.network_connectivity),
                JSON.stringify(monitoring.physical_connectivity),
                JSON.stringify(monitoring.power),
            ]
        );
        return result[0].id;
    } catch (error: any) {
        console.error(`Error inserting monitoring item: ${error.message}`);
        return JSON.stringify(error);
    }
    // await db.close();
};

export default CREATE_MONITORING_ITEM;
