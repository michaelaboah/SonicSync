import type { Item } from '../../generated/graphql';
import Database from 'tauri-plugin-sqlite';

export const CreateItemTable = `CREATE TABLE item 
( id INTEGER PRIMARY KEY NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, model TEXT NOT NULL, 
public_notes TEXT, cost REAL, weight REAL, dimensions TEXT, category TEXT NOT NULL,

console_id INTEGER, processor_id INTEGER,


FOREIGN KEY (processor_id) REFERENCES processing_item (id),
FOREIGN KEY (console_id) REFERENCES console_item (id)
  );`;

`SELECT name FROM sqlite_master WHERE type="table" AND name="console_item";
"console_item", "processing_item"
`;

/**
 * @description Only use in Execute functions
 * @param  {number}  id
 * @param  {string}  created_at
 * @param  {string}  updated_at ?2
 * @param  {string}  model ?3
 * @param  {?number} console_id ?4
 * @param  {?number} processor_id ?5
 * @param  {?string} public_notes ?6
 * @param  {?number} cost ?7
 * @param  {?number} weight ?8
 * @param  {?string} dimensions ?9
 * @param  {string}  category ?10
 */
export const ADD_ITEM = `
INSERT INTO item 
(id, createdAt,	updatedAt,	model,	console_id,	processor_id,	public_notes,	cost,	weight,	dimensions,	category)
VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
`;

interface ItemTable {
  id: number;
  createdAt: string;
  updatedAt: string;
  model: string;
  console_id?: number | null;
  processor_id?: number | null;
  // searchable_model: string;
  publicNotes: string;
  cost?: number;
  weight?: number;
  dimensions?: string;
  category: string;
}
const Sqlite = Database.open('sqlite:internal.db');

/**
 * @param  {ItemTable} values
 * @error Code 19: Item already exists
 */
export const storeItem = async (values: ItemTable): Promise<void> => {
  const db = await Sqlite;
  console.log([2, ...Object.values(values)]);
  await db.select(
    `INSERT INTO item
        (id, createdAt,	updatedAt,	model,	console_id,	processor_id,	public_notes,	cost,	weight,	dimensions,	category)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`,
    Object.values(values)
  );
};

// {
//   const { id, createdAt, updatedAt, model, publicNotes, cost, weight, dimensions, category } = values;
//   const db = await Sqlite;
//   await db.select(
//     `INSERT INTO item
//   (id, createdAt,	updatedAt,	model,	console_id,	processor_id,	public_notes,	cost,	weight,	dimensions,	category)
//   VALUES (${id}, '${createdAt}', '${updatedAt}', '${model}', ${null}, ${null}, '${publicNotes}', ${cost}, ${weight}, '${dimensions}', '${category}');`
//   ).catch(err => {
//     if (err.includes("code 19")) {
//       console.log("Normal Behavior");
//     } else {
//       console.log("Irregular Behavior: " + err);
//     }
//   })
// }

// `INSERT INTO item
// (id, createdAt,	updatedAt,	model,	console_id,	processor_id,	public_notes,	cost,	weight,	dimensions,	category)
// VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
