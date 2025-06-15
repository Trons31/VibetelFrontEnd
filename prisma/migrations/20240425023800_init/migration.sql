/*
  Warnings:

  - You are about to drop the column `garageId` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `motelId` on the `Bedroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_garageId_fkey";

-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_motelId_fkey";

-- AlterTable
ALTER TABLE "Bedroom" DROP COLUMN "garageId",
DROP COLUMN "motelId";
