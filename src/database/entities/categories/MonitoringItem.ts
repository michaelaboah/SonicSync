import SQLite from 'tauri-plugin-sqlite';
import type { MonitoringItem } from '../../../generated/graphql';

const CREATE_MONITORING_ITEM = `
CREATE TABLE monitoring_item (
  id integer NOT NULL PRIMARY KEY autoincrement,
  distro integer NULL,
  network_connectivity JSON NULL,
  physical_connectivity JSON NULL,
  power JSON NULL
);
`;

export const insert_monitoring_item = async (monitoring: MonitoringItem): Promise<number | string> => {
  if (monitoring.id) {
    delete monitoring.id;
  }
  const db = await SQLite.open('sqlite:internal.db');
  console.log(Object.values(monitoring));
  try {
    const result = await db.select<{ id: number }[]>(
      `INSERT INTO monitoring_item (
      distro,
      network_connectivity,
      physical_connectivity,
      power
    )
    VALUES (
      ?1,
      ?2,
      ?3,
      ?4
    ) RETURNING id;`,
      [
        monitoring.distro,
        JSON.stringify(monitoring.network_connectivity),
        JSON.stringify(monitoring.physical_connectivity),
        JSON.stringify(monitoring.power),
      ]
    );
    return result[0].id;
  } catch (error: any) {
    console.error(`Error inserting monitoring item: ${error.message}`);
    return JSON.stringify(error);
  }
  // await db.close();
};

const test = `
{
  "id": 1000,
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
}`;

let convert: MonitoringItem = JSON.parse(test);
insert_monitoring_item(convert);
export default CREATE_MONITORING_ITEM;
