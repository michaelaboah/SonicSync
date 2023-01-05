pub mod sql_setup {
    use std::{error, fs, io, path::PathBuf};
    use tauri::{App, AppHandle};
    // use sqlx::sqlite::{self, SqlitePool};
    // use tokio::runtime::Runtime;

    // #[tokio::main]
    // pub async fn initialize_db() -> Result<(), Box<dyn std::error::Error>> {
    //     let pool = sqlite::SqlitePoolOptions::new()
    //         .max_connections(1)
    //         .connect("../src-tauri/resources/sqlite-internal.db")
    //         .await
    //         .expect("Should panic");

    //     let row: (i64,) = sqlx::query_as("SELECT $1")
    //         .bind(150_i64)
    //         .fetch_one(&pool)
    //         .await?;

    //     println!("{:#?}", row);

    //     Ok(())
    // }

    /// Sets up the database for the application.
    /// # Arguments
    /// * `app` - A mutable reference to the Tauri application object.
    /// # Returns
    /// * `Ok(())` if the database was set up successfully.
    /// * `Err(err)` if there was an error setting up the database, where `err` is the error value.
    /// # Examples
    /// ```
    /// let mut app = tauri::App::new();
    /// setup_database(&mut app).expect("Error setting up database");
    /// ```
    pub fn setup_database(app: &mut tauri::App) -> Result<(), Box<dyn error::Error>> {
        let db_name = "sqlite-internal.db";
        let data_dir = app_dir_insert(db_name, app)
            .expect("Resource: {internal database} not found, missing or renamed");
        let db_exists = std::path::Path::new(&data_dir).exists();
        println!("DB Found?: {db_exists}");
        match db_exists {
            true => Ok(()),
            false => {
                let db_path = find_resource("resources/sqlite-internal.db", app)?;
                fs::copy(&db_path, &data_dir)?;
                Ok(())
            }
        }
    }

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
    pub fn app_dir_insert(insert_path: &str, app: &mut tauri::App) -> Result<PathBuf, io::Error> {
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
    /// let resource_path = find_resource("resources/test_resource", &mut app)
    ///     .expect("Error finding resource");
    /// assert_eq!(resource_path.to_str().unwrap(), "application_resources_dir/test_resource");
    /// ```
    pub fn find_resource(resource_path: &str, app: &mut tauri::App) -> Result<PathBuf, io::Error> {
        match app.path_resolver().resolve_resource(resource_path) {
            Some(path) => match path.try_exists() {
                Ok(true) => {
                    println!("Path does exist: {}", path.to_str().unwrap());
                    Ok(path)
                }
                Ok(false) => {
                    //Potentially download the database from the server.
                    unimplemented!("Database resource does not exist");
                }
                Err(path_err) => Err(path_err),
            },
            None => Err(io::Error::new(
                io::ErrorKind::NotFound,
                format!("Resource Not Found!: path = {resource_path}"),
            )),
        }
    }
}
