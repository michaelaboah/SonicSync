import SQLite from 'tauri-plugin-sqlite';
import { Categories, type Item } from '../../generated/graphql';
import { insert_amplifier_item } from './categories/AmplifierItem';
import { insert_computer_item } from './categories/ComputerItem';
import { insert_console_item } from './categories/ConsoleItem';
import { insert_microphone_item } from './categories/MicrophoneItem';
import { insert_monitoring_item } from './categories/MonitoringItem';
import { insert_network_item } from './categories/NetworkItem';
import { insert_processor_item } from './categories/ProcessingItem';
import { insert_rfitem } from './categories/RadioItem';
import { insert_speaker_item } from './categories/SpeakerItem';
const CREATE_ITEM_TABLE = `
CREATE TABLE item (
    id integer NOT NULL PRIMARY KEY autoincrement,
    created_at datetime NOT NULL DEFAULT 'NOW()',
    updated_at datetime NOT NULL,
    public_notes text NULL,
    cost DOUBLE NULL,
    weight DOUBLE NULL,
    dimensions JSON NULL,
    model text UNIQUE NOT NULL,
    category integer NOT NULL,
    amplifier_id integer NULL,
    console_id integer NULL,
    computer_id integer NULL,
    processor_id integer NULL,
    network_item_id integer NULL,
    microphone_id integer NULL,
    radio_item_id integer NULL,
    speaker_item_id integer NULL,
    monitoring_item_id integer NULL,
    searchable_model text NULL,
    notes JSON NULL,
    CONSTRAINT item_amplifier_id_foreign FOREIGN key(amplifier_id) REFERENCES amplifier_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_console_id_foreign FOREIGN key(console_id) REFERENCES console_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_computer_id_foreign FOREIGN key(computer_id) REFERENCES computer_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_processor_id_foreign FOREIGN key(processor_id) REFERENCES processing_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_network_item_id_foreign FOREIGN key(network_item_id) REFERENCES network_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_microphone_id_foreign FOREIGN key(microphone_id) REFERENCES microphone_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_radio_item_id_foreign FOREIGN key(radio_item_id) REFERENCES rfitem(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_speaker_item_id_foreign FOREIGN key(speaker_item_id) REFERENCES speaker_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_monitoring_item_id_foreign FOREIGN key(monitoring_item_id) REFERENCES monitoring_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE
);
`;

export const insert_item = async (reference: Item) => {
  const db = await SQLite.open('sqlite-internal.db');
  let insert: Item = structuredClone(reference);
  const thing = await insert_item_fields(db, insert);
  console.log(thing);
  switch (insert.category) {
    case Categories.Amplifier:
      // code to handle amplifier_id foreign key
      if (insert.amplifier) {
        let amplifier_primary_key = await insert_amplifier_item(insert.amplifier);
        typeof amplifier_primary_key === 'number'
          ? (insert.amplifier.id = amplifier_primary_key)
          : console.log(`Error found: ${amplifier_primary_key}`);
      }
      break;
    case Categories.Console:
      // code to handle console_id foreign key
      if (insert.console) {
        let console_primary_key = await insert_console_item(insert.console);
        typeof console_primary_key === 'number'
          ? (insert.console.id = console_primary_key)
          : console.log(`Error found: ${console_primary_key}`);
      }
      break;
    case Categories.Computer:
      if (insert.computer) {
        let computer_primary_key = await insert_computer_item(insert.computer);
        typeof computer_primary_key === 'number'
          ? (insert.computer.id = computer_primary_key)
          : console.log(`Error found: ${computer_primary_key}`);
      }
      break;
    case Categories.Processor:
      // code to handle processor_id foreign key
      if (insert.processor) {
        let processor_primary_key = await insert_processor_item(insert.processor);
        typeof processor_primary_key === 'number'
          ? (insert.processor.id = processor_primary_key)
          : console.log(`Error found: ${processor_primary_key}`);
      }
      break;
    case Categories.Network:
      // code to handle network_item_id foreign key
      if (insert.network_item) {
        let network_primary_key = await insert_network_item(insert.network_item);
        typeof network_primary_key === 'number'
          ? (insert.network_item.id = network_primary_key)
          : console.log(`Error found: ${network_primary_key}`);
      }
      break;
    case Categories.Microphones:
      // code to handle microphone_id foreign key
      if (insert.microphone) {
        let microphone_primary_key = await insert_microphone_item(insert.microphone);
        typeof microphone_primary_key === 'number'
          ? insert.microphone.id
          : console.log(`Error found: ${microphone_primary_key}`);
      }
      break;
    case Categories.Monitoring:
      // code to handle monitoring_item_id foreign key
      if (insert.monitoring_item) {
        let monitoring_primary_key = await insert_monitoring_item(insert.monitoring_item);
        typeof monitoring_primary_key === 'number'
          ? insert.monitoring_item.id
          : console.log(`Error found: ${monitoring_primary_key}`);
      }
      break;
    case Categories.Radio:
      // code to handle radio_item_id foreign key
      if (insert.radio_item) {
        let radio_primary_key = await insert_rfitem(insert.radio_item);
        typeof radio_primary_key === 'number' ? insert.radio_item.id : console.log(`Error found: ${radio_primary_key}`);
      }
      break;
    case Categories.Speaker:
      // code to handle speaker_item_id foreign key
      if (insert.speaker_item) {
        let speaker_primary_key = await insert_speaker_item(insert.speaker_item);
        typeof speaker_primary_key === 'number'
          ? insert.speaker_item.id
          : console.log(`Error found: ${speaker_primary_key}`);
      }
      break;
    default:
      // code to handle invalid foreign key
      {
        console.log('No subcategory found, either a generic item or error.');
      }
      break;
  }
  // console.log(insert);
};

async function insert_item_fields(db: SQLite, parsed: Item): Promise<boolean | string> {
  if (parsed.id) {
    delete parsed.id;
  }
  const ITEM_INSERT_QUERY = `INSERT INTO item (created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_id, console_id, computer_id, processor_id, network_item_id, microphone_id, radio_item_id, speaker_item_id, monitoring_item_id, notes)
  VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)`;
  try {
    const item_insert_result = await db.execute(ITEM_INSERT_QUERY, [
      parsed.created_at,
      parsed.updated_at,
      parsed.public_notes,
      parsed.cost,
      parsed.weight,
      JSON.stringify(parsed.dimensions),
      parsed.model,
      parsed.category,
      parsed.amplifier?.id,
      parsed.console?.id,
      parsed.computer?.id,
      parsed.processor?.id,
      parsed.network_item?.id,
      parsed.microphone?.id,
      parsed.radio_item?.id,
      parsed.speaker_item?.id,
      parsed.monitoring_item?.id,
      JSON.stringify(parsed.notes),
    ]);
    return item_insert_result;
  } catch (error: any) {
    if (error === 'UNIQUE constraint failed: item.model (code 19)') {
      return `Item '${parsed.model}' already exists.`;
    }
    return error;
  }
}

export default CREATE_ITEM_TABLE;
