/*
  Warnings:

  - The primary key for the `Wagon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numWagon` on the `Wagon` table. All the data in the column will be lost.
  - You are about to drop the column `quantitePlace` on the `Wagon` table. All the data in the column will be lost.
  - Added the required column `idCategorie` to the `Wagon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idWagon` to the `Wagon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wagon" (
    "idWagon" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCategorie" INTEGER NOT NULL,
    CONSTRAINT "Wagon_idCategorie_fkey" FOREIGN KEY ("idCategorie") REFERENCES "Categorie" ("idCategorie") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Wagon";
ALTER TABLE "new_Wagon" RENAME TO "Wagon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
