use tauri::{async_runtime, Manager};

// use crate::essentials::communication;

pub fn menu_event_handler(event: tauri::WindowMenuEvent) {
    // match event.menu_item_id() {
    //     "save" => communication::events::menu_emit("save", event),
    //     "save_as" => communication::events::menu_emit("save-as", event),
    //     "open" => communication::events::menu_emit("open-project-file", event),
    //     "new" => tauri::api::dialog::MessageDialogBuilder::new(
    //         "File Open Error",
    //         format!("File Error: Problem with provided path, .\n Error message: "),
    //     )
    //     .kind(tauri::api::dialog::MessageDialogKind::Error)
    //     .show(|_| ()),
    //     "palette" => communication::events::menu_emit("toggle-palette", event),
    //     "preferences" => communication::events::menu_emit("open-preferences", event),
    //     "db_json_load" => {
    //         async_runtime::spawn(async move {
    //             sqlite_database::queries::insertions::insert_multiple_items(
    //                 None,
    //                 event.window().state(),
    //             )
    //             .await
    //             .unwrap();
    //         });
    //     }
    //     "Learn More" => {
    //         let _url = "to be implemented".to_string();
    //     }
    //     _ => unimplemented!(),
    // }
}
