/*
  Warnings:

  - Added the required column `motelId` to the `Bedroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bedroom" ADD COLUMN     "motelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
