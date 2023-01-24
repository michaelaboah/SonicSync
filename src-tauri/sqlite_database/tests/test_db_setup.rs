use std::{fs, io};

use sqlite_database::error_handling::{SqliteCustomError, SqliteErrorKind};
use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};

#[test]
fn test_find_db() {
    let resource_path = "tests/testing_resources/test.db";
    let find_db = std::path::Path::new(resource_path).exists();
    assert!(find_db);
}

//inprogress
#[tokio::test]
async fn test_recover_wrong_db() {
    let resource_path = "tests/testing_resources/test.db";
    let db_path = "tests/testing_resources/wrong.db";
    let built_pool = init_db_mock(db_path, resource_path).await;
    assert!(built_pool.is_ok());
}

#[tokio::test]
async fn test_bad_path() {
    let resource_path = "tests/testing_resources/test.db";
    let db_path = "test/testing_resources/wrong.db";
    //                     ^^^This is incorrect
    let built_pool = init_db_mock(db_path, resource_path).await;
    assert!(built_pool.is_err());
    let match_kind = matches!(
        built_pool.expect_err("expected").error_kind,
        SqliteErrorKind::MissingDatabaseFile
    );
    assert!(match_kind);
}

#[tokio::test]
async fn test_equal_err_kind() {
    let db_path = "tests/testing_resources/wrong.db";

    let _ = SqlitePoolOptions::new()
        .max_connections(1)
        .connect(db_path)
        .await
        .map_err(|e| {
            let does_match = matches!(
                SqliteCustomError::from(e).error_kind,
                SqliteErrorKind::MissingDatabaseFile
            );
            assert!(does_match);
        });
}

// enum TestError<'a> {
//     SqlError(SqliteCustomError<'a>),
//     IOError(Err),
// }
/// Mock database initialization
///
async fn init_db_mock<'a>(
    db_path: &'a str,
    resource_path: &'a str,
) -> Result<Pool<Sqlite>, SqliteCustomError<'a>> {
    let pool = match SqlitePoolOptions::new()
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
                match fs::copy(resource_path, db_path) {
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
