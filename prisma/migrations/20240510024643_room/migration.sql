/*
  Warnings:

  - You are about to drop the column `bedroomId` on the `RoomImage` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `RoomImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomImage" DROP CONSTRAINT "RoomImage_bedroomId_fkey";

-- AlterTable
ALTER TABLE "RoomImage" DROP COLUMN "bedroomId",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RoomImage" ADD CONSTRAINT "RoomImage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
