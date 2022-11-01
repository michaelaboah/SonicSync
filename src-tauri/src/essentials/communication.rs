pub mod events {
    use tauri::api::dialog;
    pub fn menu_emit(event_name: &str, event: tauri::WindowMenuEvent) -> () {
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
    }

    /// Open File `tarui::command`
    ///
    ///
    #[tauri::command(async)]
    pub fn open_project(path: Option<&str>) -> String {
        match path {
            Some(file_path) => fs::read_to_string(file_path).unwrap(),
            None => {
                if let Some(path) = dialog::blocking::FileDialogBuilder::new().pick_file() {
                    fs::read_to_string(path).unwrap()
                } else {
                    format!("None")
                }
            }
        }

        // if let file = file_path {
        //     fs::read_to_string(file_path).unwrap();
        // } else {
        //     dialog::FileDialogBuilder::new().pick_file(|f| println!("{:?}", fs::read_to_string(f).unwrap()))
        // }
        // file
    }

    #[cfg(test)]
    mod tests {

        use super::*;
        #[test]
        fn test_open_file_path() {
            let test_txt = open_project(Some("/Users/michaelaboah/Documents/Programming/Sound Tools/Deadalus-Tauri/test/test.txt"));
            assert_eq!("test", test_txt)
        }
        #[test]
        fn test_open_file_dialog() {
            let text_txt = open_project(None);
            assert_eq!("well there isn't a path for now", text_txt)
        }
    }
}
