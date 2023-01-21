use super::creation_structs::CreateItem;
use super::enums::*;
use super::field_structs::*;
use serde::{Deserialize, Serialize};
use sqlx::Decode;

#[cfg(test)]
use mockall::{predicate::*};

trait Constructor {
    fn new(self) -> Self;
}

pub trait StructConvert<T> {
    fn to_query(&self) -> T;
}

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

impl Item {
    pub fn new(
        id: i64,
        created_at: String,
        updated_at: String,
        public_notes: Option<String>,
        cost: f64,
        weight: f64,
        dimensions: Option<Dimension>,
        model: String,
        category: Categories,
    ) -> Self {
        Self {
            id,
            created_at,
            updated_at,
            public_notes,
            cost,
            weight,
            dimensions,
            model,
            category,
            amplifier: None,
            console: None,
            computer: None,
            processor: None,
            network_item: None,
            microphone: None,
            radio_item: None,
            speaker_item: None,
            monitoring_item: None,
            notes: None,
        }
    }
}

impl StructConvert<CreateItem> for Item {
    fn to_query(&self) -> CreateItem {
        CreateItem {
            id: self.id,
            created_at: self.created_at.to_owned(),
            updated_at: self.updated_at.to_owned(),
            public_notes: self.public_notes.to_owned(),
            cost: self.cost,
            weight: self.weight,
            model: self.model.to_owned(),
            dimensions: Some(serde_json::to_string(&self.dimensions).unwrap_or_default()),
            category: self.category as i64,
            amplifier_item_id: self.amplifier.as_ref().map(|item| item.amplifier_id),
            console_item_id: self.console.as_ref().map(|item| item.id),
            computer_item_id: self.computer.as_ref().map(|item| item.computer_id),
            processor_item_id: self.processor.as_ref().map(|item| item.processor_id),
            network_item_id: self.network_item.as_ref().map(|item| item.network_id),
            microphone_item_id: self.microphone.as_ref().map(|item| item.microphone_id),
            radio_item_id: self.radio_item.as_ref().map(|item| item.rf_id),
            speaker_item_id: self.speaker_item.as_ref().map(|item| item.speaker_id),
            monitoring_item_id: self.monitoring_item.as_ref().map(|item| item.monitoring_id),
            notes: serde_json::to_string(&self.notes)
                .map(|thing| Some(thing))
                .unwrap_or_default(),
            searchable_model: Some(self.model.to_owned()),
        }
    }
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
    pub speaker_id: i64,
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
    pub monitoring_id: i64,
    pub distro: bool,
    pub network_connectivity: Vec<NetworkPort>,
    pub physical_connectivity: Option<Vec<PhysicalPort>>,
    pub power: Power,
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct RFItem {
    pub rf_id: i64,
    pub physical_range: i64,
    pub lower_frequency_response: i64,
    pub upper_frequency_response: i64,
    pub transmitter: Transmitter,
    pub reciever: Receiver,
}
