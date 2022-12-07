// import Database from 'tauri-plugin-sqlite';
import SQLite from 'tauri-plugin-sqlite';
import { Categories } from '../../generated/graphql';
import { insertMonitoringItem } from './categories/MonitoringItem';
const CREATE_ITEM_TABLE = `
CREATE TABLE item (
  id integer not null primary key autoincrement, 
  created_at datetime not null default 'NOW()', 
  updated_at datetime not null, 
  public_notes text null, 
  cost double null, 
  weight double null, 
  dimensions json null, 
  model text not null, 
  category integer not null, 
  amplifier_id integer null, 
  console_id integer null, 
  computer_id integer null, 
  processor_id integer null, 
  network_item_id integer null, 
  microphone_id integer null, 
  radio_item_id integer null, 
  speaker_item_id integer null, 
  monitoring_item_id integer null, 
  searchable_model text null, 
  notes text null, 
  constraint item_amplifier_id_foreign foreign key(amplifier_id) references amplifier_item(id) on delete set null on update cascade, 
  constraint item_console_id_foreign foreign key(console_id) references console_item(id) on delete set null on update cascade, 
  constraint item_computer_id_foreign foreign key(computer_id) references computer_item(id) on delete set null on update cascade, 
  constraint item_processor_id_foreign foreign key(processor_id) references processing_item(id) on delete set null on update cascade, 
  constraint item_network_item_id_foreign foreign key(network_item_id) references network_item(id) on delete set null on update cascade, 
  constraint item_microphone_id_foreign foreign key(microphone_id) references microphone_item(id) on delete set null on update cascade, 
  constraint item_radio_item_id_foreign foreign key(radio_item_id) references rfitem(id) on delete set null on update cascade, 
  constraint item_speaker_item_id_foreign foreign key(speaker_item_id) references speaker_item(id) on delete set null on update cascade, 
  constraint item_monitoring_item_id_foreign foreign key(monitoring_item_id) references monitoring_item(id) on delete set null on update cascade
);
`;

const INSERT_ITEM = async (jsonData: any) => {
  const db = await SQLite.open('sqlite:internal.db');
  let parsed = JSON.parse(jsonData);
  const { item } = parsed;
  console.log(parsed);
  // Use the tauri.sql.execute method to insert the JSON data into the database
  await db.select(`
    INSERT INTO item (id, created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_id, console_id, computer_id, processor_id, network_item_id, microphone_id, radio_item_id, speaker_item_id, monitoring_item_id, searchable_model, notes)
    VALUES (
      ${item.id},
      '${item.createdAt}',
      '${item.updatedAt}',
      '${item.publicNotes}',
      ${item.cost},
      ${item.weight},
      '${JSON.stringify(item.dimensions)}',
      '${item.model}',
      '${item.category}',
      ${item.amplifier},
      ${item.console},
      ${item.computer},
      ${item.processor},
      ${item.network_item},
      ${item.microphone},
      ${item.radio_item},
      ${item.speaker_item},
      ${item.monitoring_item.id},
      '${item.searchable_model}',
      '${item.notes}'
    )
  `);

  switch (item.category) {
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
      // code to handle microphone_id foreign key
      break;
    case Categories.Monitoring:
      // code to handle monitoring_item_id foreign key
      insertMonitoringItem(item.monitoring_item);
      break;
    case Categories.Radio:
      // code to handle radio_item_id foreign key
      break;
    case Categories.Speaker:
      // code to handle speaker_item_id foreign key
      break;
    default:
      // code to handle invalid foreign key
      break;
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

export default CREATE_ITEM_TABLE;
