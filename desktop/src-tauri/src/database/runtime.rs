use std::{sync::mpsc, thread};

use polodb_core::Database;
// use polodb_core;

pub enum DBActions {
    Create,
    Read,
    Update,
    Delete,
}

/// Starts the database thread handing back a `Sender<DBActions>` for calling events.
///
/// While this functionality can be created on the main thread in favor of scaling the code base
/// separation seems prudent.
///
///
/// *This function may become an async runtime if/when the embedded database (currently: PoloDB) supports it*
pub fn start_db() -> mpsc::Sender<DBActions> {
    let (tx, rx) = mpsc::channel::<DBActions>();

    let db = Database::open_memory().unwrap();

    thread::spawn(move || {
        while let Ok(cmd) = rx.recv() {
            match cmd {
                DBActions::Create => todo!(),
                DBActions::Read => todo!(),
                DBActions::Update => todo!(),
                DBActions::Delete => todo!(),
            }
        }
    });

    tx
}
