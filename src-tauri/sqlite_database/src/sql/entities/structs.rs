use super::enums::*;
use super::field_structs::*;
use serde::{Deserialize, Serialize};
use sqlx::Decode;

#[derive(Debug, Default, sqlx::FromRow, Decode, Serialize, Deserialize, PartialEq, Clone)]
pub struct Item {
    pub id: i64,
    pub created_at: String,
    pub updated_at: String,
    pub public_notes: Option<String>,
    pub cost: f64,
    pub weight: f64,
    pub dimensions: Option<Dimension>,
    pub model: String,
    pub category: Categories,
    pub amplifier: Option<AmplifierItem>,
    pub console: Option<ConsoleItem>,
    pub computer: Option<ComputerItem>,
    pub processor: Option<ProcessorItem>,
    pub network_item: Option<NetworkItem>,
    pub microphone: Option<MicrophoneItem>,
    pub radio_item: Option<RFItem>,
    pub speaker_item: Option<SpeakerItem>,
    pub monitoring_item: Option<MonitoringItem>,
    pub notes: Option<Vec<String>>,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct ConsoleItem {
    pub id: i64,
    pub total_inputs: i64,
    pub total_outputs: i64,
    pub total_busses: i64,
    pub physical_inputs: i64,
    pub physical_outputs: i64,
    pub aux_inputs: i64,
    pub physical_aux_inputs: i64,
    pub phantom_power_inputs: i64,
    pub faders: i64,
    pub motorized: bool,
    pub midi: MidiType,
    pub protocol_inputs: i64,
    pub signal_protocol: Protocol,
    pub can_expand: bool,
    pub max_sample_rate: SampleRate,
    pub power: Power,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct AmplifierItem {
    pub amplifier_id: i64,
    pub total_inputs: i64,
    pub total_outputs: i64,
    pub midi: MidiType,
    pub physical_connectivity: Option<Vec<PhysicalPort>>,
    pub network_connectivity: Vec<NetworkPort>,
    pub signal_protocol: Protocol,
    pub max_sample_rate: SampleRate,
    pub power: Power,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct ComputerItem {
    pub computer_id: i64,
    pub cpu_processor: String,
    pub ram_size: i64,
    pub total_storage: i64,
    pub model_year: String,
    pub operating_system: String,
    pub dedicated_graphics: bool,
    pub network_connectivity: Vec<NetworkPort>,
    pub computer_ports: Vec<ComputerPort>,
    pub power: Power,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct ProcessorItem {
    pub processor_id: i64,
    pub total_inputs: i64,
    pub total_outputs: i64,
    pub physical_inputs: i64,
    pub physical_outputs: i64,
    pub midi: MidiType,
    pub protocol_inputs: i64,
    pub signal_protocol: Protocol,
    pub max_sample_rate: SampleRate,
    pub network_connectivity: Vec<NetworkPort>,
    pub physical_connectivity: Option<Vec<PhysicalPort>>,
    pub power: Option<Power>,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct NetworkItem {
    pub network_id: i64,
    pub network_type: NetworkType,
    pub poe_ports: i64,
    pub max_speed: i64,
    pub fiber: bool,
    pub network_connectivity: Vec<NetworkPort>,
    pub power: Power,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct MicrophoneItem {
    pub microphone_id: i64,
    pub max_spl: f64,
    pub phantom: bool,
    pub low_cut: bool,
    pub pad: bool,
    pub diaphragm_size: Option<f64>,
    pub output_impedance: f64,
    pub frequency_response: String,
    pub connector: Analog,
    pub microphone_type: Vec<MicrophoneType>,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct SpeakerItem {
    pub id: i64,
    pub driver: DriverArrangment,
    pub built_in_processing: bool,
    pub wireless: bool,
    pub max_spl: f64,
    pub power: Power,
    pub lower_frequency_response: i64,
    pub upper_frequency_response: i64,
    pub mounting_options: Vec<String>,
    pub physical_connectivity: Option<Vec<PhysicalPort>>,
    pub network_connectivity: Vec<NetworkPort>,
}
#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct MonitoringItem {
    pub id: i64,
    pub distro: bool,
    pub network_connectivity: Vec<NetworkPort>,
    pub physical_connectivity: Option<Vec<PhysicalPort>>,
    pub power: Power,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct RFItem {
    pub id: i64,
    pub physical_range: i64,
    pub lower_frequency_response: i64,
    pub upper_frequency_response: i64,
    pub transmitter: Transmitter,
    pub reciever: Reciever,
}
