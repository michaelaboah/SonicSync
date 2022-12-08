const CREATESPEAKER_ITEM = `CREATE TABLE speaker_item (
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

export default CREATESPEAKER_ITEM;
