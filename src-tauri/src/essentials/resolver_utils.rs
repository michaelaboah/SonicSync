// use log::{log, Level};
use std::{fs, io, path};
use tauri;
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
pub fn find_resource(
    resource_path: &str,
    app: &mut tauri::App,
) -> Result<path::PathBuf, io::Error> {
    match app.path_resolver().resolve_resource(resource_path) {
        Some(path) => match path.try_exists() {
            Ok(_) => {
                // log!(Level::Info, "Path does exist: {}", &path.to_str().unwrap());
                Ok(path)
            }
            Err(path_err) => Err(path_err),
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

pub fn find_prod_resource(
    file_name: &str,
    app: &mut tauri::App,
) -> Result<path::PathBuf, io::Error> {
    let thing = app.path_resolver().app_data_dir().map(|app_dir| {
        let appended = app_dir.join(file_name);
        // log!(
        //     Level::Info,
        //     "Found Production Resource: {}",
        //     &appended.to_str().unwrap()
        // );
        appended
    });
    Ok(thing.unwrap())
}
