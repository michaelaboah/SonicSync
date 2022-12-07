import SQLite from 'tauri-plugin-sqlite';

const CREATE_MONITORING_ITEM = `
CREATE TABLE microphone_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  max_spl integer NOT NULL,
  phantom integer NULL,
  low_cut integer NULL,
  pad integer NULL,
  diaphragm_size integer NULL,
  output_impedance integer NULL,
  frequency_response text NULL,
  connector INTEGER NOT NULL,
  microphone_type text NULL
);
`;

export const insertMonitoringItem = async (data: any) => {
  const db = await SQLite.open('sqlite:internal.db');
  const result = await db.execute('INSERT INTO monitoring_item (distro, network_connectivity) VALUES (?1, ?2)', [
    data.monitoring_item.distro,
    data.monitoring_item.network_connectivity,
  ]);
  await db.close();
  return result;
};

export default CREATE_MONITORING_ITEM;
