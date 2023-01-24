use crate::database_setup::DatabasePool;
use crate::error_handling::*;
use crate::sql::entities::{creation_structs::*, enums::*, structs::*};
use sqlx::{Pool, Sqlite};
use tauri::{self, State};

// pub enum InsertionType<'a> {
//     JsonValue(serde_json::Value),
//     ItemStruct(&'a Item),
// }

/// #### This function inserts a single item into the database, given an `Item` struct and a SQLite connection pool.
/// The struct must implement the `StructConvert<CreateItem>` trait.
///
/// ## Arguments
/// * `insert` - A reference to an `Item` struct that will be inserted into the database.
/// * `pool` - A reference to a SQLite connection pool.
///
/// ## Returns
/// This function returns a `Result` containing a `SqlResult` variant. On success, the variant is `QuerySuccess`,
/// containing a string message indicating the successful insertion. On error, the variant is `QueryError`,
/// containing a string message indicating the error.
///
/// ## Example
/// ```no_run
///
/// use sqlx::SqlResult;
/// use sqlx::SqliteCustomError;
///
/// let pool = Pool::new("sqlite::memory:").await.unwrap();
/// let item = Item::default();
///     
/// let res = insert_single_item(&item, &pool).await;
/// println!("{:#?}", &res);
/// assert_eq!(res, Ok(SqlResult::QuerySuccess("Item inserted successfully".to_string())));
/// ```
#[tauri::command]
pub async fn insert_single_item(
    json: serde_json::Value,
    db_state: State<'_, DatabasePool>,
) -> Result<(), ()>
where
    Item: StructConvert<CreateItem>,
{
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;

    // match insert {
    //     InsertionType::JsonValue(json) => {
    let ref parsed_item = serde_json::from_value::<Item>(json).unwrap();
    let _res = category_insertion(parsed_item, pool).await;
    let table = parsed_item.to_query();
    let insertion_results = sqlx::query!("INSERT INTO item (id, created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_item_id,
                console_item_id, computer_item_id, processor_item_id, network_item_id, microphone_item_id, radio_item_id, speaker_item_id, monitoring_item_id,
                 notes)
                VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19)",
                table.id,
                table.created_at,
                table.updated_at,
                table.public_notes,
                table.cost,
                table.weight,
                table.dimensions,
                table.model,
                table.category,
                table.amplifier_item_id,
                table.console_item_id,
                table.computer_item_id,
                table.processor_item_id,
                table.network_item_id,
                table.microphone_item_id,
                table.radio_item_id,
                table.speaker_item_id,
                table.monitoring_item_id,
                table.notes
            )
                .execute(pool)
                .await;
    let item_insert = sqlite_error_handler(insertion_results);
    // item_insert
    println!("{:#?}", item_insert);
    Ok(())
    // }
    // InsertionType::ItemStruct(item) => {
    //     let _res = category_insertion(item, pool).await;
    //     let table = item.to_query();
    //     let insertion_results = sqlx::query!("INSERT INTO item (id, created_at, updated_at, public_notes, cost, weight, dimensions, model, category, amplifier_item_id,
    //         console_item_id, computer_item_id, processor_item_id, network_item_id, microphone_item_id, radio_item_id, speaker_item_id, monitoring_item_id,
    //          notes)
    //         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19)",
    //         table.id,
    //         table.created_at,
    //         table.updated_at,
    //         table.public_notes,
    //         table.cost,
    //         table.weight,
    //         table.dimensions,
    //         table.model,
    //         table.category,
    //         table.amplifier_item_id,
    //         table.console_item_id,
    //         table.computer_item_id,
    //         table.processor_item_id,
    //         table.network_item_id,
    //         table.microphone_item_id,
    //         table.radio_item_id,
    //         table.speaker_item_id,
    //         table.monitoring_item_id,
    //         table.notes
    //     )
    //         .execute(pool)
    //         .await;
    //     let item_insert = sqlite_error_handler(insertion_results);
    //     item_insert
    // }
    // }
    // None => Ok(SqlResult::QuerySuccess("Nothing to Add"))
}

