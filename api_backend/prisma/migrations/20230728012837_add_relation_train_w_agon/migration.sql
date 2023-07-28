-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wagon" (
    "idWagon" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCategorie" INTEGER NOT NULL,
    "numTrain" INTEGER,
    CONSTRAINT "Wagon_idCategorie_fkey" FOREIGN KEY ("idCategorie") REFERENCES "Categorie" ("idCategorie") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wagon_numTrain_fkey" FOREIGN KEY ("numTrain") REFERENCES "Train" ("numTrain") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Wagon" ("idCategorie", "idWagon") SELECT "idCategorie", "idWagon" FROM "Wagon";
DROP TABLE "Wagon";
ALTER TABLE "new_Wagon" RENAME TO "Wagon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
