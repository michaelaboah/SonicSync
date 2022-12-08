const CREATE_NETWORK_ITEM = `CREATE TABLE network_item (
    id integer NOT NULL PRIMARY KEY autoincrement,
    network_type integer NOT NULL,
    poe_ports integer NOT NULL,
    max_speed integer NOT NULL,
    fiber integer NULL,
    network_connectivity JSON NULL,
    power JSON NULL
);`;

export default CREATE_NETWORK_ITEM;
