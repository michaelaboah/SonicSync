#[warn(missing_debug_implementations)]
use super::enums::*;
use super::field_structs::*;
use super::structs::*;
use serde::{Deserialize, Serialize};
use sqlx::sqlite::Sqlite;
use sqlx::Pool;

pub trait SqlConvert<T> {
    fn convert_query(&self) -> T;
}
#[derive(Debug, Default, sqlx::FromRow, PartialEq)]
pub struct CreateItem {
    pub id: i64,
    pub created_at: String,
    pub updated_at: String,
    pub public_notes: Option<String>,
    pub cost: f64,
    pub weight: f64,
    pub dimensions: Option<String>,
    pub model: String,
    pub category: i64,
    pub amplifier_item_id: Option<i64>,
    pub console_item_id: Option<i64>,
    pub computer_item_id: Option<i64>,
    pub processor_item_id: Option<i64>,
    pub network_item_id: Option<i64>,
    pub microphone_item_id: Option<i64>,
    pub radio_item_id: Option<i64>,
    pub speaker_item_id: Option<i64>,
    pub monitoring_item_id: Option<i64>,
    pub notes: Option<String>,
    pub searchable_model: Option<String>,
}

impl CreateItem {
    pub fn item_to_query(item: &Item) -> Self {
        Self {
            id: item.id,
            created_at: item.created_at.to_owned(),
            updated_at: item.updated_at.to_owned(),
            public_notes: item.public_notes.to_owned(),
            cost: item.cost,
            weight: item.weight,
            model: item.model.to_owned(),
            dimensions: Some(serde_json::to_string(&item.dimensions).unwrap_or_default()),
            category: item.category as i64,
            amplifier_item_id: item.amplifier.as_ref().map(|item| item.amplifier_id),
            console_item_id: item.console.as_ref().map(|item| item.console_id),
            computer_item_id: item.computer.as_ref().map(|item| item.computer_id),
            processor_item_id: item.processor.as_ref().map(|item| item.processor_id),
            network_item_id: item.network_item.as_ref().map(|item| item.network_id),
            microphone_item_id: item.microphone.as_ref().map(|item| item.microphone_id),
            radio_item_id: item.radio_item.as_ref().map(|item| item.rf_id),
            speaker_item_id: item.speaker_item.as_ref().map(|item| item.speaker_id),
            monitoring_item_id: item.monitoring_item.as_ref().map(|item| item.monitoring_id),
            notes: serde_json::to_string(&item.notes)
                .map(|thing| Some(thing))
                .unwrap_or_default(),
            searchable_model: Some(item.model.to_owned()),
        }
    }
    pub async fn query_to_item(&self, pool: &Pool<Sqlite>) -> Item {
        let dim = self
            .dimensions
            .as_ref()
            .map_or(None, |d| serde_json::from_str(&d).unwrap_or_default());
        Item {
            id: self.id,
            created_at: self.created_at.to_owned(),
            updated_at: self.updated_at.to_owned(),
            public_notes: self.public_notes.to_owned(),
            cost: self.cost,
            weight: self.weight,
            dimensions: dim,
            model: self.model.to_owned(),
            category: num::FromPrimitive::from_i64(self.category).unwrap_or_default(),
            amplifier: {
                let sub_id =
                    sqlx::query!("SELECT amplifier_item_id FROM item where id = ?", self.id)
                        .fetch_one(pool)
                        .await
                        .unwrap()
                        .amplifier_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateAmplifierItem,
                            "SELECT * FROM amplifier_item where amplifier_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ amplifier query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                // None
            },
            console: {
                let sub_id = sqlx::query!("SELECT console_item_id FROM item where id = ?", self.id)
                    .fetch_one(pool)
                    .await
                    .unwrap()
                    .console_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateConsoleItem,
                            "SELECT * FROM console_item where console_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ amplifier query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                // None
            },
            computer: {
                let sub_id =
                    sqlx::query!("SELECT computer_item_id FROM item where id = ?", self.id)
                        .fetch_one(pool)
                        .await
                        .unwrap()
                        .computer_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateComputerItem,
                            "SELECT * FROM computer_item where computer_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ amplifier query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                // None
            },
            processor: {
                let sub_id = sqlx::query!("SELECT network_item_id FROM item where id = ?", self.id)
                    .fetch_one(pool)
                    .await
                    .unwrap()
                    .network_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateProcessorItem,
                            "SELECT * FROM processor_item where processor_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ amplifier query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                // None
            },
            network_item: {
                let sub_id = sqlx::query!("SELECT network_item_id FROM item where id = ?", self.id)
                    .fetch_one(pool)
                    .await
                    .unwrap()
                    .network_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateNetworkItem,
                            "SELECT * FROM network_item where network_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ amplifier query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                // None
            },
            microphone: {
                let sub_id =
                    sqlx::query!("SELECT microphone_item_id FROM item where id = ?", self.id)
                        .fetch_one(pool)
                        .await
                        .unwrap()
                        .microphone_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateMicrophoneItem,
                            "SELECT * FROM microphone_item where microphone_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ microphone query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                // None
            },
            radio_item: {
                let sub_id = sqlx::query!("SELECT radio_item_id FROM item where id = ?", self.id)
                    .fetch_one(pool)
                    .await
                    .unwrap()
                    .radio_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateRFItem,
                            "SELECT * FROM rf_item where rf_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ radio_item query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                //None
            },
            speaker_item: {
                let sub_id = sqlx::query!("SELECT speaker_item_id FROM item where id = ?", self.id)
                    .fetch_one(pool)
                    .await
                    .unwrap()
                    .speaker_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateSpeakerItem,
                            "SELECT * FROM speaker_item where speaker_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ radio_item query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
                //None
            },
            monitoring_item: {
                let sub_id =
                    sqlx::query!("SELECT monitoring_item_id FROM item where id = ?", self.id)
                        .fetch_one(pool)
                        .await
                        .unwrap()
                        .monitoring_item_id;

                let sub_result = match sub_id {
                    Some(id) => {
                        let result = sqlx::query_as!(
                            CreateMonitoringItem,
                            "SELECT * FROM monitoring_item where monitoring_id = ?",
                            id
                        )
                        .fetch_one(pool)
                        .await
                        .expect("Err w/ radio_item query");
                        Some(result)
                    }
                    None => None,
                };
                match sub_result {
                    Some(res) => Some(res.convert_query()),
                    None => None,
                }
            },
            notes: serde_json::from_str(self.notes.as_ref().unwrap()).unwrap_or_default(),
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct CreateAmplifierItem {
    pub amplifier_id: i64,
    pub total_inputs: i64,
    pub total_outputs: i64,
    pub midi: i64,
    pub physical_connectivity: Option<String>,
    pub network_connectivity: Option<String>,
    pub signal_protocol: i64,
    pub max_sample_rate: i64,
    pub power: Option<String>,
}

impl SqlConvert<AmplifierItem> for CreateAmplifierItem {
    fn convert_query(&self) -> AmplifierItem {
        AmplifierItem {
            amplifier_id: self.amplifier_id,
            total_inputs: self.total_inputs,
            total_outputs: self.total_outputs,
            midi: num::FromPrimitive::from_i64(self.midi).unwrap_or_default(),
            physical_connectivity: self
                .physical_connectivity
                .as_ref()
                .map(|phys| {
                    let thing = serde_json::from_str::<Option<Vec<PhysicalPort>>>(&phys).unwrap();
                    thing
                })
                .unwrap_or_default(),
            network_connectivity: {
                self.network_connectivity
                    .as_ref()
                    .map(|net| serde_json::from_str::<Vec<NetworkPort>>(&net).unwrap())
                    .unwrap_or_default()
            },
            signal_protocol: num::FromPrimitive::from_i64(self.signal_protocol).unwrap_or_default(),
            max_sample_rate: SampleRate::HD,
            power: self
                .power
                .as_ref()
                .map(|p| serde_json::from_str::<Power>(&p).unwrap())
                .unwrap(),
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
struct CreateConsoleItem {
    pub console_id: i64,
    pub total_inputs: i64,
    pub total_outputs: i64,
    pub total_busses: i64,
    pub physical_inputs: i64,
    pub physical_outputs: i64,
    pub aux_inputs: i64,
    pub physical_aux_inputs: i64,
    pub phantom_power_inputs: i64,
    pub faders: i64,
    pub motorized: i64,
    pub midi: i64,
    pub protocol_inputs: Option<i64>,
    pub signal_protocol: i64,
    pub can_expand: Option<i64>,
    pub max_sample_rate: i64,
    pub power: Option<String>,
}

impl CreateConsoleItem {
    pub fn new(console: ConsoleItem) -> Self {
        CreateConsoleItem {
            console_id: console.console_id,
            total_inputs: todo!(),
            total_outputs: todo!(),
            total_busses: todo!(),
            physical_inputs: todo!(),
            physical_outputs: todo!(),
            aux_inputs: todo!(),
            physical_aux_inputs: todo!(),
            phantom_power_inputs: todo!(),
            faders: todo!(),
            motorized: todo!(),
            midi: todo!(),
            protocol_inputs: todo!(),
            signal_protocol: todo!(),
            can_expand: todo!(),
            max_sample_rate: todo!(),
            power: todo!(),
        }
    }
}
impl SqlConvert<ConsoleItem> for CreateConsoleItem {
    fn convert_query(&self) -> ConsoleItem {
        ConsoleItem {
            console_id: self.console_id,
            total_inputs: self.total_inputs,
            total_outputs: self.total_outputs,
            midi: num::FromPrimitive::from_i64(self.midi).unwrap_or_default(),
            total_busses: self.physical_inputs,
            physical_inputs: self.physical_inputs,
            physical_outputs: self.physical_outputs,
            aux_inputs: self.aux_inputs,
            physical_aux_inputs: self.physical_aux_inputs,
            phantom_power_inputs: self.phantom_power_inputs,
            faders: self.faders,
            motorized: self.motorized != 0,
            protocol_inputs: self.protocol_inputs.unwrap(),
            can_expand: match self.can_expand {
                Some(i) => i != 0,
                None => false,
            },
            signal_protocol: num::FromPrimitive::from_i64(self.signal_protocol).unwrap_or_default(),
            max_sample_rate: num::FromPrimitive::from_i64(self.max_sample_rate).unwrap_or_default(),
            power: self
                .power
                .as_ref()
                .map(|p| serde_json::from_str::<Power>(&p).unwrap())
                .unwrap(),
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct CreateComputerItem {
    pub computer_id: i64,
    pub cpu_processor: String,
    pub ram_size: i64,
    pub total_storage: i64,
    pub model_year: Option<String>,
    pub operating_system: Option<String>,
    pub dedicated_graphics: i64,
    pub network_connectivity: Option<String>,
    pub computer_ports: Option<String>,
    pub power: Option<String>,
}

impl SqlConvert<ComputerItem> for CreateComputerItem {
    fn convert_query(&self) -> ComputerItem {
        ComputerItem {
            computer_id: self.computer_id,
            cpu_processor: self.cpu_processor.to_owned(),
            ram_size: self.ram_size,
            total_storage: self.total_storage,
            model_year: self.model_year.to_owned().unwrap(),
            operating_system: self.operating_system.to_owned().unwrap(),
            dedicated_graphics: self.dedicated_graphics != 0,
            computer_ports: self
                .computer_ports
                .as_ref()
                .map_or(None, |cp| {
                    Some(serde_json::from_str::<Vec<ComputerPort>>(&cp).unwrap())
                })
                .unwrap_or_default(),
            network_connectivity: {
                self.network_connectivity
                    .as_ref()
                    .map(|net| serde_json::from_str::<Vec<NetworkPort>>(&net).unwrap())
                    .unwrap_or_default()
            },
            power: self
                .power
                .as_ref()
                .map(|p| serde_json::from_str::<Power>(&p).unwrap())
                .unwrap(),
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct CreateMicrophoneItem {
    pub microphone_id: i64,
    pub max_spl: i64,
    pub phantom: Option<i64>,
    pub low_cut: Option<i64>,
    pub pad: Option<i64>,
    pub diaphragm_size: Option<i64>,
    pub output_impedance: Option<i64>,
    pub frequency_response: Option<String>,
    pub connector: i64,
    pub microphone_type: String,
}

impl SqlConvert<MicrophoneItem> for CreateMicrophoneItem {
    fn convert_query(&self) -> MicrophoneItem {
        MicrophoneItem {
            microphone_id: self.microphone_id,
            max_spl: self.max_spl as f64,
            phantom: self.phantom.unwrap_or_default() != 0,
            low_cut: self.low_cut.unwrap_or_default() != 0,
            pad: self.pad.unwrap_or_default() != 0,
            diaphragm_size: Some(self.diaphragm_size.unwrap_or_default() as f64),
            output_impedance: self.output_impedance.unwrap_or_default() as f64,
            frequency_response: self.frequency_response.to_owned().unwrap_or_default(),
            connector: num::FromPrimitive::from_i64(self.connector).unwrap_or_default(),
            microphone_type: { serde_json::from_str(&self.microphone_type).unwrap_or_default() },
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct CreateNetworkItem {
    pub network_id: i64,
    pub network_type: i64,
    pub poe_ports: i64,
    pub max_speed: i64,
    pub fiber: Option<i64>,
    pub network_connectivity: Option<String>,
    pub power: Option<String>,
}

impl SqlConvert<NetworkItem> for CreateNetworkItem {
    fn convert_query(&self) -> NetworkItem {
        NetworkItem {
            network_id: self.network_id,
            network_type: num::FromPrimitive::from_i64(self.network_type).unwrap_or_default(),
            poe_ports: self.poe_ports,
            max_speed: self.max_speed,
            fiber: self.fiber.unwrap_or_default() != 0,
            network_connectivity: self
                .network_connectivity
                .as_ref()
                .map(|net| serde_json::from_str::<Vec<NetworkPort>>(net).unwrap_or_default())
                .unwrap_or_default(),
            power: self
                .power
                .as_ref()
                .map(|p| serde_json::from_str::<Power>(&p).unwrap_or_default())
                .unwrap(),
        }
    }
}

pub struct CreateProcessorItem {
    pub processor_id: i64,
    pub total_inputs: i64,
    pub total_outputs: i64,
    pub physical_inputs: i64,
    pub physical_outputs: i64,
    pub midi: Option<i64>,
    pub protocol_inputs: Option<i64>,
    pub signal_protocol: i64,
    pub max_sample_rate: i64,
    pub network_connectivity: Option<String>,
    pub physical_connectivity: Option<String>,
    pub power: Option<String>,
}

impl SqlConvert<ProcessorItem> for CreateProcessorItem {
    fn convert_query(&self) -> ProcessorItem {
        ProcessorItem {
            processor_id: self.processor_id,
            total_inputs: self.total_inputs,
            total_outputs: self.total_outputs,
            physical_inputs: self.physical_inputs,
            physical_outputs: self.physical_outputs,
            midi: num::FromPrimitive::from_i64(self.midi.unwrap_or_default()).unwrap_or_default(),
            protocol_inputs: self.protocol_inputs.unwrap_or_default(),
            signal_protocol: num::FromPrimitive::from_i64(self.signal_protocol).unwrap_or_default(),
            max_sample_rate: num::FromPrimitive::from_i64(self.max_sample_rate).unwrap_or_default(),
            network_connectivity: serde_json::from_str(self.network_connectivity.as_ref().unwrap())
                .unwrap_or_default(),
            physical_connectivity: serde_json::from_str(
                self.physical_connectivity.as_ref().unwrap(),
            )
            .unwrap_or_default(),
            power: serde_json::from_str(self.power.as_ref().unwrap()).unwrap_or_default(),
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct CreateRFItem {
    rf_id: i64,
    physical_range: i64,
    lower_frequency_response: i64,
    upper_frequency_response: i64,
    transmitter: Option<String>,
    receiver: Option<String>,
}
impl CreateRFItem {
    fn new(
        rf_id: i64,
        physical_range: i64,
        lower_frequency_response: i64,
        upper_frequency_response: i64,
        transmitter: Option<String>,
        receiver: Option<String>,
    ) -> Self {
        Self {
            rf_id,
            physical_range,
            lower_frequency_response,
            upper_frequency_response,
            transmitter,
            receiver,
        }
    }
}

impl SqlConvert<RFItem> for CreateRFItem {
    fn convert_query(&self) -> RFItem {
        RFItem {
            rf_id: self.rf_id,
            physical_range: self.physical_range,
            lower_frequency_response: self.lower_frequency_response,
            upper_frequency_response: self.upper_frequency_response,
            transmitter: self
                .transmitter
                .as_ref()
                .map(|tx| serde_json::from_str::<Transmitter>(tx).unwrap())
                .unwrap_or_default(),
            reciever: serde_json::from_str::<Receiver>(self.receiver.as_ref().unwrap())
                .unwrap_or_default(),
        }
    }
}

#[derive(Debug, Default, sqlx::FromRow, Serialize, Deserialize, PartialEq, Clone)]
pub struct CreateSpeakerItem {
    speaker_id: i64,
    driver: String,
    built_in_processing: i64,
    wireless: i64,
    max_spl: i64,
    lower_frequency_response: i64,
    upper_frequency_response: i64,
    mounting_options: String,
    physical_connectivity: Option<String>,
    network_connectivity: Option<String>,
    power: String,
}

impl CreateSpeakerItem {
    fn new(
        speaker_id: i64,
        driver: String,
        built_in_processing: i64,
        wireless: i64,
        max_spl: i64,
        lower_frequency_response: i64,
        upper_frequency_response: i64,
        mounting_options: String,
        physical_connectivity: Option<String>,
        network_connectivity: Option<String>,
        power: String,
    ) -> Self {
        Self {
            speaker_id,
            driver,
            built_in_processing,
            wireless,
            max_spl,
            lower_frequency_response,
            upper_frequency_response,
            mounting_options,
            physical_connectivity,
            network_connectivity,
            power,
        }
    }
}

impl SqlConvert<SpeakerItem> for CreateSpeakerItem {
    fn convert_query(&self) -> SpeakerItem {
        SpeakerItem {
            speaker_id: self.speaker_id,
            driver: serde_json::from_str(&self.driver).unwrap_or_default(),
            built_in_processing: self.built_in_processing != 0,
            wireless: self.wireless != 0,
            max_spl: self.max_spl as f64,
            power: serde_json::from_str(&self.power).unwrap(),
            lower_frequency_response: self.lower_frequency_response,
            upper_frequency_response: self.upper_frequency_response,
            mounting_options: serde_json::from_str(&self.mounting_options).unwrap_or_default(),
            physical_connectivity: serde_json::from_str(
                self.physical_connectivity.as_ref().unwrap(),
            )
            .unwrap_or_default(),
            network_connectivity: serde_json::from_str(self.network_connectivity.as_ref().unwrap())
                .unwrap_or_default(),
        }
    }
}

pub struct CreateMonitoringItem {
    monitoring_id: i64,
    distro: Option<i64>,
    network_connectivity: Option<String>,
    physical_connectivity: Option<String>,
    power: Option<String>,
}

impl CreateMonitoringItem {
    fn new(
        monitoring_id: i64,
        distro: Option<i64>,
        network_connectivity: Option<String>,
        physical_connectivity: Option<String>,
        power: Option<String>,
    ) -> Self {
        Self {
            monitoring_id,
            distro,
            network_connectivity,
            physical_connectivity,
            power,
        }
    }
}

impl SqlConvert<MonitoringItem> for CreateMonitoringItem {
    fn convert_query(&self) -> MonitoringItem {
        MonitoringItem {
            monitoring_id: self.monitoring_id,
            distro: self.distro.unwrap() != 0,
            physical_connectivity: serde_json::from_str(
                self.physical_connectivity.as_ref().unwrap(),
            )
            .unwrap_or_default(),
            network_connectivity: serde_json::from_str(self.network_connectivity.as_ref().unwrap())
                .unwrap_or_default(),
            power: serde_json::from_str(self.power.as_ref().unwrap()).unwrap_or_default(),
        }
    }
}

#[cfg(test)]
mod conversion_tests {
    use crate::entities::enums::*;
    use crate::entities::field_structs::*;

    #[test]
    fn test_physical_connectivity_parse() {
        let phys_conn = vec![PhysicalPort {
            ..Default::default()
        }];
        let json = serde_json::to_string(&phys_conn).unwrap();
        let parsed: Vec<PhysicalPort> = serde_json::from_str(&json).unwrap();
        assert_eq!(phys_conn, parsed);
    }

    #[test]
    fn test_network_connectivity_parse() {
        let net_conn = vec![NetworkPort {
            ..Default::default()
        }];
        let json = serde_json::to_string(&net_conn).unwrap();
        let parsed: Vec<NetworkPort> = serde_json::from_str(&json).unwrap();
        assert_eq!(net_conn, parsed);
    }

    #[test]
    fn test_transmitter_parse() {
        let transmitter = Transmitter {
            connector: TransmitterConnector::TRRS,
        };
        let tx_json = serde_json::to_string(&transmitter).unwrap();
        let parsed_tx = serde_json::from_str::<Transmitter>(&tx_json).unwrap();
        // println!("{:#?}", parsed_tx);
        assert_eq!(parsed_tx, transmitter);
    }

    #[test]
    fn test_receiver_parse() {
        let rx = Receiver {
            network_ports: vec![NetworkPort {
                ..Default::default()
            }],
            physical_ports: vec![PhysicalPort {
                ..Default::default()
            }],
            ..Default::default()
        };
        let rx_json = serde_json::to_string(&rx).unwrap();
        let parsed_rx = serde_json::from_str::<Receiver>(&rx_json).unwrap();
        // println!("{:#?}", parsed_rx.physical_ports[0]);
        assert_eq!(parsed_rx, rx);
    }
}
