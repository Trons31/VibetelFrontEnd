/*
  Warnings:

  - You are about to drop the column `arrivalDate` on the `ReservationMovil` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ReservationMovil` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `ReservationMovil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReservationMovil" DROP COLUMN "arrivalDate",
DROP COLUMN "createdAt",
DROP COLUMN "paidAt";
