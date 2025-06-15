/*
  Warnings:

  - The `isApproved` column on the `Motel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `RoomRating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceId]` on the table `RoomRating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceId]` on the table `ServiceRating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `RoomRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RoomRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ServiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'DATA_CORRECTION');

-- AlterTable
ALTER TABLE "Motel" DROP COLUMN "isApproved",
ADD COLUMN     "isApproved" "ApprovalStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RoomRating" ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceItem" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomRating_userId_key" ON "RoomRating"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomRating_serviceId_key" ON "RoomRating"("serviceId");

-- CreateIndex
CREATE INDEX "RoomRating_serviceId_idx" ON "RoomRating"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRating_serviceId_key" ON "ServiceRating"("serviceId");

-- AddForeignKey
ALTER TABLE "RoomRating" ADD CONSTRAINT "RoomRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRating" ADD CONSTRAINT "RoomRating_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
