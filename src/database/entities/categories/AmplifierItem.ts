import SQLite from 'tauri-plugin-sqlite';
import { resolveResource } from '@tauri-apps/api/path';
import type { AmplifierItem } from '../../../generated/graphql';

const CREATE_AMPLIFIER_ITEM = `
CREATE TABLE amplifier_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  total_inputs integer NOT NULL,
  total_outputs integer NOT NULL,
  midi integer NOT NULL,
  physical_connectivity JSON NULL,
  network_connectivity JSON NULL,
  signal_protocol integer NOT NULL,
  max_sample_rate text CHECK (
      max_sample_rate in (
          'SD',
          'HD',
          'UHD'
      )
  ) NOT NULL,
  power JSON NULL
);`;
export default CREATE_AMPLIFIER_ITEM;

export const insert_amplifier_item = async (amplifier: AmplifierItem): Promise<number | string> => {
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    try {
        const result = await db.select<{ id: number }[]>(
            `INSERT INTO amplifier_item ( 
        total_inputs, 
        total_outputs, 
        midi, 
        physical_connectivity, 
        network_connectivity, 
        signal_protocol, 
        max_sample_rate, 
        power 
      ) VALUES ( 
        ?1, 
        ?2, 
        ?3, 
        ?4, 
        ?5, 
        ?6, 
        ?7, 
        ?8 
      ) RETURNING id;`,
            [
                amplifier.total_inputs,
                amplifier.total_outputs,
                amplifier.midi,
                JSON.stringify(amplifier.physical_connectivity),
                JSON.stringify(amplifier.network_connectivity),
                amplifier.signal_protocol,
                amplifier.max_sample_rate,
                JSON.stringify(amplifier.power),
            ]
        );
        return result[0].id;
    } catch (error: any) {
        console.error(`Error inserting amplifier item: ${error}`);
        return JSON.stringify(error);
    }
};
