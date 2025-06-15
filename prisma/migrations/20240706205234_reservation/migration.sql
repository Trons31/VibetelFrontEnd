/*
  Warnings:

  - The values [pendiente] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('en_espera', 'iniciado', 'en_servicio', 'completado', 'no_iniciado');
ALTER TABLE "ReservationItem" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ReservationItem" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "ReservationStatus_old";
ALTER TABLE "ReservationItem" ALTER COLUMN "status" SET DEFAULT 'en_espera';
COMMIT;

-- DropIndex
DROP INDEX "Room_roomNumber_key";

-- AlterTable
ALTER TABLE "ReservationItem" ADD COLUMN     "accessCode" TEXT,
ADD COLUMN     "canceledReservation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateCanceledReservation" TIMESTAMP(3),
ADD COLUMN     "dateComplete" TIMESTAMP(3),
ADD COLUMN     "dateTaken" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'en_espera';
