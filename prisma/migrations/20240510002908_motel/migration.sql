/*
  Warnings:

  - You are about to drop the column `amenitiesMotelId` on the `Motel` table. All the data in the column will be lost.
  - Added the required column `motelId` to the `AmenitiesMotel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Motel" DROP CONSTRAINT "Motel_amenitiesMotelId_fkey";

-- AlterTable
ALTER TABLE "AmenitiesMotel" ADD COLUMN     "motelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Motel" DROP COLUMN "amenitiesMotelId";

-- AddForeignKey
ALTER TABLE "AmenitiesMotel" ADD CONSTRAINT "AmenitiesMotel_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
