/*
  Warnings:

  - You are about to drop the `amenitiesRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "amenitiesRoom" DROP CONSTRAINT "amenitiesRoom_roomId_fkey";

-- DropTable
DROP TABLE "amenitiesRoom";

-- CreateTable
CREATE TABLE "AmenitiesRoom" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "amenitiesRoomlInfoId" TEXT,

    CONSTRAINT "AmenitiesRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesRoomlInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AmenitiesRoomlInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmenitiesRoomlInfo_name_key" ON "AmenitiesRoomlInfo"("name");

-- AddForeignKey
ALTER TABLE "AmenitiesRoom" ADD CONSTRAINT "AmenitiesRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesRoom" ADD CONSTRAINT "AmenitiesRoom_amenitiesRoomlInfoId_fkey" FOREIGN KEY ("amenitiesRoomlInfoId") REFERENCES "AmenitiesRoomlInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
