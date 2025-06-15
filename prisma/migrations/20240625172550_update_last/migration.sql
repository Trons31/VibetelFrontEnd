/*
  Warnings:

  - A unique constraint covering the columns `[roomNumber]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `whatsapp` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motel" ADD COLUMN     "whatsapp" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LikeRoomByUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "LikeRoomByUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");

-- AddForeignKey
ALTER TABLE "LikeRoomByUser" ADD CONSTRAINT "LikeRoomByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeRoomByUser" ADD CONSTRAINT "LikeRoomByUser_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
