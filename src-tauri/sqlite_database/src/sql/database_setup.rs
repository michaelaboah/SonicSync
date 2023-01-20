pub mod sql_setup {

    use sqlx::sqlite::SqlitePoolOptions;

    #[tokio::main]
    //Should change path from &str to Path or PathBuf

    pub async fn initialize_db(path: &str) -> Result<(), Box<dyn std::error::Error>> {
        let pool = SqlitePoolOptions::new()
            .max_connections(5)
            .connect(path)
            .await?;

        //Ideally
        let schema = std::fs::read_to_string(
            "../src-tauri/sqlite_database/src/schema_resources/internal-schema.sql",
        )
        .unwrap();
        sqlx::query(&schema).execute(&pool).await;
        Ok(())
    }
}

// #[ignore = "async tests are not allowed"]
#[test]
/// ```compile
///     use sqlx;
///     sqlx::query!("Select * from item;")
/// ```
fn check_query_macro() {}
