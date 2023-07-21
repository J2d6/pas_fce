/*
  Warnings:

  - Added the required column `emailClient` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "nomClient" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contactClient" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL
);
INSERT INTO "new_Client" ("contactClient", "idClient", "nomClient") SELECT "contactClient", "idClient", "nomClient" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
