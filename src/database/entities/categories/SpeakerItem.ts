import SQLite from 'tauri-plugin-sqlite';
import type { SpeakerItem } from '../../../generated/graphql';

const CREATE_SPEAKER_ITEM = `CREATE TABLE speaker_item (
    id integer NOT NULL PRIMARY KEY autoincrement,
    driver JSON NOT NULL,
    built_in_processing integer NOT NULL,
    wireless integer NOT NULL,
    max_spl integer NOT NULL,
    power JSON NOT NULL,
    lower_frequency_response integer NOT NULL,
    upper_frequency_response integer NOT NULL,
    mounting_options text NOT NULL,
    physical_connectivity JSON NULL,
    network_connectivity JSON NULL
);`;

export default CREATE_SPEAKER_ITEM;

export const insert_speaker_item = async (speaker: SpeakerItem): Promise<number | string> => {
  const db = await SQLite.open('sqlite-internal.db');
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO speaker_item (
                driver,
                built_in_processing,
                wireless,
                max_spl,
                power,
                lower_frequency_response,
                upper_frequency_response,
                mounting_options,
                physical_connectivity,
                network_connectivity
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
                ?10
            ) RETURNING id;`,
      [
        JSON.stringify(speaker.driver),
        speaker.built_in_processing,
        speaker.wireless,
        speaker.max_spl,
        JSON.stringify(speaker.power),
        speaker.lower_frequency_response,
        speaker.upper_frequency_response,
        speaker.mounting_options,
        JSON.stringify(speaker.physical_connectivity),
        JSON.stringify(speaker.network_connectivity),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting speaker item: ${error.message}`);
    return JSON.stringify(error);
  }
};
