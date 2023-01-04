pub mod sql_setup {
    // use sqlx::sqlite::SqlitePool;
    // use tokio::runtime::Runtime;
    use tauri::{App, AppHandle};
    // #[tokio::main]
    // pub async fn initialize_db() -> Result<(), Box<dyn std::error::Error>> {
    //     let pool = SqlitePool::connect("sqlite://test.db").await?;
    //     let mut rt = Runtime::new()?;
    //     rt.block_on(async move {
    //         // Perform database operations using the connection pool
    //     });
    //     Ok(())
    // }

    fn setup_user_db() {}
}
