/*
  Warnings:

  - A unique constraint covering the columns `[contactClient]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailClient]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_contactClient_key" ON "Client"("contactClient");

-- CreateIndex
CREATE UNIQUE INDEX "Client_emailClient_key" ON "Client"("emailClient");
