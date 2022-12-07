const CREATE_CONSOLE_ITEM_TABLE = `
  CREATE TABLE console_item (
    id integer not null primary key autoincrement,
    total_inputs integer not null,
    total_outputs integer not null,
    total_busses integer not null,
    physical_inputs integer not null,
    physical_outputs integer not null,
    aux_inputs integer not null,
    physical_aux_inputs integer not null,
    phantom_power_inputs integer not null,
    faders integer not null,
    motorized integer not null,
    midi integer not null,
    protocol_inputs integer null,
    signal_protocol integer not null,
    can_expand integer null default null,
    max_sample_rate text check (max_sample_rate in ('44.1 kHz', '48 kHz', '96 kHz')) not null,
    power json null
  );
`;

export default CREATE_CONSOLE_ITEM_TABLE;
