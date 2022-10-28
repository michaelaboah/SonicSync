pub mod events {}

pub mod commands {
    use std::{
        fs::{self, File},
        io::Error,
    };

    use tauri::api::dialog;
    #[tauri::command]
    pub fn greet(name: &str) -> String {
        format!("Hello, {}! You've been greeted from Rust!", name)
    }

    #[tauri::command]
    pub fn save_as_file<'a>(file_path: Option<&str>, data: &str) -> () {
        match file_path {
            Some(path) => fs::write(path, data).unwrap(),
            None => dialog::FileDialogBuilder::new().save_file(move |ref f| {
                if let Some(ref file_path) = f {
                    if let Err(error) = fs::write(file_path, "data") {
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
