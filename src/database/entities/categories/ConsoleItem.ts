const CREATE_CONSOLE_ITEM_TABLE = `
CREATE TABLE console_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  total_inputs integer NOT NULL,
  total_outputs integer NOT NULL,
  total_busses integer NOT NULL,
  physical_inputs integer NOT NULL,
  physical_outputs integer NOT NULL,
  aux_inputs integer NOT NULL,
  physical_aux_inputs integer NOT NULL,
  phantom_power_inputs integer NOT NULL,
  faders integer NOT NULL,
  motorized integer NOT NULL,
  midi integer NOT NULL,
  protocol_inputs integer NULL,
  signal_protocol integer NOT NULL,
  can_expand integer NULL DEFAULT NULL,
  max_sample_rate text CHECK (
      max_sample_rate in (
          '44.1 kHz',
          '48 kHz',
          '96 kHz'
      )
  ) NOT NULL,
  power JSON NULL
);`;
export default CREATE_CONSOLE_ITEM_TABLE;
