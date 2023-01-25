use std::{fs, io};

use sqlite_database::error_handling::{SqliteCustomError, SqliteErrorKind};
use sqlite_database::database_setup::init_db;
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
    let built_pool = init_db(db_path, resource_path).await;
    assert!(built_pool.is_ok());
}

#[tokio::test]
async fn test_bad_path() {
    let resource_path = "tests/testing_resources/test.db";
    let db_path = "test/testing_resources/wrong.db";
    //                     ^^^This is incorrect
    let built_pool = init_db(db_path, resource_path).await;
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


#[tokio::test]
async fn test_missing_err() {
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


