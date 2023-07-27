/*
  Warnings:

  - You are about to drop the column `designCategorie` on the `Categorie` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categorie" (
    "idCategorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomCaegorie" TEXT NOT NULL,
    "nbPlace" INTEGER NOT NULL,
    "ptixCategorie" INTEGER NOT NULL
);
INSERT INTO "new_Categorie" ("idCategorie", "nbPlace", "nomCaegorie", "ptixCategorie") SELECT "idCategorie", "nbPlace", "nomCaegorie", "ptixCategorie" FROM "Categorie";
DROP TABLE "Categorie";
ALTER TABLE "new_Categorie" RENAME TO "Categorie";
CREATE UNIQUE INDEX "Categorie_nomCaegorie_key" ON "Categorie"("nomCaegorie");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
