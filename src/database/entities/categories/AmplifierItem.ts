import SQLite from 'tauri-plugin-sqlite';
import type { AmplifierItem } from '../../../generated/graphql';

export const CREATE_AMPLIFIER_ITEM = `CREATE TABLE amplifier_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  total_inputs integer NOT NULL,
  total_outputs integer NOT NULL,
  midi integer NOT NULL,
  physical_connectivity JSON NULL,
  network_connectivity JSON NULL,
  signal_protocol integer NOT NULL,
  max_sample_rate text CHECK (
      max_sample_rate in (
          '44.1 kHz',
          '48 kHz',
          '96 kHz'
      )
  ) NOT NULL,
  power JSON NULL
);`;
// export default CREATE_AMPLIFIER_ITEM;

export const insertAmplifier = async (amplifier: AmplifierItem) => {
  const db = await SQLite.open('sqlite:internal.db');
  const result = await db.select(
    `INSERT INTO amplifier_item (
    id,
    total_inputs,
    total_outputs,
    midi,
    physical_connectivity,
    network_connectivity,
    signal_protocol,
    max_sample_rate,
    power
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?
  );`,
    Object.values(amplifier)
  );
  // await db.close();
  console.log(result);
  return result;
};
