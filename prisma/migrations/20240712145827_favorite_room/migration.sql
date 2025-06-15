/*
  Warnings:

  - You are about to drop the `LikeRoomByUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeRoomByUser" DROP CONSTRAINT "LikeRoomByUser_roomId_fkey";

-- DropForeignKey
ALTER TABLE "LikeRoomByUser" DROP CONSTRAINT "LikeRoomByUser_userId_fkey";

-- DropTable
DROP TABLE "LikeRoomByUser";

-- CreateTable
CREATE TABLE "FavoriteRoomByUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "FavoriteRoomByUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteRoomByUser" ADD CONSTRAINT "FavoriteRoomByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRoomByUser" ADD CONSTRAINT "FavoriteRoomByUser_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
