// use log::{log, Level};
use std::{
    fs, io,
    path::{self, PathBuf},
};
use tauri::{
    self,
    api::dialog::{blocking, MessageDialogButtons, MessageDialogKind},
};

/// Inserts a path into the application data directory.
/// # Arguments
/// * `insert_path` - The path to insert into the application data directory.
/// * `app` - A mutable reference to the Tauri application object.
/// # Returns
/// * `Ok(path)` if the path was inserted successfully, where `path` is the modified `PathBuf`.
/// * `Err(err)` if there was an error inserting the path, where `err` is the error value.
/// # Examples
/// ```
/// let mut app = tauri::App::new();
/// let inserted_path = app_dir_insert("test_path", &mut app)
///     .expect("Error inserting path into application data directory");
/// assert_eq!(inserted_path.to_str().unwrap(), "application_data_dir/test_path");
/// ```
pub fn app_dir_insert(insert_path: &str, app: &mut tauri::App) -> Result<path::PathBuf, io::Error> {
    match app
        .path_resolver()
        .app_data_dir()
        .map(|path| match path.try_exists() {
            Ok(true) => {
                let appended_path = path.join(insert_path);
                println!("Full Path {}", appended_path.to_str().unwrap());
                Ok(appended_path)
            }
            Ok(false) => match fs::create_dir(&path) {
                Ok(()) => {
                    let appended_path = path.join(insert_path);
                    println!("Full Path {}", appended_path.to_str().unwrap());
                    Ok(appended_path)
                }
                Err(dir_err) => Err(dir_err),
            },

            Err(path_err) => Err(path_err),
        }) {
        Some(generated_path) => generated_path,
        None => Err(io::Error::new(
            io::ErrorKind::NotFound,
            format!("Insert Failed!: path = {insert_path}"),
        )),
    }
}

/// Finds the specified resource.
/// # Arguments
/// * `resource_path` - The path of the resource to find.
/// * `app` - A mutable reference to the Tauri application object.
/// # Returns
/// * `Ok(path)` if the resource was found, where `path` is the `PathBuf` of the resource.
/// * `Err(err)` if there was an error finding the resource, where `err` is the error value.
/// # Examples
/// ```
/// let mut app = tauri::App::new();
/// let resource_path = find_resource("resources/example.txt", &mut app)
///     .expect("Error finding resource");
/// assert_eq!(resource_path.to_str().unwrap(), "application_resources_dir/test_resource");
/// ```
pub fn find_resource(resource_path: &str, app: &mut tauri::App) -> Result<String, io::Error> {
    match app.path_resolver().resolve_resource(resource_path) {
        Some(path) => match path.try_exists() {
            Ok(_) => {
                // log!(Level::Info, "Path does exist: {}", &path.to_str().unwrap());
                let formatted = format!("{}", path.to_str().unwrap());
                Ok(formatted)
            }
            Err(path_err) => match path_err.kind() {
                io::ErrorKind::NotFound => {
                    let found_resource = essential_resource_picker();
                    Ok(found_resource)
                }
                _ => Err(path_err),
            },
        },
        None => {
            //try to download from server.
            Err(io::Error::new(
                io::ErrorKind::NotFound,
                format!("Resource Not Found!: path = {resource_path}"),
            ))
        }
    }
}

/// This function finds the production resource of the given `file_name`.
///
/// # Parameters
///
/// * `file_name` - A string slice that specifies the name of the file to find.
/// * `app` - A mutable reference to the Tauri application instance.
///
/// # Returns
///
/// A `Result` that contains the path to the file in the form of a `String`.
/// In the case where the file is not found in the app's data directory, the
/// function will either point to the file specified by the user or return an
/// error if the file was not found.
///
/// # Errors
///
/// If the app's data directory does not exist, the function will return an
/// error with the kind `io::ErrorKind::NotFound`.
///
/// If the function is unable to find the file, it will return an error with
/// the kind `io::ErrorKind::NotFound` as well.
///
/// # Example
/// ```
/// let file = find_prod_resource("example.txt", &mut app);
/// assert!(file.is_ok());
/// ```
pub fn find_prod_resource(file_name: &str, app: &mut tauri::App) -> Result<String, io::Error> {
    match app.path_resolver().app_data_dir() {
        Some(path) => match path.try_exists() {
            Ok(_) => {
                let appended = path.join(file_name);
                let formatted = format!("{}", appended.to_str().unwrap());
                Ok(formatted)
            }
            Err(path_err) => match path_err.kind() {
                io::ErrorKind::NotFound => {
                    let found_resource = essential_resource_picker();
                    Ok(found_resource)
                }
                _ => Err(path_err),
            },
        },
        None => {
            //try to download from server.
            Err(io::Error::new(
                io::ErrorKind::NotFound,
                format!("Resource Not Found!: File = {file_name}"),
            ))
        }
    }
}

/// This function creates a message dialog and file dialog to pick a database file.
///
/// The function creates a message dialog and file dialog to pick a database file when the original
/// database file is not found. If the user cancels the file dialog, the function exits with status
/// code 0. The path to the selected file is returned as a string.
///
/// # Example
///
/// ```
/// let resource = essential_resource_picker();
/// println!("{}", resource);
/// ```
pub fn essential_resource_picker() -> String {
    let selection: bool = blocking::MessageDialogBuilder::new("Cannot find database.", "There was an issue finding the database file, please point to it in either: \n Macos: /Users/**THIS_USER**/Library/Application Support/Deadalus/resources. \n Windows: %AppData%/Deadalus/resources")
                        .buttons(MessageDialogButtons::OkCancel)
                        .kind(MessageDialogKind::Warning)
                        .show();
    let found_path: PathBuf = match selection {
        true => {
            if let Some(path) = blocking::FileDialogBuilder::new()
                .set_title("Find local database")
                .add_filter("Project File Extensions", &["sql", "db", "txt"])
                .pick_file()
            {
                path
            } else {
                std::process::exit(0)
            }
        }
        false => std::process::exit(0),
    };

    found_path.to_str().unwrap().to_string()
}
