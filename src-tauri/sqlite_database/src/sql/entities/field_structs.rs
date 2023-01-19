use super::enums::*;
use serde::{Deserialize, Serialize};
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct Dimension {
    pub width: f64,
    pub length: f64,
    pub height: f64,
    pub rack_unit: Option<f64>,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct PhysicalPort {
    port_identifier: Option<String>,
    connector_type: Analog,
    signal_lines: i64,
    input: bool,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct NetworkPort {
    port_identifier: Option<String>,
    max_connection_speed: NetworkSpeeds,
    power_over_ethernet: bool,
    protocol: Protocol,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct Power {
    pub wattage: f64,
    pub redundant: bool,
    pub lower_voltage: f64,
    pub max_wattage: f64,
    pub input_connector: PowerConnector,
    pub output_connector: Option<String>,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct Transmitter {
    connector: TransmitterConnector,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct Reciever {
    network_ports: Vec<NetworkPort>,
    physical_ports: Vec<PhysicalPort>,
    power: Power,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct DriverArrangment {
    speaker_size: f64,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct ComputerPort {
    port_type: ComputerPortType,
    number_of_ports: i64,
    front_port: bool,
    version: Option<String>,
}
