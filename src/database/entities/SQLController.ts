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

import SQLite from 'tauri-plugin-sqlite';
const db = await SQLite.open('sqlite-internal.db');

async function test(model: string) {
    const foundItems = await db.select<ItemTable[]>(`Select * FROM item WHERE item.model LIKE '%${model}%';`);
    console.log(foundItems);

    for (const item of foundItems) {
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
            ...rest
        } = item;
        //(typeof foreignId[1] === 'number' ? console.log(foreignId) : null)

        Object.entries(rest).forEach(async (foreignId) => {
            if (typeof foreignId[1] === 'number') {
                const fkQuery = `SELECT * FROM ${foreignId[0].split('_')[0]}_item fk WHERE fk.id = '${foreignId[1]}'`;
                const subItem = await db.select<any[]>(fkQuery);
            }
        });
    }
}

test('Galaxy');
export const ROUTINE_PRAGMA_QUERIES = [`PRAGMA foreign_keys = ON;`, `PRAGMA integrity_check`];
