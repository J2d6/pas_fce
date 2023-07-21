-- CreateTable
CREATE TABLE "Voyage" (
    "idVoyage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateVoyage" DATETIME NOT NULL,
    "destination" TEXT NOT NULL,
    "depart" TEXT NOT NULL,
    "heureDepart" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Train" (
    "numTrain" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nbWagon" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Wagon" (
    "numWagon" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantitePlace" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Categorie" (
    "idCategorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomCaegorie" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "nomClient" TEXT NOT NULL,
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contactClient" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_nomCaegorie_key" ON "Categorie"("nomCaegorie");
