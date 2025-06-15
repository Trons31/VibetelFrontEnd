/*
  Warnings:

  - You are about to drop the column `description` on the `AmenitiesMotel` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AmenitiesMotel` table. All the data in the column will be lost.
  - Added the required column `amenitiesMotelInfoId` to the `AmenitiesMotel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AmenitiesMotel_name_key";

-- AlterTable
ALTER TABLE "AmenitiesMotel" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "amenitiesMotelInfoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AmenitiesMotelInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AmenitiesMotelInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmenitiesMotelInfo_name_key" ON "AmenitiesMotelInfo"("name");

-- AddForeignKey
ALTER TABLE "AmenitiesMotel" ADD CONSTRAINT "AmenitiesMotel_amenitiesMotelInfoId_fkey" FOREIGN KEY ("amenitiesMotelInfoId") REFERENCES "AmenitiesMotelInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
