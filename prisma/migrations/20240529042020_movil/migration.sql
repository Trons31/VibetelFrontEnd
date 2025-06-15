-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "transactionId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ReservationMovil" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paidAt" TIMESTAMP(3),
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "ReservationMovil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservationMovil" ADD CONSTRAINT "ReservationMovil_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
