// import Database from 'tauri-plugin-sqlite';
import SQLite from 'tauri-plugin-sqlite';
import { Categories, type Item } from '../../generated/graphql';
import { insertMicrophone } from './categories/MicrophoneItem';
import { insertMonitoringItem } from './categories/MonitoringItem';
export const CREATE_ITEM_TABLE = `
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

const INSERT_ITEM = async (jsonData: any) => {
  const db = await SQLite.open('sqlite:internal.db');
  let parsed: Item = JSON.parse(jsonData);
  // Use the tauri.sql.execute method to insert the JSON data into the database
  await db.select(`
    INSERT INTO item (id, created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_id, console_id, computer_id, processor_id, network_item_id, microphone_id, radio_item_id, speaker_item_id, monitoring_item_id, searchable_model, notes)
    VALUES (
      ${parsed.id},
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

  switch (parsed.category) {
    case Categories.Amplifier:
      // code to handle amplifier_id foreign key
      break;
    case Categories.Console:
      // code to handle console_id foreign key
      break;
    case Categories.Computer:
      // code to handle computer_id foreign key
      break;
    case Categories.Processor:
      // code to handle processor_id foreign key
      break;
    case Categories.Network:
      // code to handle network_item_id foreign key
      break;
    case Categories.Microphones:
      if (parsed.microphone) insertMicrophone(parsed.microphone);
      // code to handle microphone_id foreign key
      if (parsed.microphone) break;
    case Categories.Monitoring:
      // code to handle monitoring_item_id foreign key
      if (parsed.monitoring_item) insertMonitoringItem(parsed.monitoring_item);
      break;
    case Categories.Radio:
      // code to handle radio_item_id foreign key
      break;
    case Categories.Speaker:
      // code to handle speaker_item_id foreign key
      break;
    // default:
    //   {
    //   }
    //   // code to handle invalid foreign key
    //   break;
  }
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

// export default CREATE_ITEM_TABLE;
