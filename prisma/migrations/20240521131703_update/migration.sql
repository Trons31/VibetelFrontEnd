/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('pendiente', 'iniciado', 'completado', 'no_iniciado');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_roomId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "surcharge" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "nickName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "promoPrice" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "extraServices" INTEGER,
    "status" "ReservationStatus" NOT NULL DEFAULT 'pendiente',
    "serviceTaken" BOOLEAN NOT NULL DEFAULT false,
    "serviceCompleted" BOOLEAN NOT NULL DEFAULT false,
    "surchargeActive" BOOLEAN NOT NULL DEFAULT false,
    "surchargeAmount" INTEGER NOT NULL DEFAULT 0,
    "surchargePaid" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "ReservationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReservationItem_orderId_key" ON "ReservationItem"("orderId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
