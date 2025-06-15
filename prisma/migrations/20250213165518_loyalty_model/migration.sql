/*
  Warnings:

  - You are about to drop the column `timeOffService` on the `MotelConfig` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "StatusRoom" ADD VALUE 'SERVICE_COMPLETED';

-- AlterTable
ALTER TABLE "MotelConfig" DROP COLUMN "timeOffService",
ADD COLUMN     "locationLatitude" DOUBLE PRECISION,
ADD COLUMN     "locationLongitude" DOUBLE PRECISION,
ADD COLUMN     "outOfServiceEnd" TIMESTAMP(3),
ADD COLUMN     "outOfServiceStart" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ServiceItem" ADD COLUMN     "customServiceTime" INTEGER;

-- CreateTable
CREATE TABLE "Loyalty" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "monthlyBookings" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastBooking" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loyalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Loyalty_userId_key" ON "Loyalty"("userId");

-- AddForeignKey
ALTER TABLE "Loyalty" ADD CONSTRAINT "Loyalty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
