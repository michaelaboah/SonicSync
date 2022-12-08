export const CREATE_RADIO_ITEM = `CREATE TABLE rfitem (
    id integer NOT NULL PRIMARY KEY autoincrement,
    physical_range integer NOT NULL,
    lower_frequency_response integer NOT NULL,
    upper_frequency_response integer NOT NULL,
    transmitter JSON NULL,
    reciever JSON NULL
);`;

// export default CREATE_RADIO_ITEM;
