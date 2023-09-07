import { initDB, closeDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";
let db;

export async function GET(req: NextRequest) {
  try {
    db = await initDB();
    const activities = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM activity", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    console.log(JSON.stringify(activities));
    return NextResponse.json(activities, {
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
