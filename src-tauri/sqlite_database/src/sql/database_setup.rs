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
        Ok(sqlite_pool) => Some(sqlite_pool),
        Err(pool_err) => {
            // None
            if matches!(
                SqliteCustomError::from(pool_err).error_kind,
                SqliteErrorKind::MissingDatabaseFile
            ) {
                match std::fs::copy(resource_path, db_path) {
                    Ok(bytes) => {
                        let thing = if bytes == 0 {
                            panic!("The database in resources is empty");
                        } else {
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
                        Some(thing)
                    }
                    Err(err) => {
                        // ""
                        eprintln!("fs copy err{err}");
                        panic!("The database is faulty, exiting program");
                        // None
                    }
                }
            } else {
                None
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
