import type { ConsoleItem } from 'src/generated/graphql';
import Database from 'tauri-plugin-sqlite';

export const CREATE_CONSOLE_TABLE = `
CREATE TABLE console_item ( id INTEGER PRIMARY KEY NOT NULL,  
    total_inputs INTEGER NOT NULL,  
    total_outputs INTEGER NOT NULL,  
    total_busses INTEGER NOT NULL,  
    aux_inputs INTEGER NOT NULL,  
    physical_aux_inputs INTEGER NOT NULL,  
    phantom_power_inputs INTEGER NOT NULL,  
    physical_inputs INTEGER NOT NULL,  
    physical_outputs INTEGER NOT NULL,  
    faders INTEGER NOT NULL,  
    motorized INTEGER, 
    midi INTEGER,  
    protocol_inputs INTEGER,  
    signal_protocol INTEGER NOT NULL,  
    can_expand INTEGER,  
    max_sample_rate INTEGER NOT NULL,  
    notes TEXT,  
    power TEXT  
    );
`;

export const ADD_CONSOLE_ITEM = `
INSERT INTO console_item 
  (
  id,
  total_inputs,
  total_outputs,
  total_busses,
  aux_inputs,
  physical_aux_inputs,
  phantom_power_inputs,
  physical_inputs,
  physical_outputs,
  faders,
  motorized,
  midi
  protocol_inputs,
  signal_protocol,
  can_expand,
  max_sample_rate,
  notes,
  power,
  ) 
VALUES 
  ( ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18 );
`;

interface ConsoleSQL {
  id: number;
  totalInputs: number;
  totalOutputs: number;
  totalBusses: number;
  physicalInputs: number;
  physicalOutputs: number;
  auxInputs: number;
  physicalAuxInputs: number;
  phantomPowerInputs: number;
  faders: number;
  motorized: string | null;
  midi: string | null;
  protocolInputs: number | null;
  signalProtocol: string;
  can_expand: string | null;
  max_sample_rate: string;
  notes: string | null;
  power: string | null;
}

const Sqlite = Database.open('sqlite:internal.db');

export const storeConsole = async (consoleValue: ConsoleItem) => {
  delete consoleValue.__typename;
  let store: ConsoleSQL = {
    ...consoleValue,
    motorized: JSON.stringify(consoleValue.motorized),
    midi: JSON.stringify(consoleValue.midi),
    protocolInputs: consoleValue.protocolInputs,
    signalProtocol: JSON.stringify(consoleValue.signalProtocol),
    can_expand: JSON.stringify(consoleValue.can_expand),
    max_sample_rate: JSON.stringify(consoleValue.max_sample_rate),
    notes: JSON.stringify(consoleValue.notes),
    power: JSON.stringify(consoleValue.power),
  };

  const db = await Sqlite;
  await db.select(ADD_CONSOLE_ITEM, Object.values(store)).catch((err) => {
    if (err.includes('code 19')) {
      console.log('Normal Behavior');
    } else {
      console.log('Irregular Behavior: ' + err);
    }
  });
};
