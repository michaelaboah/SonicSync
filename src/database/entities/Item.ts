// import Database from 'tauri-plugin-sqlite';
import SQLite from 'tauri-plugin-sqlite';
import { Categories, type Item } from '../../generated/graphql';
import { insert_amplifier_item } from './categories/AmplifierItem';
import { insert_computer_item } from './categories/ComputerItem';
import { insert_console_item } from './categories/ConsoleItem';
import { insert_microphone_item } from './categories/MicrophoneItem';
import { insert_monitoring_item } from './categories/MonitoringItem';
import { insert_network_item } from './categories/NetworkItem';
import { insert_processor_item } from './categories/ProcessingItem';
import { insert_rfitem } from './categories/RadioItem';
import { insert_speaker_item } from './categories/SpeakerItem';
const CREATE_ITEM_TABLE = `
CREATE TABLE item (
    id integer NOT NULL PRIMARY KEY autoincrement,
    created_at datetime NOT NULL DEFAULT 'NOW()',
    updated_at datetime NOT NULL,
    public_notes text NULL,
    cost DOUBLE NULL,
    weight DOUBLE NULL,
    dimensions JSON NULL,
    model text NOT NULL,
    category integer NOT NULL,
    amplifier_id integer NULL,
    console_id integer NULL,
    computer_id integer NULL,
    processor_id integer NULL,
    network_item_id integer NULL,
    microphone_id integer NULL,
    radio_item_id integer NULL,
    speaker_item_id integer NULL,
    monitoring_item_id integer NULL,
    searchable_model text NULL,
    notes text NULL,
    CONSTRAINT item_amplifier_id_foreign FOREIGN key(amplifier_id) REFERENCES amplifier_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_console_id_foreign FOREIGN key(console_id) REFERENCES console_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_computer_id_foreign FOREIGN key(computer_id) REFERENCES computer_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_processor_id_foreign FOREIGN key(processor_id) REFERENCES processing_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_network_item_id_foreign FOREIGN key(network_item_id) REFERENCES network_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_microphone_id_foreign FOREIGN key(microphone_id) REFERENCES microphone_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_radio_item_id_foreign FOREIGN key(radio_item_id) REFERENCES rfitem(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_speaker_item_id_foreign FOREIGN key(speaker_item_id) REFERENCES speaker_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT item_monitoring_item_id_foreign FOREIGN key(monitoring_item_id) REFERENCES monitoring_item(id) ON DELETE
    SET NULL ON UPDATE CASCADE
);
`;

export const INSERT_ITEM = async (jsonData: any) => {
  const db = await SQLite.open('sqlite-internal.db');
  let parsed: Item = JSON.parse(jsonData);
  // Use the tauri.sql.execute method to insert the JSON data into the database

  switch (parsed.category) {
    case Categories.Amplifier:
      // code to handle amplifier_id foreign key
      if (parsed.amplifier) {
        let amplifier_primary_key = await insert_amplifier_item(parsed.amplifier);
        typeof amplifier_primary_key === 'number'
          ? (parsed.amplifier.id = amplifier_primary_key)
          : console.log(`Error found: ${amplifier_primary_key}`);
      }
      break;
    case Categories.Console:
      // code to handle console_id foreign key
      if (parsed.console) {
        let console_primary_key = await insert_console_item(parsed.console);
        typeof console_primary_key === 'number'
          ? (parsed.console.id = console_primary_key)
          : console.log(`Error found: ${console_primary_key}`);
      }
      break;
    case Categories.Computer:
      if (parsed.computer) {
        let computer_primary_key = await insert_computer_item(parsed.computer);
        typeof computer_primary_key === 'number'
          ? (parsed.computer.id = computer_primary_key)
          : console.log(`Error found: ${computer_primary_key}`);
      }
      break;
    case Categories.Processor:
      // code to handle processor_id foreign key
      if (parsed.processor) {
        let processor_primary_key = await insert_processor_item(parsed.processor);
        typeof processor_primary_key === 'number'
          ? (parsed.processor.id = processor_primary_key)
          : console.log(`Error found: ${processor_primary_key}`);
      }
      break;
    case Categories.Network:
      // code to handle network_item_id foreign key
      if (parsed.network_item) {
        let network_primary_key = await insert_network_item(parsed.network_item);
        typeof network_primary_key === 'number'
          ? (parsed.network_item.id = network_primary_key)
          : console.log(`Error found: ${network_primary_key}`);
      }
      break;
    case Categories.Microphones:
      // code to handle microphone_id foreign key
      if (parsed.microphone) {
        let microphone_primary_key = await insert_microphone_item(parsed.microphone);
        typeof microphone_primary_key === 'number'
          ? parsed.microphone.id
          : console.log(`Error found: ${microphone_primary_key}`);
      }
      break;
    case Categories.Monitoring:
      // code to handle monitoring_item_id foreign key
      if (parsed.monitoring_item) {
        let monitoring_primary_key = insert_monitoring_item(parsed.monitoring_item);
        typeof monitoring_primary_key === 'number'
          ? parsed.monitoring_item.id
          : console.log(`Error found: ${monitoring_primary_key}`);
      }
      break;
    case Categories.Radio:
      // code to handle radio_item_id foreign key
      if (parsed.radio_item) {
        let radio_primary_key = insert_rfitem(parsed.radio_item);
        typeof radio_primary_key === 'number' ? parsed.radio_item.id : console.log(`Error found: ${radio_primary_key}`);
      }
      break;
    case Categories.Speaker:
      // code to handle speaker_item_id foreign key
      if (parsed.speaker_item) {
        let speaker_primary_key = insert_speaker_item(parsed.speaker_item);
        typeof speaker_primary_key === 'number'
          ? parsed.speaker_item.id
          : console.log(`Error found: ${speaker_primary_key}`);
      }
      break;
    default:
      {
        console.log('No subcategory found, either a generic item or error.');
      }
      // code to handle invalid foreign key
      break;
  }
  console.log(parsed);
  await insert_item(db, parsed);
};

