export const CREATE_CONSOLE_TABLE = `
CREATE TABLE console_item ( id INTEGER PRIMARY KEY NOT NULL,  
    total_inputs INTEGER NOT NULL,  
    total_outputs INTEGER NOT NULL,  
    total_busses INTEGER NOT NULL,  
    aux_inputs INTEGER NOT NULL,  
    physical_aux_inputs INTEGER NOT NULL,  
    phantom_power_inputs INTEGER NOT NULL,  
    physical_inputs INTEGER NOT NULL,  
    physical_outputs INTEGER NOT NULL,  
    faders INTEGER NOT NULL,  
    motorized INTEGER, midi INTEGER,  
    protocol_inputs INTEGER,  
    signal_protocol INTEGER NOT NULL,  
    can_expand INTEGER,  
    max_sample_rate INTEGER NOT NULL,  
    notes TEXT,  
    power TEXT  
    );
`;
