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
    use std::{
        fs::{self},
        path::PathBuf,
    };
    use tauri::api::dialog;

    #[tauri::command]
    pub fn greet(name: &str) -> String {
        format!("Hello, {}! You've been greeted from Rust!", name)
    }

    #[tauri::command]
    pub fn save_as_file(file_path: Option<&str>, data: Value) {
        println!("Here is your data: {:?}", data);
        match file_path {
            Some(path) => {
                let data_str = match serde_json::to_string_pretty(&data) {
                    Ok(data_str) => data_str,
                    Err(error) => {
                        println!("Failed to convert data to JSON string: {}", error);
                        return;
                    }
                };

                let path_buf = PathBuf::from(path);
                let path_str = match path_buf.to_str() {
                    Some(path_str) => path_str,
                    None => {
                        println!("Invalid file path: {:?}", path_buf);
                        return;
                    }
                };

                match fs::write(path_str, data_str) {
                    Ok(_) => println!("Data successfully saved to file at path: {}", path_str),
                    Err(error) => {
                        println!(
                            "Failed to save data to file at path {}: {}",
                            path_str, error
                        );
                    }
                }
            }
            None => {
                dialog::FileDialogBuilder::new().save_file(move |ref file| {
                    if let Some(ref file_path) = file {
                        let path_buf = PathBuf::from(file_path);
                        let path_str = match path_buf.to_str() {
                            Some(path_str) => path_str,
                            None => {
                                println!("Invalid file path: {:?}", path_buf);
                                return;
                            }
                        };

                        match fs::write(path_str, data.to_string()) {
                            Ok(_) => {
                                println!("Data successfully saved to file at path: {}", path_str)
                            }
                            Err(error) => {
                                println!(
                                    "Failed to save data to file at path {}: {}",
                                    path_str, error
                                );
                                dialog::MessageDialogBuilder::new(
                                    "File Writing Error",
                                    format!("File error at menu line: 79. Error: {}", error),
                                );
                            }
                        }
                    }
                });
            }
        }
    }

    /// Open File `tarui::command`
    ///
    ///
    #[tauri::command(async)]
    pub fn open_project(path: Option<&str>) -> String {
        match path {
            Some(file_path) => match fs::read_to_string(file_path) {
                Ok(contents) => contents,
                Err(error) => {
                    dialog::MessageDialogBuilder::new(
                        "File Open Error",
                        format!("File Error: Problem with provided path: `{file_path}` .\n Error message: {error}"),
                    )
                    .kind(dialog::MessageDialogKind::Error)
                    .show(|_| ());
                    "".to_string()
                }
            },
            None => {
                if let Some(path) = dialog::blocking::FileDialogBuilder::new()
                    .set_title("Open File")
                    .add_filter("Project File Extensions", &["dae", "json", "txt"])
                    .pick_file()
                {
                    match fs::read_to_string(path) {
                        Ok(contents) => contents,
                        Err(_) => "".to_string(),
                    }
                } else {
                    "None".to_string()
                }
            }
        }
    }

    #[cfg(test)]
    mod tests {

        use fs;
        use serde_json::json;

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

        #[test]
        fn test_open_project() {
            // Test that the function returns the file contents when provided a valid file path
            let path = "test.txt";
            fs::write(path, "test").unwrap();
            assert_eq!(open_project(Some(path)), "test");

            // Clean up
            fs::remove_file(path).unwrap();
        }

        // #[test]
        // fn test_save_as_file() {
        //     let data = json!({
        //         "test_key": "test_value"
        //     });

        //     let data2 = json!({
        //         "test_key": "test_value"
        //     });

        //     // Test that the function saves the data to the provided file path
        //     let path = "test.json";

        //     save_as_file(Some(path), data);
        //     assert_eq!(
        //         fs::read_to_string(path).unwrap(),
        //         "{\n  \"test_key\": \"test_value\"\n}"
        //     );

        //     // Test that the function does not throw an error when no file path is provided
        //     save_as_file(None, data2);

        //     // Clean up
        //     fs::remove_file(path).unwrap();
        // }

        #[test]
        fn test_save_as_file() {
            let test_data = json!({
                "key1": "value1",
                "key2": "value2",
                "key3": "value3"
            });
            let test_file_path = "test_file.json";

            // Test saving to file with provided file path
            save_as_file(Some(test_file_path), test_data.clone());
            let saved_data = fs::read_to_string(test_file_path);
            assert_eq!(
                saved_data.unwrap(),
                serde_json::to_string_pretty(&test_data).unwrap()
            );

            fs::remove_file(test_file_path).unwrap();
        }
    }
}
