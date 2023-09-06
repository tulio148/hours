import { initDB, closeDB } from "@/db";
let db = null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    db = await initDB();

    const { name, description } = body;
    const insertQuery =
      "INSERT INTO activity (name, description) VALUES (?, ?)";

    db.run(insertQuery, [name, description]);

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
