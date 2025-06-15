/*
  Warnings:

  - You are about to drop the column `amenitiesId` on the `Bedroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_amenitiesId_fkey";

-- AlterTable
ALTER TABLE "Bedroom" DROP COLUMN "amenitiesId",
ADD COLUMN     "amenities" TEXT[];
