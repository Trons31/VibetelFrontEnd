-- DropForeignKey
ALTER TABLE "RoomRating" DROP CONSTRAINT "RoomRating_userId_fkey";

-- AlterTable
ALTER TABLE "RoomRating" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RoomRating" ADD CONSTRAINT "RoomRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
