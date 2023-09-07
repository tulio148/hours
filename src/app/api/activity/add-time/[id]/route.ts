import { initDB, closeDB } from "@/db";
import { NextRequest } from "next/server";
let db = null;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    db = await initDB();
    const hours = await request.json();
    const id = params.id;
    const updateActivity = "UPDATE activity SET hours = hours + ? WHERE id = ?";

    db.run(updateActivity, [hours, id]);

    return new Response("hours updated successfully!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error occurred.", { status: 500 });
  } finally {
    if (db) {
      await closeDB();
    }
  }
}
