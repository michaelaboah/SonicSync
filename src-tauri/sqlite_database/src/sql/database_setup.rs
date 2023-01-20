use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use tokio::sync::Mutex;
pub struct DatabasePool(pub Mutex<Pool<Sqlite>>);
impl DatabasePool {
    pub fn new(pool: Mutex<Pool<Sqlite>>) -> Self {
        Self(pool)
    }
}

#[tokio::main]
pub async fn initialize_db(path: &str) -> Result<DatabasePool, Box<dyn std::error::Error>> {
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(path)
        .await?;

    let schema = std::fs::read_to_string(
        "../src-tauri/sqlite_database/src/schema_resources/internal-schema.sql",
    )
    .unwrap();
    sqlx::query(&schema).execute(&pool).await;
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
