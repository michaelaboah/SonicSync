import { Categories, type Item } from '../../generated/graphql';
import Database from 'tauri-plugin-sqlite';
import { storeProcessor } from './ProcessingItem';

export const CreateItemTable = `CREATE TABLE item 
( id INTEGER PRIMARY KEY NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, model TEXT NOT NULL, 
public_notes TEXT, cost REAL, weight REAL, dimensions TEXT, category TEXT NOT NULL,

console_id INTEGER, processor_id INTEGER,

FOREIGN KEY (processor_id) REFERENCES processing_item (id),
FOREIGN KEY (console_id) REFERENCES console_item (id)
  );`;

/**
 * @description Only use in Execute functions
 * @param  {ItemTable}  fields {id, createdAt,	updatedAt,	model,	console_id ,	processor_id ,	public_notes , cost ,	weight ,	dimensions ,	category}
 */
export const ADD_ITEM = `
INSERT INTO item
  (id, createdAt,	updatedAt,	model,	console_id ,	processor_id ,	public_notes , cost ,	weight ,	dimensions ,	category )
VALUES 
  (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11);
`;

interface ItemTable {
  id: number;
  createdAt: string;
  updatedAt: string;
  model: string;
  console_id: number | null;
  processor_id: number | null;
  // searchable_model: string;
  publicNotes: string | null;
  cost: number | null;
  weight: number | null;
  dimensions: string | null;
  category: string;
}
const Sqlite = Database.open('sqlite:internal.db');

/**
 * @param  {ItemTable} values
 * @error Code 19: Item already exists
 */
export const storeItem = async (values: Item): Promise<void> => {
  const db = await Sqlite;

  switch (values.category) {
    case Categories.Processor:
      if (values.processor) {
        // storeProcessor({ ...values.processor });
        let store: ItemTable = {
          id: values.id,
          createdAt: values.createdAt,
          updatedAt: values.updatedAt,
          model: values.model,
          console_id: null,
          processor_id: values.processor.id,
          publicNotes: (values.publicNotes ??= null),
          cost: (values.cost ??= null),
          weight: (values.weight ??= null),
          dimensions: values.dimensions ? JSON.stringify(values.dimensions) : null,
          category: values.category,
        };
        await db.select(ADD_ITEM, Object.values(store));
      }
      break;

    case Categories.Console:
      if (values.console) {
        let store: ItemTable = {
          id: values.id,
          createdAt: values.createdAt,
          updatedAt: values.updatedAt,
          model: values.model,
          console_id: values.console.id,
          processor_id: null,
          publicNotes: (values.publicNotes ??= null),
          cost: (values.cost ??= null),
          weight: (values.weight ??= null),
          dimensions: values.dimensions ? JSON.stringify(values.dimensions) : null,
          category: values.category,
        };
        await db.select(ADD_ITEM, Object.values(store));
      }
      break;

    default:
      console.log('Something went wrong');
      break;
  }
};
