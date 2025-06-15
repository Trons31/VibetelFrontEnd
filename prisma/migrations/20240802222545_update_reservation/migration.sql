/*
  Warnings:

  - The values [en_servicio] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `inService` on the `Motel` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `ReservationItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reservationId]` on the table `ReservationItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reservationId` to the `ReservationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceAddTime` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('en_espera', 'iniciado', 'completado', 'cancelado', 'no_iniciado');
ALTER TABLE "ReservationItem" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ReservationItem" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "ReservationStatus_old";
ALTER TABLE "ReservationItem" ALTER COLUMN "status" SET DEFAULT 'en_espera';
COMMIT;

-- DropForeignKey
ALTER TABLE "ReservationItem" DROP CONSTRAINT "ReservationItem_orderId_fkey";

-- DropIndex
DROP INDEX "ReservationItem_orderId_key";

-- AlterTable
ALTER TABLE "Motel" DROP COLUMN "inService";

-- AlterTable
ALTER TABLE "ReservationItem" DROP COLUMN "orderId",
ADD COLUMN     "dateUserConfirmServiceCompleted" TIMESTAMP(3),
ADD COLUMN     "reservationId" TEXT NOT NULL,
ADD COLUMN     "userConfirmServiceCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "priceAddTime" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "MotelConfig" (
    "id" TEXT NOT NULL,
    "timeMinutesCleanRoom" INTEGER,
    "timeHourCleanRoom" INTEGER,
    "inService" BOOLEAN NOT NULL DEFAULT true,
    "timeOffService" TIMESTAMP(3),
    "timeAwaitTakeReservation" INTEGER NOT NULL,
    "motelId" TEXT NOT NULL,

    CONSTRAINT "MotelConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationAddTime" (
    "id" TEXT NOT NULL,
    "addTimeReservation" INTEGER NOT NULL,
    "newDepartureDate" TIMESTAMP(3),
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reservationItemId" TEXT NOT NULL,

    CONSTRAINT "ReservationAddTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReservationItem_reservationId_key" ON "ReservationItem"("reservationId");

-- CreateIndex
CREATE INDEX "ReservationItem_accessCode_idx" ON "ReservationItem"("accessCode");

-- CreateIndex
CREATE INDEX "ReservationItem_roomId_reservationId_idx" ON "ReservationItem"("roomId", "reservationId");

-- CreateIndex
CREATE INDEX "Room_garageId_idx" ON "Room"("garageId");

-- AddForeignKey
ALTER TABLE "MotelConfig" ADD CONSTRAINT "MotelConfig_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationAddTime" ADD CONSTRAINT "ReservationAddTime_reservationItemId_fkey" FOREIGN KEY ("reservationItemId") REFERENCES "ReservationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
