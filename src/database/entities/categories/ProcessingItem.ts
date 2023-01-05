import SQLite from 'tauri-plugin-sqlite';
import { resolveResource } from '@tauri-apps/api/path';
import type { ProcessingItem } from '../../../generated/graphql';

const CREATE_PROCESSING_ITEM_TABLE = `CREATE TABLE processor_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  total_inputs integer NOT NULL,
  total_outputs integer NOT NULL,
  physical_inputs integer NOT NULL,
  physical_outputs integer NOT NULL,
  midi integer NULL,
  protocol_inputs integer NULL,
  signal_protocol integer NOT NULL,
  max_sample_rate text CHECK (
      max_sample_rate in (
          'SD',
          'HD',
          'UHD'
      )
  ) NOT NULL,
  network_connectivity JSON NULL,
  physical_connectivity JSON NULL,
  power JSON NULL
);`;
export default CREATE_PROCESSING_ITEM_TABLE;

export const insert_processor_item = async (processing: ProcessingItem): Promise<number | string> => {
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    try {
        const result = await db.select<{ id: number }[]>(
            `INSERT INTO processor_item (
              total_inputs,
              total_outputs,
              physical_inputs,
              physical_outputs,
              midi,
              protocol_inputs,
              signal_protocol,
              max_sample_rate,
              network_connectivity,
              physical_connectivity,
              power
          ) VALUES (
              ?1,
              ?2,
              ?3,
              ?4,
              ?5,
              ?6,
              ?7,
              ?8,
              ?9,
              ?10,
              ?11
          ) RETURNING id;`,
            [
                processing.total_inputs,
                processing.total_outputs,
                processing.physical_inputs,
                processing.physical_outputs,
                processing.midi,
                processing.protocol_inputs,
                processing.signal_protocol,
                processing.max_sample_rate,
                JSON.stringify(processing.network_connectivity),
                JSON.stringify(processing.physical_connectivity),
                JSON.stringify(processing.power),
            ]
        );
        return result[0].id;
    } catch (error: any) {
        console.error(`Error inserting processing item: ${error.message}`);
        return JSON.stringify(error);
    }
};
