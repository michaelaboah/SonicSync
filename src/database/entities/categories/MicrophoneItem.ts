import SQLite from 'tauri-plugin-sqlite';
import type { MicrophoneItem } from '../../../generated/graphql';

const CREATE_MICROPHONE_ITEM_TABLE = `CREATE TABLE microphone_item (
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

export default CREATE_MICROPHONE_ITEM_TABLE;

export const insert_microphone_item = async (microphone: MicrophoneItem): Promise<number | string> => {
  const db = await SQLite.open('sqlite:internal.db');
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO microphone_item (
              max_spl,
              phantom,
              low_cut,
              pad,
              diaphragm_size,
              output_impedance,
              frequency_response,
              connector,
              microphone_type
          ) VALUES (
              ?1,
              ?2,
              ?3,
              ?4,
              ?5,
              ?6,
              ?7,
              ?8,
              ?9
          ) RETURNING id;`,
      [
        microphone.max_spl,
        microphone.phantom,
        microphone.low_cut,
        microphone.pad,
        microphone.diaphragm_size,
        microphone.output_impedance,
        microphone.frequency_response,
        microphone.connector,
        JSON.stringify(microphone.microphone_type),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting microphone item: ${error.message}`);
    return JSON.stringify(error);
  }
};
