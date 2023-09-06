import { initDB, closeDB } from "@/db";
import { currentUser } from "@clerk/nextjs";
let db = null;

export async function POST(request: Request) {
  try {
    db = await initDB();

    const body = await request.json();
    const { name, description } = body;

    const user = await currentUser();
    const { firstName, lastName, emailAddresses } = user!;
    const email = emailAddresses[0].emailAddress;

    // Immediately invoked anonymous function that checks if a user exists in the database
    // and inserts them if they don't exist.
    (async () => {
      try {
        const checkUserQuery = "SELECT email FROM user WHERE email = ?";
        db.all(checkUserQuery, [email], async (err, rows) => {
          if (err) {
            console.error(err);
            return;
          }
          if (rows.some((row) => row.email === email)) {
            console.log("User exists:", email);
          } else {
            const insertUser =
              "INSERT INTO user (first_name, last_name, email) VALUES (?, ?, ?)";
            await db.run(insertUser, [firstName, lastName, email]);
            console.log("User added:", email);
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    })();

    const insertActivity =
      "INSERT INTO activity (name, description) VALUES (?, ?)";
    db.run(insertActivity, [name, description]);

    return new Response("Data inserted successfully!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error occurred.", { status: 500 });
  } finally {
    if (db) {
      await closeDB();
    }
  }
}
