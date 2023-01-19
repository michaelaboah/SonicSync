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
    pub port_identifier: Option<String>,
    pub connector_type: Analog,
    pub signal_lines: i64,
    pub input: bool,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct NetworkPort {
    pub port_identifier: Option<String>,
    pub max_connection_speed: NetworkSpeeds,
    pub power_over_ethernet: bool,
    pub protocol: Protocol,
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
    pub(crate) connector: TransmitterConnector,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct Receiver {
    pub network_ports: Vec<NetworkPort>,
    pub physical_ports: Vec<PhysicalPort>,
    pub power: Power,
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
