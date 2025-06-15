/*
  Warnings:

  - You are about to drop the `MotelPartner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Motel" DROP CONSTRAINT "Motel_motelPartnerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "lastname" TEXT;

-- DropTable
DROP TABLE "MotelPartner";

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_motelPartnerId_fkey" FOREIGN KEY ("motelPartnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
