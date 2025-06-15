/*
  Warnings:

  - You are about to drop the column `amenities` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `extraServices` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `garageId` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `inAvailable` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `motelId` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `promoActive` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `promoPrice` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `roomNumber` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `timeLimit` on the `Bedroom` table. All the data in the column will be lost.
  - You are about to drop the column `bedroomId` on the `BedroomImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_garageId_fkey";

-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_motelId_fkey";

-- DropForeignKey
ALTER TABLE "BedroomImage" DROP CONSTRAINT "BedroomImage_bedroomId_fkey";

-- DropIndex
DROP INDEX "Bedroom_categoryId_idx";

-- DropIndex
DROP INDEX "Bedroom_slug_key";

-- AlterTable
ALTER TABLE "Bedroom" DROP COLUMN "amenities",
DROP COLUMN "extraServices",
DROP COLUMN "garageId",
DROP COLUMN "inAvailable",
DROP COLUMN "motelId",
DROP COLUMN "price",
DROP COLUMN "promoActive",
DROP COLUMN "promoPrice",
DROP COLUMN "roomNumber",
DROP COLUMN "slug",
DROP COLUMN "tags",
DROP COLUMN "timeLimit";

-- AlterTable
ALTER TABLE "BedroomImage" DROP COLUMN "bedroomId";

-- CreateIndex
CREATE INDEX "Bedroom_title_idx" ON "Bedroom"("title");