async fn category_insertion<'a>(
    insert: &'a Item,
    pool: &'a Pool<Sqlite>,
) -> Result<SqlResult<'a>, SqliteCustomError<'a>> {
    match &insert.category {
        Categories::GENERIC => Ok(SqlResult::AcceptableError("Nothing to Add")),
        Categories::AMPLIFIER => match &insert.amplifier {
            Some(amplifier) => {
                let power_bind =
                    serde_json::to_value(amplifier.power.to_owned()).unwrap_or_default();
                let net_conn_bind = serde_json::to_value(amplifier.network_connectivity.to_owned())
                    .unwrap_or_default();
                let phys_conn_bind =
                    serde_json::to_value(amplifier.physical_connectivity.to_owned())
                        .unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO amplifier_item (amplifier_id, total_inputs, total_outputs, midi, physical_connectivity, network_connectivity, signal_protocol, max_sample_rate, power)
                        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9);",
                        amplifier.amplifier_id,
                        amplifier.total_inputs,
                        amplifier.total_outputs,
                        amplifier.midi,
                        phys_conn_bind,
                        net_conn_bind,
                        amplifier.signal_protocol,
                        amplifier.max_sample_rate,
                        power_bind
                    )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::CONSOLE => match &insert.console {
            Some(console) => {
                let power_bind = serde_json::to_string(&console.power).unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO console_item (
                        console_id, total_inputs, total_outputs, total_busses, physical_inputs, physical_outputs, aux_inputs, physical_aux_inputs, phantom_power_inputs, faders, motorized, midi, protocol_inputs, signal_protocol, can_expand, max_sample_rate, power)
                        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17);",
                        console.id,
                        console.total_inputs,
                        console.total_outputs,
                        console.total_busses,
                        console.physical_inputs,
                        console.physical_outputs,
                        console.aux_inputs,
                        console.physical_aux_inputs,
                        console.phantom_power_inputs,
                        console.faders,
                        console.motorized,
                        console.midi,
                        console.protocol_inputs,
                        console.signal_protocol,
                        console.can_expand,
                        console.max_sample_rate,
                        power_bind
                    )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::COMPUTER => match &insert.computer {
            Some(computer) => {
                let power_bind =
                    serde_json::to_value(computer.power.to_owned()).unwrap_or_default();
                let port_bind =
                    serde_json::to_value(computer.computer_ports.to_owned()).unwrap_or_default();
                let net_conn = serde_json::to_value(computer.network_connectivity.to_owned())
                    .unwrap_or_default();

                let insertion_results = sqlx::query!("INSERT INTO computer_item (computer_id, cpu_processor, ram_size, total_storage, model_year, operating_system, dedicated_graphics, network_connectivity, computer_ports, power)
                    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10);",
                        computer.computer_id,
                        computer.cpu_processor,
                        computer.ram_size,
                        computer.total_storage,
                        computer.model_year,
                        computer.operating_system,
                        computer.dedicated_graphics,
                        net_conn,
                        port_bind,
                        power_bind
                    )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::PROCESSOR => match &insert.processor {
            Some(processor) => {
                let power_bind =
                    serde_json::to_value(processor.power.to_owned()).unwrap_or_default();
                let net_conn_bind = serde_json::to_value(processor.network_connectivity.to_owned())
                    .unwrap_or_default();
                let phys_conn_bind =
                    serde_json::to_value(processor.physical_connectivity.to_owned())
                        .unwrap_or_default();
                let insertion_results = sqlx::query!(
                        "INSERT INTO processor_item (processor_id, total_inputs, total_outputs, physical_inputs, physical_outputs, midi, protocol_inputs, signal_protocol, max_sample_rate, network_connectivity, physical_connectivity, power)
                        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12);",
                        processor.processor_id,
                        processor.total_inputs,
                        processor.total_outputs,
                        processor.physical_inputs,
                        processor.physical_outputs,
                        processor.midi,
                        processor.protocol_inputs,
                        processor.signal_protocol,
                        processor.max_sample_rate,
                        net_conn_bind,
                        phys_conn_bind,
                        power_bind
                    )
                    .execute(pool)
                    .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::MONITORING => match &insert.monitoring_item {
            Some(monitor) => {
                let power_bind = serde_json::to_value(monitor.power.to_owned()).unwrap_or_default();
                let net_conn_bind = serde_json::to_value(monitor.network_connectivity.to_owned())
                    .unwrap_or_default();
                let phys_conn_bind = serde_json::to_value(monitor.physical_connectivity.to_owned())
                    .unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO monitoring_item (monitoring_id, distro, network_connectivity, physical_connectivity, power)
                    VALUES (?1, ?2, ?3, ?4, ?5);",
                        monitor.monitoring_id,
                        monitor.distro,
                        net_conn_bind,
                        phys_conn_bind,
                        power_bind
                    )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::SPEAKER => match &insert.speaker_item {
            Some(speaker) => {
                let power_bind = serde_json::to_value(speaker.power.to_owned()).unwrap_or_default();
                let net_conn_bind = serde_json::to_value(speaker.network_connectivity.to_owned())
                    .unwrap_or_default();
                let phys_conn_bind = serde_json::to_value(speaker.physical_connectivity.to_owned())
                    .unwrap_or_default();
                let driver = serde_json::to_value(speaker.driver.to_owned()).unwrap_or_default();
                let mounting_bind =
                    serde_json::to_value(speaker.mounting_options.to_owned()).unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO speaker_item (speaker_id, driver, built_in_processing, wireless, max_spl, power, lower_frequency_response, upper_frequency_response, mounting_options, physical_connectivity, network_connectivity)
                    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11);",
                        speaker.speaker_id,
                        driver,
                        speaker.built_in_processing,
                        speaker.wireless,
                        speaker.max_spl,
                        power_bind,
                        speaker.lower_frequency_response,
                        speaker.upper_frequency_response,
                        mounting_bind,
                        phys_conn_bind,
                        net_conn_bind
                )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        // Categories::SPK_HARDWARE => match &insert.spk_hardware {},
        Categories::NETWORK => match &insert.network_item {
            Some(net) => {
                let power_bind = serde_json::to_value(net.power.to_owned()).unwrap_or_default();
                let net_conn_bind =
                    serde_json::to_value(net.network_connectivity.to_owned()).unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO network_item (network_id, network_type, poe_ports, max_speed, fiber, network_connectivity, power)
                    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7);",
                        net.network_id,
                        net.network_type,
                        net.poe_ports,
                        net.max_speed,
                        net.fiber,
                        net_conn_bind,
                        power_bind
                )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::RADIO => match &insert.radio_item {
            Some(radio) => {
                let transmitter_bind =
                    serde_json::to_value(radio.transmitter.to_owned()).unwrap_or_default();
                let receiver_bind =
                    serde_json::to_value(radio.reciever.to_owned()).unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO rf_item (rf_id, physical_range, lower_frequency_response, upper_frequency_response, transmitter, receiver)
                    VALUES (?1, ?2, ?3, ?4, ?5, ?6);",
                        radio.rf_id,
                        radio.physical_range,
                        radio.lower_frequency_response,
                        radio.upper_frequency_response,
                        transmitter_bind,
                        receiver_bind
                    )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
        Categories::MICROPHONES => match &insert.microphone {
            Some(ref microphone) => {
                let mic_type_bind =
                    serde_json::to_value(microphone.microphone_type.to_owned()).unwrap_or_default();
                let insertion_results = sqlx::query!("INSERT INTO microphone_item (microphone_id, max_spl, phantom, low_cut, pad, diaphragm_size, output_impedance, frequency_response, connector, microphone_type)
                    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10);",
                        microphone.microphone_id,
                        microphone.max_spl,
                        microphone.phantom,
                        microphone.low_cut,
                        microphone.pad,
                        microphone.diaphragm_size,
                        microphone.output_impedance,
                        microphone.frequency_response,
                        microphone.connector,
                        mic_type_bind
                )
                        .execute(pool)
                        .await;
                sqlite_error_handler(insertion_results)
            }
            None => Ok(SqlResult::AcceptableError("Nothing to Add")),
        },
    }
}

// Not sure why a clone is required for the db_state
// #[tauri::command]
// pub async fn insert_multiple_items(
//     json_inserts: Vec<serde_json::Value>,
//     db_state: State<'_, DatabasePool>,
// ) -> Result<(), ()> {
//     let mut results: Vec<Result<SqlResult, SqliteCustomError>> = vec![];
//     for insert in json_inserts {
//         // let ref parsed = serde_json::from_value::<Item>(*insert).unwrap();
//         results.push(insert_single_item(insert, db_state.clone()).await)
//     }
//     Ok(())
// }

// #[cfg(test)]
// mod tests {
//     use mockall::automock;

//     use super::*;
//     use crate::entities::structs::*;
// use sqlx::Database;
//     #[tokio::test]
//     async fn test_insert_single_item() {
//         let mut mock = MockStructConvert::new();
//         insert_single_item(insert, pool).await;
//     }
// }
