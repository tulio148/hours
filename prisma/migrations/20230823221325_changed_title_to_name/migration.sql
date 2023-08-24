/*
  Warnings:

  - You are about to drop the column `title` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `name` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hours" INTEGER NOT NULL,
    "created" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Activity_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("authorId", "created", "description", "hours", "id") SELECT "authorId", "created", "description", "hours", "id" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
