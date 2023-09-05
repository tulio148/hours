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
        }
      }
    );
  }
  return db;
}

async function closeDB(): Promise<void> {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      }
    });
    db = null;
  }
}

export { initDB, closeDB };
