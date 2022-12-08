import SQLite from 'tauri-plugin-sqlite';
import type { RfItem } from '../../../generated/graphql';

const CREATE_RADIO_ITEM = `CREATE TABLE rfitem (
    id integer NOT NULL PRIMARY KEY autoincrement,
    physical_range integer NOT NULL,
    lower_frequency_response integer NOT NULL,
    upper_frequency_response integer NOT NULL,
    transmitter JSON NULL,
    reciever JSON NULL
);`;

export default CREATE_RADIO_ITEM;

export const insert_rfitem = async (rfitem: RfItem): Promise<number | string> => {
  const db = await SQLite.open('sqlite:internal.db');
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO rfitem (
                physical_range,
                lower_frequency_response,
                upper_frequency_response,
                transmitter,
                reciever
            ) VALUES (
                ?1,
                ?2,
                ?3,
                ?4,
                ?5
            ) RETURNING id;`,
      [
        rfitem.physical_range,
        rfitem.lower_frequency_response,
        rfitem.upper_frequency_response,
        JSON.stringify(rfitem.transmitter),
        JSON.stringify(rfitem.reciever),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting RF item: ${error.message}`);
    return JSON.stringify(error);
  }
};
