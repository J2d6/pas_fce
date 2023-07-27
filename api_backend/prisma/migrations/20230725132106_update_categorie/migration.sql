/*
  Warnings:

  - Added the required column `designCategorie` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nbPlace` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ptixCategorie` to the `Categorie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categorie" (
    "idCategorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomCaegorie" TEXT NOT NULL,
    "designCategorie" TEXT NOT NULL,
    "nbPlace" INTEGER NOT NULL,
    "ptixCategorie" INTEGER NOT NULL
);
INSERT INTO "new_Categorie" ("idCategorie", "nomCaegorie") SELECT "idCategorie", "nomCaegorie" FROM "Categorie";
DROP TABLE "Categorie";
ALTER TABLE "new_Categorie" RENAME TO "Categorie";
CREATE UNIQUE INDEX "Categorie_nomCaegorie_key" ON "Categorie"("nomCaegorie");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
