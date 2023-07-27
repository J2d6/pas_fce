/*
  Warnings:

  - You are about to drop the column `nomCaegorie` on the `Categorie` table. All the data in the column will be lost.
  - You are about to drop the column `ptixCategorie` on the `Categorie` table. All the data in the column will be lost.
  - Added the required column `nomCategorie` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixCategorie` to the `Categorie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categorie" (
    "idCategorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomCategorie" TEXT NOT NULL,
    "nbPlace" INTEGER NOT NULL,
    "prixCategorie" INTEGER NOT NULL
);
INSERT INTO "new_Categorie" ("idCategorie", "nbPlace") SELECT "idCategorie", "nbPlace" FROM "Categorie";
DROP TABLE "Categorie";
ALTER TABLE "new_Categorie" RENAME TO "Categorie";
CREATE UNIQUE INDEX "Categorie_nomCategorie_key" ON "Categorie"("nomCategorie");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
