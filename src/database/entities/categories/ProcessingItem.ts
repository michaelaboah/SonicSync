const CREATE_PROCESSING_ITEM_TABLE = `CREATE TABLE processing_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  total_inputs integer NOT NULL,
  total_outputs integer NOT NULL,
  physical_inputs integer NOT NULL,
  physical_outputs integer NOT NULL,
  midi integer NULL,
  protocol_inputs integer NULL,
  signal_protocol integer NOT NULL,
  max_sample_rate text CHECK (
      max_sample_rate in (
          '44.1 kHz',
          '48 kHz',
          '96 kHz'
      )
  ) NOT NULL,
  network_connectivity JSON NULL,
  physical_connectivity JSON NULL,
  power JSON NULL
);`;
export default CREATE_PROCESSING_ITEM_TABLE;
