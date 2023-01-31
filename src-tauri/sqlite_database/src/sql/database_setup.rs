use serde::Deserialize;
use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use std::{fs, io};
use tokio::{io::AsyncWriteExt, sync::Mutex};
// use crate::
use crate::error_handling::{SqliteCustomError, SqliteErrorKind};
#[derive(Debug)]
pub struct DatabasePool(pub Mutex<Pool<Sqlite>>);
impl DatabasePool {
    pub fn new(pool: Mutex<Pool<Sqlite>>) -> Self {
        Self(pool)
    }
}


#[derive(Deserialize)]
struct S3Resource {
    resource_data: Vec<u8>,
}


#[tokio::main]
pub async fn initialize_db(
    local_db_path: &str,
    resource_path: &str,
    schema_path: &str,
) -> Result<DatabasePool, Box<dyn std::error::Error>> {
    let built_pool = init_db(local_db_path, resource_path).await;

    let schema = match std::fs::read_to_string(schema_path) {
        Ok(schema_string) => schema_string,
        Err(err) => {
            println!("{:#?}", err.kind());
            //potentially download from server.
            unimplemented!();
        }
    };

    let pool = built_pool.unwrap();
    sqlx::query(&schema).execute(&pool).await;
    let pool_state = DatabasePool::new(Mutex::new(pool));
    Ok(pool_state)
}

pub async fn init_db<'a>(
    local_db_path: &'a str,
    resource_path: &'a str,
) -> Result<Pool<Sqlite>, SqliteCustomError<'a>> {
    let pool = match sqlite_pool_gen(local_db_path).await {
        // Happy Path err_count = 0
        Ok(sqlite_pool) => Ok(sqlite_pool),
        Err(pool_err) => {
            if matches!(
                SqliteCustomError::from(pool_err).error_kind,
                SqliteErrorKind::MissingDatabaseFile
            ) {
                match fs::copy(resource_path, local_db_path) {
                    Ok(bytes) => {
                        println!("{bytes}");
                        // Happy Path
                        let thing = if bytes > 0 {
                            sqlite_pool_gen(local_db_path).await
                            .map_err(|err| 
                                eprintln!(
                                    "Error: Database failed to connect on the second attempt.\n Error: {err}"
                                )
                            ).expect("Second DB connect failure")
                            // a copy was not necessary
                        } else if bytes == 0 {
                            sqlite_pool_gen(local_db_path).await
                            .map_err(|err| 
                                eprintln!(
                                    "Error: Database failed to connect on the second attempt.\n Error: {err}"
                                )
                            ).expect("Second DB connect failure")
                        } else {
                            const s3_uri: &str =
                                "https://im31veb0e3.execute-api.us-east-1.amazonaws.com/testRust";
                            let response = reqwest::get(s3_uri)
                                .await
                                .unwrap()
                                .json::<S3Resource>()
                                .await;

                            match tokio::fs::File::create(local_db_path).await {
                                Ok(mut created) => created
                                    .write_all(&response.unwrap().resource_data)
                                    .await
                                    .unwrap(),
                                Err(_) => {
                                    todo!()
                                }
                            };

                            sqlite_pool_gen(local_db_path).await
                            .map_err(|err| {
                                eprintln!(
                                    "Error: Database failed to connect on the second attempt.\n Error: {err}"
                                );
                            }).expect("Second DB connect failure")
                            // new_file
                        };
                        Ok(thing)
                    }
                    Err(ref err) => {
                        // Unhappy Path, fs::copy is uncessesful. Log then panic
                        // let err_string = err.to_string();
                        let handled_fs_err = match err.kind() {
                            io::ErrorKind::NotFound => SqliteCustomError::new(
                                14,
                                "Missing Production database file entity, likely a bad path",
                                SqliteErrorKind::MissingDatabaseFile,
                            ),
                            _ => SqliteCustomError::new(
                                666,
                                "Unknown Error",
                                SqliteErrorKind::Unknown(""),
                            ),
                        };
                        Err(handled_fs_err)
                    }
                }
            } else {
                // Err(io::)
                panic!();
            }
        }
    };
    pool
}

async fn sqlite_pool_gen(local_db_path: &str) -> Result<Pool<Sqlite>, sqlx::Error> {
    SqlitePoolOptions::new()
        .max_connections(5)
        .connect(local_db_path)
        .await
}
