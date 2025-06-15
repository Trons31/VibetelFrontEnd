/*
  Warnings:

  - Added the required column `motelId` to the `Bedroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bedroom" ADD COLUMN     "motelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Motel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "inService" BOOLEAN NOT NULL DEFAULT true,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" INTEGER NOT NULL,
    "numberOfRooms" INTEGER DEFAULT 0,
    "amenities" TEXT[],

    CONSTRAINT "Motel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotelImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "motelId" TEXT NOT NULL,

    CONSTRAINT "MotelImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motel_title_key" ON "Motel"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Motel_slug_key" ON "Motel"("slug");

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotelImage" ADD CONSTRAINT "MotelImage_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
