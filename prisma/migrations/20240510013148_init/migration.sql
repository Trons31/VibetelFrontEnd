/*
  Warnings:

  - A unique constraint covering the columns `[emailResponsible]` on the table `MotelPartner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `RepresentanteLegalMotelId` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motel" ADD COLUMN     "RepresentanteLegalMotelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RepresentanteLegalMotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identificationCard" TEXT NOT NULL,
    "root" TEXT NOT NULL,

    CONSTRAINT "RepresentanteLegalMotel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepresentanteLegalMotel_identificationCard_key" ON "RepresentanteLegalMotel"("identificationCard");

-- CreateIndex
CREATE UNIQUE INDEX "MotelPartner_emailResponsible_key" ON "MotelPartner"("emailResponsible");

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_RepresentanteLegalMotelId_fkey" FOREIGN KEY ("RepresentanteLegalMotelId") REFERENCES "RepresentanteLegalMotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
