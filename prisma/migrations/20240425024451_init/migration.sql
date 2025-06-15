/*
  Warnings:

  - Added the required column `garageId` to the `Bedroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bedroom" ADD COLUMN     "garageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
