/*
  Warnings:

  - You are about to drop the column `arrivalHour` on the `ReservationMovil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReservationMovil" DROP COLUMN "arrivalHour",
ALTER COLUMN "arrivalDate" SET DATA TYPE TEXT,
ALTER COLUMN "departureDate" SET DATA TYPE TEXT;
