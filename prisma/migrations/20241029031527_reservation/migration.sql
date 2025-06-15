/*
  Warnings:

  - You are about to drop the column `nickName` on the `Reservation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING', 'FAILED');

-- DropIndex
DROP INDEX "Reservation_transactionId_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "nickName",
ADD COLUMN     "mail" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "transactionId" DROP NOT NULL;