const data = `
{
	"item": {
		"id": 1,
		"createdAt": "1670377351000",
		"updatedAt": "1670377351000",
		"cost": 2000,
		"model": "D800-Dante A-Net Distro",
		"weight": 12,
		"publicNotes": "",
		"category": "MONITORING",
		"notes": null,
		"dimensions": {
			"width": 19,
			"length": 14.25,
			"height": 3.5,
			"rack_unit": 2
		},
		"amplifier": null,
		"console": null,
		"computer": null,
		"processor": null,
		"network_item": null,
		"microphone": null,
		"radio_item": null,
		"speaker_item": null,
		"monitoring_item": {
			"id": 1,
			"distro": true,
			"network_connectivity": [{
					"protocol": "IP",
					"power_over_ethernet": false,
					"port_identifier": "Network",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": false,
					"port_identifier": "A-Net In",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": false,
					"port_identifier": "A-Net Out",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": false,
					"port_identifier": "A-Net Mixes",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "DANTE",
					"power_over_ethernet": false,
					"port_identifier": "Dante Primary",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "DANTE",
					"power_over_ethernet": false,
					"port_identifier": "Dante Secondary",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 1",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 2",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 3",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 3",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 4",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 5",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 6",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 7",
					"max_connection_speed": "GIGABIT"
				},
				{
					"protocol": "A_NET",
					"power_over_ethernet": true,
					"port_identifier": "A-Net 8",
					"max_connection_speed": "GIGABIT"
				}
			],
			"physical_connectivity": null,
			"power": {
				"wattage": 300,
				"redundant": false,
				"lower_voltage": 100,
				"max_wattage": 300,
				"input_connector": "IEC",
				"output_connector": null
			}
		}
	}
}
`;

INSERT_ITEM(data);

async function insert_item(db: SQLite, parsed: Item) {
  if (parsed.id) {
    delete parsed.id;
  }
  await db.select(`
    INSERT INTO item (created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_id, console_id, computer_id, processor_id, network_item_id, microphone_id, radio_item_id, speaker_item_id, monitoring_item_id, searchable_model, notes)
    VALUES (
      '${parsed.createdAt}',
      '${parsed.updatedAt}',
      '${parsed.publicNotes}',
      ${parsed.cost},
      ${parsed.weight},
      '${JSON.stringify(parsed.dimensions)}',
      '${parsed.model}',
      '${parsed.category}',
      ${parsed.amplifier?.id},
      ${parsed.console?.id},
      ${parsed.computer?.id},
      ${parsed.processor?.id},
      ${parsed.network_item?.id},
      ${parsed.microphone?.id},
      ${parsed.radio_item?.id},
      ${parsed.speaker_item?.id},
      ${parsed.monitoring_item?.id},
      '${'parsed.searchable_model'}',
      '${parsed.notes}'
    )
  `);
}
export default CREATE_ITEM_TABLE;
