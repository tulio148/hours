import sqlite3 from "sqlite3";

const dbPath = "./db.db";

let db: sqlite3.Database | null;

async function initDB(): Promise<sqlite3.Database> {
  if (!db) {
    db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error("SQLite error:", err.message);
        } else {
          console.log("Connected to the SQLite database");
        }
      }
    );

    db.serialize(() => {
      db!.run(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT
        );
      `);
      db!.run(`
        CREATE TABLE IF NOT EXISTS activity (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          hours INTEGER
        );
      `);
    });
  }
  return db;
}

async function closeDB(): Promise<void> {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Closed the database connection");
      }
    });
    db = null;
  }
}

export { initDB, closeDB };
