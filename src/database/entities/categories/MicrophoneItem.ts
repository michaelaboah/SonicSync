import SQLite from 'tauri-plugin-sqlite';
import type { MicrophoneItem } from '../../../generated/graphql';

export const CREATE_MICROPHONE_ITEM_TABLE = `CREATE TABLE microphone_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  max_spl integer NOT NULL,
  phantom integer NULL,
  low_cut integer NULL,
  pad integer NULL,
  diaphragm_size integer NULL,
  output_impedance integer NULL,
  frequency_response text NULL,
  connector integer NOT NULL,
  microphone_type text NOT NULL
);`;

// export default CREATE_MICROPHONE_ITEM_TABLE;
export const insertMicrophone = async (microphone: MicrophoneItem) => {
  const db = await SQLite.open('sqlite:internal.db');
  const result = await db.execute(
    `INSERT INTO microphone_item ( id, max_spl, phantom, low_cut, pad, diaphragm_size, output_impedance, frequency_response, connector, microphone_type ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );`,
    Object.values(microphone)
  );
  // await db.close();
  return result;
};
