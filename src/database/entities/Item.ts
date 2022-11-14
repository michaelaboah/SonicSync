export const CreateItemTable = `CREATE TABLE item 
( id INTEGER PRIMARY KEY NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, model TEXT NOT NULL, searchable_model TEXT, 
public_notes TEXT, cost REAL, weight REAL, dimensions TEXT, category INTEGER NOT NULL,

console_id INTEGER, processor_id INTEGER,


FOREIGN KEY (processor_id) REFERENCES processing_item (id),
FOREIGN KEY (console_id) REFERENCES console_item (id)
  );`;

`SELECT name FROM sqlite_master WHERE type="table" AND name="console_item";
"console_item", "processing_item"
`;
