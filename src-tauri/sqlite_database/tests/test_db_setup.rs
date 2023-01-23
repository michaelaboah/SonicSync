use std::fs;

use sqlite_database::error_handling::{SqliteCustomError, SqliteErrorKind};
use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};

#[test]
fn test_find_db() {
    let resource_path = "tests/testing_resources/test.db";
    let find_db = std::path::Path::new(resource_path).exists();
    assert!(find_db);
}

#[tokio::test]
async fn test_recover_wrong_db() {
    let resource_path = "tests/testing_resources/test.db";
    let db_path = "test/testing_resources/wrong.db";
    let built_pool = init_db_mock(db_path, resource_path).await;
    assert!(Some(built_pool).is_some());
    // println!("{:#?}", pool);
}

#[tokio::test]
async fn test_equal_err_kind() {
    let resource_path = "tests/testing_resources/test.db";
    let db_path = "test/testing_resources/wrong.db";
    let pool = match SqlitePoolOptions::new()
        .max_connections(5)
        .connect(db_path)
        .await
    {
        Ok(pool) => (),
        Err(e) => {
            let does_match = matches!(
                SqliteCustomError::from(e).error_kind,
                SqliteErrorKind::MissingDatabaseFile
            );
            assert!(does_match);
        }
    };
}
/// Mock database initialization
///
async fn init_db_mock(db_path: &str, resource_path: &str) -> Pool<Sqlite> {
    let pool = match SqlitePoolOptions::new()
        .max_connections(5)
        .connect(db_path)
        .await
    {
        // Happy Path err_count = 0
        Ok(sqlite_pool) => sqlite_pool,
        Err(pool_err) => {
            if matches!(
                SqliteCustomError::from(pool_err).error_kind,
                SqliteErrorKind::MissingDatabaseFile
            ) {
                match fs::copy(resource_path, db_path) {
                    Ok(bytes) => {
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
                        thing
                    }
                    Err(err) => {
                        // Unhappy Path, fs::copy is uncessesful. Log then panic
                        eprintln!("fs copy err{err}");
                        panic!("The database is faulty, exiting program");
                        // Err(err)
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
