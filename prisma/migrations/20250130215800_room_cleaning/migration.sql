-- CreateEnum
CREATE TYPE "StatusRoom" AS ENUM ('AVAILABLE', 'IN_SERVICE', 'CLEANING', 'DISABLED');

-- AlterEnum
ALTER TYPE "ApprovalStatus" ADD VALUE 'DISABLED';

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "status" "StatusRoom" NOT NULL DEFAULT 'AVAILABLE',
ALTER COLUMN "roomNumber" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "RoomCleaning" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomCleaning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomCleaning_roomId_key" ON "RoomCleaning"("roomId");

-- AddForeignKey
ALTER TABLE "RoomCleaning" ADD CONSTRAINT "RoomCleaning_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
