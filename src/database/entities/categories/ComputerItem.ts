import SQLite from 'tauri-plugin-sqlite';
import type { ComputerItem } from '../../../generated/graphql';

const CREATE_COMPUTER_ITEM_TABLE = `CREATE TABLE computer_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  cpu_processor text NOT NULL,
  ram_size integer NOT NULL,
  total_storage integer NOT NULL,
  model_year text NULL,
  operating_system text NULL,
  dedicated_graphics integer NOT NULL,
  network_connectivity JSON NULL,
  computer_ports JSON NULL,
  power JSON NULL
);`;
export default CREATE_COMPUTER_ITEM_TABLE;

export const insert_computer_item = async (computer: ComputerItem): Promise<number | string> => {
  const db = await SQLite.open('sqlite:internal.db');
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO computer_item (
      cpu_processor,
      ram_size,
      total_storage,
      model_year,
      operating_system,
      dedicated_graphics,
      network_connectivity,
      computer_ports,
      power
    )
    VALUES (
      ?1,
      ?2,
      ?3,
      ?4,
      ?5,
      ?6,
      ?7,
      ?8,
      ?9
    ) RETURNING id;`,
      [
        computer.cpu_processor,
        computer.ram_size,
        computer.total_storage,
        computer.model_year,
        computer.operating_system,
        computer.dedicated_graphics,
        JSON.stringify(computer.network_connectivity),
        JSON.stringify(computer.computer_ports),
        JSON.stringify(computer.power),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting computer item: ${error.message}`);
    return JSON.stringify(error);
  }
};

const test_computer = `{
    
    "cpu_processor": "3.6GHz quad-core Intel Core i3",
    "ram_size": 8,
    "total_storage": 128,
    "model_year": "2018",
    "operating_system": "macOS",
    "dedicated_graphics": false,
    "network_connectivity": [
      {
        "protocol": "IP",
        "power_over_ethernet": false,
        "port_identifier": null,
        "max_connection_speed": "SUPERSPEED"
      }
    ],
    "computer_ports": [
      {
        "port_type": "HDMI",
        "number_of_ports": 1,
        "front_port": false,
        "version": "1.4"
      },
      {
        "port_type": "USB_C_THUNDERBOLT",
        "number_of_ports": 4,
        "front_port": false,
        "version": null
      },
      {
        "port_type": "USB_A",
        "number_of_ports": 2,
        "front_port": false,
        "version": null
      }
    ],
    "power": {
      "wattage": 70,
      "redundant": false,
      "lower_voltage": 100,
      "max_wattage": 150,
      "input_connector": "EDISON",
      "output_connector": null
    }
}`;

// let convert: ComputerItem = JSON.parse(test_computer);
// insertComputerItem(convert);
const test = `
INSERT INTO computer_item 
(
ram_size,
total_storage,
model_year,
operating_system,
dedicated_graphics,
network_connectivity,
computer_ports,
power
)
VALUES(
  '3.6GHz quad-core Intel Core i3',
  8,
  128,
  '2018',
  'macOS',
  0,
  '[{"max_connection_speed":100,"protocol":7,"power_over_ethernet":false}]',
  '[{"port_type":3,"number_of_ports":1,"front_port":false,"version":"1.4"},{"port_type":10,"number_of_ports":4,"front_port":false},{"port_type":0,"number_of_ports":2,"front_port":false}]',
  '{"lower_voltage":100,"upper_voltage":240,"wattage":70,"max_wattage":150,"redundant":false,"input_connector":1}'
);
    `;
