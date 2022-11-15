export const CREATE_PROCESSOR_TABLE = `
CREATE TABLE processing_item ( id INTEGER PRIMARY KEY NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,  
    total_inputs INTEGER NOT NULL,  
    total_outputs INTEGER NOT NULL,  
    midi INTEGER,  
    physical_inputs INTEGER NOT NULL,  
    physical_outputs INTEGER NOT NULL,  
    protocol_inputs INTEGER,  
    signal_protocol INTEGER NOT NULL,  
    max_sample_rate INTEGER NOT NULL,  
    network_connectivity TEXT,  
    public_notes TEXT,  
    cost REAL,  
    weight REAL,  
    dimensions TEXT,  
    power TEXT  
    );
`;
