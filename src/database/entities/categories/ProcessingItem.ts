const CREATE_PROCESSING_ITEM_TABLE = `
  CREATE TABLE processing_item (
    id integer not null primary key autoincrement,
    total_inputs integer not null,
    total_outputs integer not null,
    physical_inputs integer not null,
    physical_outputs integer not null,
    midi integer not null,
    protocol_inputs integer null,
    signal_protocol integer not null,
    max_sample_rate text not null,
    network_connectivity json null,
    physical_connectivity json null,
    power json null
  );
`;

export default CREATE_PROCESSING_ITEM_TABLE;
