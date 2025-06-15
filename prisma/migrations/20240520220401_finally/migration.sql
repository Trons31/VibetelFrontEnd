/*
  Warnings:

  - A unique constraint covering the columns `[nit]` on the table `Motel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `CategoryRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nit` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LegalRepresentativeMotel_identificationCard_key";

-- DropIndex
DROP INDEX "Motel_title_key";

-- AlterTable
ALTER TABLE "CategoryRooms" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Motel" ADD COLUMN     "nit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extraServicesActive" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "extraServices" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Motel_nit_key" ON "Motel"("nit");
