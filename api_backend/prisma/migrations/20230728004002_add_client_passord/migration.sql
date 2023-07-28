/*
  Warnings:

  - Added the required column `passwordClient` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "nomClient" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contactClient" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL,
    "passwordClient" TEXT NOT NULL
);
INSERT INTO "new_Client" ("contactClient", "emailClient", "idClient", "nomClient") SELECT "contactClient", "emailClient", "idClient", "nomClient" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_contactClient_key" ON "Client"("contactClient");
CREATE UNIQUE INDEX "Client_emailClient_key" ON "Client"("emailClient");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
