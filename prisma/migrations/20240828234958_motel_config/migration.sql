/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transactionId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MotelConfig" ADD COLUMN     "defaultReservationAddTime" INTEGER;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "transactionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_transactionId_key" ON "Reservation"("transactionId");
