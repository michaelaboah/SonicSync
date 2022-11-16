import type { Item } from "../../generated/graphql";

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

/**
 * @description Only use in Execute functions
 * @param  {string} created_at
 * @param  {string} updated_at ?2
 * @param  {string} model ?3
 * @param  {?number} console_id ?4
 * @param  {?number} processor_id ?5
 * @param  {?string} searchable_model ?6
 * @param  {?string} public_notes ?7
 * @param  {?number} cost ?8
 * @param  {?number} weight ?9
 * @param  {?string} dimensions ?10
 * @param  {number} category ?11
 */
export const ADD_ITEM = `
INSERT INTO item 
(created_at,	updated_at,	model,	console_id,	processor_id,	searchable_model,	public_notes,	cost,	weight,	dimensions,	category)
VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
`;

export const storeItem = (values: Item): Item[] => {
  return [values];
};
