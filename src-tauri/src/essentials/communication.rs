pub mod events {
    use tauri::api::dialog;
    pub fn emit_save(event_name: &str, event: tauri::WindowMenuEvent) {
        match event.window().emit(event_name, "payload") {
            Ok(_) => {}
            Err(error) => {
                dialog::MessageDialogBuilder::new(
                    "File Save Error",
                    format!("There was a problem saving your file: {:?}", error),
                );
            }
        }
    }
}

pub mod commands {
    use serde_json::Value;
    use std::fs::{self};
    use tauri::api::dialog;

    #[tauri::command]
    pub fn greet(name: &str) -> String {
        format!("Hello, {}! You've been greeted from Rust!", name)
    }

    #[tauri::command]
    pub fn save_as_file(file_path: Option<&str>, data: Value) {
        println!("Here is your data: {:?}", data);
        match file_path {
            Some(path) => fs::write(path, serde_json::to_string_pretty(&data).unwrap()).unwrap(),
            None => dialog::FileDialogBuilder::new().save_file(move |ref file| {
                if let Some(ref file_path) = file {
                    if let Err(error) = fs::write(file_path, data.to_string()) {
                        dialog::MessageDialogBuilder::new(
                            "File Writing Error",
                            format!("File error at menu line: 79. Error: {:?}", error),
                        );
                    }
                }
            }),
        }

        // println!("The file path is: {file_path}, and data: {data}")
        // fs::write(file_path, data).expect("didn't write")
        // implement a dialog error on error
    }
}
