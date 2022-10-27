pub mod events {}

pub mod commands {
    use std::{
        fs::{self, File},
        io::Error,
    };

    use tauri;
    #[tauri::command]
    pub fn greet(name: &str) -> String {
        format!("Hello, {}! You've been greeted from Rust!", name)
    }

    #[tauri::command]
    pub fn save_as_file(file_path: &str, data: String) -> () {
        println!("The file path is: {file_path}, and data: {data}");
        fs::write(file_path, data).expect("didn't write")
        // implement a dialog error on error
    }
}
