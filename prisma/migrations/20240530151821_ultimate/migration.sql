/*
  Warnings:

  - You are about to drop the `ReservationMovil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReservationMovil" DROP CONSTRAINT "ReservationMovil_roomId_fkey";

-- DropTable
DROP TABLE "ReservationMovil";
