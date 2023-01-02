import CREATE_AMPLIFIER_ITEM from './categories/AmplifierItem';
import CREATE_COMPUTER_ITEM_TABLE from './categories/ComputerItem';
import CREATE_CONSOLE_ITEM_TABLE from './categories/ConsoleItem';
import CREATE_MICROPHONE_ITEM_TABLE from './categories/MicrophoneItem';
import CREATE_MONITORING_ITEM from './categories/MonitoringItem';
import CREATE_NETWORK_ITEM from './categories/NetworkItem';
import CREATE_PROCESSING_ITEM_TABLE from './categories/ProcessingItem';
import CREATE_RADIO_ITEM from './categories/RadioItem';
import CREATE_SPEAKER_ITEM from './categories/SpeakerItem';
import CREATE_ITEM_TABLE, { type ItemTable } from './Item';
import CREATE_RFBAND from './RFBand';
import type { Item } from '../../generated/graphql';
import SQLite from 'tauri-plugin-sqlite';
export const ITEM_RELATIONSHIPS = [
    `CREATE INDEX rfband_rf_item_id_index ON rfband (rf_item_id);`,
    `CREATE UNIQUE INDEX rfband_band_name_unique ON rfband (band_name);`,
    `CREATE UNIQUE INDEX item_model_unique ON item (model);`,
    `CREATE UNIQUE INDEX item_amplifier_id_unique ON item (amplifier_id);`,
    `CREATE UNIQUE INDEX item_console_id_unique ON item (console_id);`,
    `CREATE UNIQUE INDEX item_computer_id_unique ON item (computer_id);`,
    `CREATE UNIQUE INDEX item_processor_id_unique ON item (processor_id);`,
    `CREATE UNIQUE INDEX item_network_item_id_unique ON item (network_item_id);`,
    `CREATE UNIQUE INDEX item_microphone_id_unique ON item (microphone_id);`,
    `CREATE UNIQUE INDEX item_radio_item_id_unique ON item (radio_item_id);`,
    `CREATE UNIQUE INDEX item_speaker_item_id_unique ON item (speaker_item_id);`,
    `CREATE UNIQUE INDEX item_monitoring_item_id_unique ON item (monitoring_item_id);`,
];

export const TABLES = [
    CREATE_ITEM_TABLE,
    CREATE_CONSOLE_ITEM_TABLE,
    CREATE_PROCESSING_ITEM_TABLE,
    CREATE_MONITORING_ITEM,
    CREATE_MICROPHONE_ITEM_TABLE,
    CREATE_AMPLIFIER_ITEM,
    CREATE_COMPUTER_ITEM_TABLE,
    CREATE_NETWORK_ITEM,
    CREATE_RFBAND,
    CREATE_SPEAKER_ITEM,
    CREATE_RADIO_ITEM,
];

const db = await SQLite.open('sqlite-internal.db');

export async function queryItems(model: string): Promise<Item[]> {
    const foundItems = await db.select<ItemTable[]>(`Select * FROM item WHERE item.model LIKE '%${model}%';`);
    const databaseItems = await Promise.all(foundItems.map(mapFoundItems));
    return databaseItems;
}

const mapFoundItems = async (item: ItemTable): Promise<Item> => {
    const {
        id,
        category,
        dimensions,
        cost,
        created_at,
        model,
        notes,
        public_notes,
        updated_at,
        weight,
        searchable_model,
        ...foreignItemKeys
    } = item;
    //(typeof foreignId[1] === 'number' ? console.log(foreignId) : null)

    let foreignEntries = Object.entries(foreignItemKeys);
    let foundForeignItem: any[] = [];
    for (const [key, value] of foreignEntries) {
        if (typeof value === 'number') {
            const fkQuery = `SELECT * FROM ${key.split('_')[0]}_item fk WHERE fk.id = '${value}'`;
            foundForeignItem = await db.select<any[]>(fkQuery);
            for (let [fKey, fValue] of Object.entries(foundForeignItem[0])) {
                if (typeof fValue === 'string' && fValue.includes('{')) {
                    foundForeignItem[0] = { ...foundForeignItem[0], [fKey]: JSON.parse(fValue) };
                }
                // else if (typeof fValue === 'string' && !fValue.includes('{')) {

                //     console.log('Enum');
                // }
            }
        }
    }
    return {
        id,
        category,
        dimensions: JSON.parse(dimensions),
        cost,
        created_at,
        updated_at,
        model,
        notes: JSON.parse(notes),
        public_notes,
        weight,
        [category.toLowerCase()]: foundForeignItem[0],
    } as Item;
    // foundItem[category.toLowerCase()] = foundForeignItem[0];
    // databaseItems.push(foundItem);}
};

queryItems('Galaxy').then((x) => console.log(x));
export const ROUTINE_PRAGMA_QUERIES = [`PRAGMA foreign_keys = ON;`, `PRAGMA integrity_check`];
