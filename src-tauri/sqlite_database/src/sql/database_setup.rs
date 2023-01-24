use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use tokio::sync::Mutex;

use crate::error_handling::{SqliteCustomError, SqliteErrorKind};
#[derive(Debug)]
pub struct DatabasePool(pub Mutex<Pool<Sqlite>>);
impl DatabasePool {
    pub fn new(pool: Mutex<Pool<Sqlite>>) -> Self {
        Self(pool)
    }
}

#[tokio::main]
pub async fn initialize_db(
    db_path: &str,
    resource_path: &str,
    schema_path: &str,
) -> Result<DatabasePool, Box<dyn std::error::Error>> {
    let built_pool = match SqlitePoolOptions::new()
        .max_connections(5)
        .connect(db_path)
        .await
    {
        // Happy Path err_count = 0
        Ok(sqlite_pool) => Ok(sqlite_pool),
        Err(pool_err) => {
            if matches!(
                SqliteCustomError::from(pool_err).error_kind,
                SqliteErrorKind::MissingDatabaseFile
            ) {
                match std::fs::copy(resource_path, db_path) {
                    Ok(bytes) => {
                        println!("{bytes}");
                        let thing = if bytes == 0 {
                            // Unhappy path, packaged db_resource is empty. Can attempt to download from server
                            panic!("The database in resources is empty");
                        } else {
                            // Happy Path err_count = 1
                            // if copy is sucessful but connection error panic
                            SqlitePoolOptions::new()
                                .max_connections(5)
                                .connect(db_path)
                                .await
                                .map_err(|err| {
                                    eprintln!(
                                        "Error: Database failed to connect on the second attempt.\n Error: {err}"
                                    );
                                }).expect("Second DB connect failure")
                        };
                        Ok(thing)
                    }
                    Err(ref err) => {
                        // Unhappy Path, fs::copy is uncessesful. Log then panic
                        // let err_string = err.to_string();
                        let handled_fs_err = match err.kind() {
                            std::io::ErrorKind::NotFound => SqliteCustomError::new(
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

    let schema = match std::fs::read_to_string(schema_path) {
        Ok(schema_string) => schema_string,
        Err(err) => {
            //potentially download from server.
            unimplemented!();
        }
    };

    let pool = built_pool.unwrap();
    sqlx::query(&schema).execute(&pool).await;
    let pool_state = DatabasePool::new(Mutex::new(pool));
    Ok(pool_state)
}

// #[ignore = "async tests are not allowed"]
#[test]
/// ```compile
///     use sqlx;
///     sqlx::query!("Select * from item;")
/// ```
fn check_query_macro() {}
