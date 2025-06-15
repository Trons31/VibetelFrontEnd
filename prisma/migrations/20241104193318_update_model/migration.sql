/*
  Warnings:

  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservationAddTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservationItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('reservation', 'noReservation');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('en_espera', 'iniciado', 'completado', 'cancelado', 'no_iniciado');

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationAddTime" DROP CONSTRAINT "ReservationAddTime_reservationItemId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationItem" DROP CONSTRAINT "ReservationItem_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationItem" DROP CONSTRAINT "ReservationItem_roomId_fkey";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "ReservationAddTime";

-- DropTable
DROP TABLE "ReservationItem";

-- DropEnum
DROP TYPE "ReservationStatus";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "phoneNumber" TEXT,
    "mail" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "ServiceType" NOT NULL,
    "userId" TEXT,
    "transactionId" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "promoPrice" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "extraServices" DOUBLE PRECISION,
    "accessCode" TEXT,
    "status" "ServiceStatus" NOT NULL DEFAULT 'en_espera',
    "serviceTaken" BOOLEAN NOT NULL DEFAULT false,
    "dateTaken" TIMESTAMP(3),
    "userConfirmServiceCompleted" BOOLEAN NOT NULL DEFAULT false,
    "dateUserConfirmServiceCompleted" TIMESTAMP(3),
    "serviceCompleted" BOOLEAN NOT NULL DEFAULT false,
    "dateComplete" TIMESTAMP(3),
    "canceledReservation" BOOLEAN NOT NULL DEFAULT false,
    "dateCanceledReservation" TIMESTAMP(3),
    "surchargeActive" BOOLEAN NOT NULL DEFAULT false,
    "surchargeAmount" INTEGER NOT NULL DEFAULT 0,
    "surchargePaid" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceAddTime" (
    "id" TEXT NOT NULL,
    "addTimeReservation" INTEGER NOT NULL,
    "newDepartureDate" TIMESTAMP(3),
    "total" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceItemId" TEXT NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "ServiceAddTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItem_serviceId_key" ON "ServiceItem"("serviceId");

-- CreateIndex
CREATE INDEX "ServiceItem_accessCode_idx" ON "ServiceItem"("accessCode");

-- CreateIndex
CREATE INDEX "ServiceItem_roomId_serviceId_idx" ON "ServiceItem"("roomId", "serviceId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAddTime" ADD CONSTRAINT "ServiceAddTime_serviceItemId_fkey" FOREIGN KEY ("serviceItemId") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
