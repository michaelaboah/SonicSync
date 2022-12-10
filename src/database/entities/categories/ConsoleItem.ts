import SQLite from 'tauri-plugin-sqlite';
import type { ConsoleItem } from '../../../generated/graphql';

const CREATE_CONSOLE_ITEM_TABLE = `
CREATE TABLE console_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  total_inputs integer NOT NULL,
  total_outputs integer NOT NULL,
  total_busses integer NOT NULL,
  physical_inputs integer NOT NULL,
  physical_outputs integer NOT NULL,
  aux_inputs integer NOT NULL,
  physical_aux_inputs integer NOT NULL,
  phantom_power_inputs integer NOT NULL,
  faders integer NOT NULL,
  motorized integer NOT NULL,
  midi integer NOT NULL,
  protocol_inputs integer NULL,
  signal_protocol integer NOT NULL,
  can_expand integer NULL DEFAULT NULL,
  max_sample_rate text CHECK (
      max_sample_rate in (
          '44.1 kHz',
          '48 kHz',
          '96 kHz'
      )
  ) NOT NULL,
  power JSON NULL
);`;
export default CREATE_CONSOLE_ITEM_TABLE;

export const insert_console_item = async (console_item: ConsoleItem): Promise<number | string> => {
  const db = await SQLite.open('sqlite-internal.db');
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO console_item (
              total_inputs,
              total_outputs,
              total_busses,
              physical_inputs,
              physical_outputs,
              aux_inputs,
              physical_aux_inputs,
              phantom_power_inputs,
              faders,
              motorized,
              midi,
              protocol_inputs,
              signal_protocol,
              can_expand,
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
              ?8,
              ?9,
              ?10,
              ?11,
              ?12,
              ?13,
              ?14,
              ?15,
              ?16
          ) RETURNING id;`,
      [
        console_item.total_inputs,
        console_item.total_outputs,
        console_item.total_busses,
        console_item.physical_inputs,
        console_item.physical_outputs,
        console_item.aux_inputs,
        console_item.physical_aux_inputs,
        console_item.phantom_power_inputs,
        console_item.faders,
        console_item.motorized,
        console_item.midi,
        console_item.protocol_inputs,
        console_item.signal_protocol,
        console_item.can_expand,
        console_item.max_sample_rate,
        JSON.stringify(console_item.power),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting console item: ${error.message}`);
    return JSON.stringify(error);
  }
};
