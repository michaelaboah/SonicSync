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
    amplifier_item_id integer NULL,
    console_item_id integer NULL,
    computer_item_id integer NULL,
    processor_item_id integer NULL,
    network_item_id integer NULL,
    microphone_item_id integer NULL,
    radio_item_id integer NULL,
    speaker_item_id integer NULL,
    monitoring_item_id integer NULL,
    searchable_model text NULL,
    notes JSON NULL,
    CONSTRAINT item_amplifier_id_foreign FOREIGN key(amplifier_item_id) REFERENCES amplifier_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_console_id_foreign FOREIGN key(console_item_id) REFERENCES console_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_computer_id_foreign FOREIGN key(computer_item_id) REFERENCES computer_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_processor_id_foreign FOREIGN key(processor_item_id) REFERENCES processor_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_network_item_id_foreign FOREIGN key(network_item_id) REFERENCES network_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_microphone_id_foreign FOREIGN key(microphone_item_id) REFERENCES microphone_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_radio_item_id_foreign FOREIGN key(radio_item_id) REFERENCES rfitem(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_speaker_item_id_foreign FOREIGN key(speaker_item_id) REFERENCES speaker_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_monitoring_item_id_foreign FOREIGN key(monitoring_item_id) REFERENCES monitoring_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE
);
`;
import { resolveResource } from '@tauri-apps/api/path';
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

export interface ItemTable {
    id: number;
    created_at: string;
    updated_at: string;
    public_notes: string | null;
    cost: number | null;
    weight: number | null;
    dimensions: any | null;
    model: string;
    category: Categories;
    amplifier_item_id: number | null;
    console_item_id: number | null;
    computer_item_id: number | null;
    processor_item_id: number | null;
    network_item_id: number | null;
    microphone_item_id: number | null;
    radio_item_id: number | null;
    speaker_item_id: number | null;
    monitoring_item_id: number | null;
    searchable_model: string | null;
    notes: any | null;
}

/**
 * Inserts an item into the database.
 * @param {SQLite} db - The database to insert the item into.
 * @param {Item} parsed - The item to insert.
 * @returns {Promise<boolean|string>} - Returns true if the item was successfully inserted,
 * otherwise returns an error message.
 */
export const insert_item = async (reference: Item): Promise<boolean | string[]> => {
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    const errors: string[] = [];
    const exists = await item_exists(reference.model);
    if (typeof exists && exists) {
        errors.push(`Item '${reference.model}' already exists.`);
        return errors;
    }

    let insert: Item = structuredClone(reference);

    switch (insert.category) {
        case Categories.Amplifier:
            // code to handle amplifier_id foreign key
            if (insert.amplifier) {
                let amplifier_primary_key = await insert_amplifier_item(insert.amplifier);
                typeof amplifier_primary_key === 'number'
                    ? (insert.amplifier.id = amplifier_primary_key)
                    : errors.push(`Error found: ${amplifier_primary_key}`);
            }
            break;
        case Categories.Console:
            // code to handle console_id foreign key
            if (insert.console) {
                let console_primary_key = await insert_console_item(insert.console);
                typeof console_primary_key === 'number'
                    ? (insert.console.id = console_primary_key)
                    : errors.push(`Error found: ${console_primary_key}`);
            }
            break;
        case Categories.Computer:
            if (insert.computer) {
                let computer_primary_key = await insert_computer_item(insert.computer);
                typeof computer_primary_key === 'number'
                    ? (insert.computer.id = computer_primary_key)
                    : errors.push(`Error found: ${computer_primary_key}`);
            }
            break;
        case Categories.Processor:
            // code to handle processor_id foreign key
            if (insert.processor) {
                let processor_primary_key = await insert_processor_item(insert.processor);
                typeof processor_primary_key === 'number'
                    ? (insert.processor.id = processor_primary_key)
                    : errors.push(`Error found: ${processor_primary_key}`);
            }
            break;
        case Categories.Network:
            // code to handle network_item_id foreign key
            if (insert.network_item) {
                let network_primary_key = await insert_network_item(insert.network_item);
                typeof network_primary_key === 'number'
                    ? (insert.network_item.id = network_primary_key)
                    : errors.push(`Error found: ${network_primary_key}`);
            }
            break;
        case Categories.Microphones:
            // code to handle microphone_id foreign key
            if (insert.microphone) {
                let microphone_primary_key = await insert_microphone_item(insert.microphone);
                typeof microphone_primary_key === 'number'
                    ? insert.microphone.id
                    : errors.push(`Error found: ${microphone_primary_key}`);
            }
            break;
        case Categories.Monitoring:
            // code to handle monitoring_item_id foreign key
            if (insert.monitoring_item) {
                let monitoring_primary_key = await insert_monitoring_item(insert.monitoring_item);
                typeof monitoring_primary_key === 'number'
                    ? insert.monitoring_item.id
                    : errors.push(`Error found: ${monitoring_primary_key}`);
            }
            break;
        case Categories.Radio:
            // code to handle radio_item_id foreign key
            if (insert.radio_item) {
                let radio_primary_key = await insert_rfitem(insert.radio_item);
                typeof radio_primary_key === 'number'
                    ? insert.radio_item.id
                    : errors.push(`Error found: ${radio_primary_key}`);
            }
            break;
        case Categories.Speaker:
            // code to handle speaker_item_id foreign key
            if (insert.speaker_item) {
                let speaker_primary_key = await insert_speaker_item(insert.speaker_item);
                typeof speaker_primary_key === 'number'
                    ? insert.speaker_item.id
                    : errors.push(`Error found: ${speaker_primary_key}`);
            }
            break;
        default:
            // code to handle invalid foreign key
            {
                errors.push('No subcategory found, either a generic item or error.');
            }
            break;
    }

    const item_sucess = await insert_generic(db, insert);
    errors.push(item_sucess as string);
    return errors;
};

/**
 * Inserts the provided item into the item table in the database.
 *
 * @param {SQLite} db - The SQLite database instance to use for the insertion.
 * @param {Item} parsed - The item object to insert into the item table.
 * @returns {Promise<boolean | string>} - Returns a boolean indicating whether the insertion was successful, or a string containing an error message.
 */
async function insert_generic(db: SQLite, parsed: Item): Promise<boolean | string> {
    if (parsed.id) {
        delete parsed.id;
    }
    const ITEM_INSERT_QUERY = `INSERT INTO item (created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_item_id, console_item_id, computer_item_id, processor_item_id, network_item_id, microphone_item_id, radio_item_id, speaker_item_id, monitoring_item_id, notes)
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

export const item_exists = async (model_name: string): Promise<boolean | string> => {
    const db = await SQLite.open('src-tauri/resources/sqlite-internal.db');
    const CHECK_QUERY = `SELECT EXISTS (
    SELECT 1
    FROM item
    WHERE model = '${model_name}'
  ) AS stored;`;
    if (!model_name || model_name === '') {
        return 'Empty model name.';
    } else {
        const results = await db.select<{ stored: number }[]>(CHECK_QUERY);
        console.log(results);
        if (results[0].stored === 1) return true;
        else return false;
    }
};

export default CREATE_ITEM_TABLE;
