import SQLite from 'tauri-plugin-sqlite';
import type { NetworkConnectivty } from '../../../generated/graphql';

const AMPLIFIER_ITEM = `
  create table amplifier_item (
    id integer not null primary key autoincrement,
    total_inputs integer not null,
    total_outputs integer not null,
    midi integer not null,
    physical_connectivity json null,
    network_connectivity json null,
    signal_protocol integer not null,
    max_sample_rate text check (max_sample_rate in ('44.1 kHz', '48 kHz', '96 kHz')) not null,
    power json null
  );
`;

export default AMPLIFIER_ITEM;

export const insertAmplifier = async (amplifier: AmplifierTable) => {
  const db = await SQLite.open('sqlite:internal.db');
  const result = await db.execute(
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
  return result;
};

interface AmplifierTable {
  id: number;
  totalInputs: number;
  totalOutputs: number;
  midi: string;
  physical_connectivity: PhysicalPort[];
  network_connectivity: NetworkConnectivty[];
  signal_protocol: any;
  max_sample_rate: any;
  power: any;
}
