/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Bedroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `garageId` to the `Bedroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motelId` to the `Bedroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Bedroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Bedroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedroomId` to the `BedroomImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bedroom_title_idx";

-- AlterTable
ALTER TABLE "Bedroom" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "extraServices" DOUBLE PRECISION NOT NULL DEFAULT 2000,
ADD COLUMN     "garageId" TEXT NOT NULL,
ADD COLUMN     "inAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "motelId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "promoActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "promoPrice" DOUBLE PRECISION,
ADD COLUMN     "roomNumber" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "timeLimit" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "BedroomImage" ADD COLUMN     "bedroomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bedroom_slug_key" ON "Bedroom"("slug");

-- CreateIndex
CREATE INDEX "Bedroom_categoryId_idx" ON "Bedroom"("categoryId");

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedroomImage" ADD CONSTRAINT "BedroomImage_bedroomId_fkey" FOREIGN KEY ("bedroomId") REFERENCES "Bedroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
