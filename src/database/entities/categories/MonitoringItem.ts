import SQLite from 'tauri-plugin-sqlite';
import type { MonitoringItem } from '../../../generated/graphql';

export const CREATE_MONITORING_ITEM = `
CREATE TABLE monitoring_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  distro integer NULL,
  network_connectivity JSON NULL,
  physical_connectivity JSON NULL,
  power JSON NULL
);
`;

export const insertMonitoringItem = async (data: MonitoringItem) => {
  const db = await SQLite.open('sqlite:internal.db');
  const result = await db.execute('INSERT INTO monitoring_item (distro, network_connectivity) VALUES (?1, ?2)', [
    Object.values(data),
  ]);
  await db.close();
  return result;
};

// export default CREATE_MONITORING_ITEM;
