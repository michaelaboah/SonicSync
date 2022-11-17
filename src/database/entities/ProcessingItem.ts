import type { ProcessingItem } from 'src/generated/graphql';
import Database from 'tauri-plugin-sqlite';

export const CREATE_PROCESSOR_TABLE = `
CREATE TABLE processing_item ( id INTEGER PRIMARY KEY NOT NULL,
    totalInputs INTEGER NOT NULL,  
    totalOutputs INTEGER NOT NULL,  
    midi TEXT,  
    physicalInputs INTEGER NOT NULL,  
    physicalOutputs INTEGER NOT NULL,  
    protocolInputs INTEGER,  
    signalProtocol TEXT NOT NULL,  
    max_sample_rate TEXT NOT NULL,  
    network_connectivity TEXT,  
    power TEXT  
    );
`;

export const ADD_PROCESSOR_ITEM = `
INSERT INTO processing_item 
  ( id, totalInputs, totalOutputs, midi, physicalInputs, physicalOutputs, protocolInputs, signalProtocol, max_sample_rate, network_connectivity, power) 
VALUES 
  ( ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11 );
`;

interface ProcessorSQL {
  id: number; //0
  totalInputs: number; //1
  totalOutputs: number; //2
  midi: string | null; //3
  physicalInputs: number; //4
  physicalOutputs: number; //5
  protocolInputs: number | null; //6
  signalProtocol: string; //7
  max_sample_rate: string; //8
  network_connectivity: string | null; //9
  power: string | null; //10
}

const Sqlite = Database.open('sqlite:internal.db');

export const storeProcessor = async (processorValue: ProcessingItem) => {
  delete processorValue.__typename;
  let store: ProcessorSQL = {
    ...processorValue,
    network_connectivity: JSON.stringify(processorValue.network_connectivity),
    power: JSON.stringify(processorValue.power),
  };

  const db = await Sqlite;
  await db.select(ADD_PROCESSOR_ITEM, Object.values(store)).catch((err) => {
    if (err.includes('code 19')) {
      console.log('Normal Behavior');
    } else {
      console.log('Irregular Behavior: ' + err);
    }
  });
};
