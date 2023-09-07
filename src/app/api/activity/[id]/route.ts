import { initDB, closeDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";
let db = null;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    db = await initDB();
    const id = params.id;
    console.log(id);
    const query = `SELECT * FROM activity WHERE id = ?`;
    const activity = await new Promise((resolve, reject) => {
      db.get(query, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    console.log(JSON.stringify(activity));
    return NextResponse.json(activity, {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Error occurred.", { status: 500 });
  } finally {
    if (db) {
      await closeDB();
    }
  }
}
