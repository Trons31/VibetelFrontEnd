/*
  Warnings:

  - Added the required column `timeLimit` to the `ReservationMovil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReservationMovil" ADD COLUMN     "arrivalDate" TIMESTAMP(3),
ADD COLUMN     "arrivalHour" TIMESTAMP(3),
ADD COLUMN     "departureDate" TIMESTAMP(3),
ADD COLUMN     "serviceCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "serviceTaken" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeLimit" INTEGER NOT NULL;
