use crate::sql::entities::creation_structs::*;
use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use std::{fs, io, path};
use tauri::App;
use tokio::sync::Mutex;
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
    schema_path: &str,
) -> Result<DatabasePool, Box<dyn std::error::Error>> {
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(db_path)
        .await?;
    //"../src-tauri/sqlite_database/src/schema_resources/internal-schema.sql",
    let schema = std::fs::read_to_string(schema_path).unwrap();

    // sqlx::query(&schema).execute(&pool).await;

    let test = DatabasePool::new(Mutex::new(pool));
    Ok(test)
}

// #[ignore = "async tests are not allowed"]
#[test]
/// ```compile
///     use sqlx;
///     sqlx::query!("Select * from item;")
/// ```
fn check_query_macro() {}
