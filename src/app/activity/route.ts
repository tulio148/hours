import { initDB, closeDB } from "@/db";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET(req, res) {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await initDB();
    db.serialize(() => {
      db.run(`
            CREATE TABLE IF NOT EXISTS user (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              email TEXT`);
      db.run(
        "INSERT INTO user (name, email) VALUES (?, ?)",
        ["John Doe", "johndoe@example.com"],
        (err) => {
          if (err) {
            console.error(
              "Error inserting data into the user table:",
              err.message
            );
          } else {
            console.log("Data inserted into the user table.");
          }
        }
      );
    });
    // Perform a database query to retrieve all items from the "items" table
    const items = db.all("SELECT * FROM user");

    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(items), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
}
