/*
  Warnings:

  - You are about to drop the column `RepresentanteLegalMotelId` on the `Motel` table. All the data in the column will be lost.
  - You are about to drop the `RepresentanteLegalMotel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `legalRepresentativeMotelId` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Motel" DROP CONSTRAINT "Motel_RepresentanteLegalMotelId_fkey";

-- AlterTable
ALTER TABLE "Motel" DROP COLUMN "RepresentanteLegalMotelId",
ADD COLUMN     "legalRepresentativeMotelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "RepresentanteLegalMotel";

-- CreateTable
CREATE TABLE "LegalRepresentativeMotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identificationCard" TEXT NOT NULL,
    "root" TEXT NOT NULL,

    CONSTRAINT "LegalRepresentativeMotel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LegalRepresentativeMotel_identificationCard_key" ON "LegalRepresentativeMotel"("identificationCard");

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_legalRepresentativeMotelId_fkey" FOREIGN KEY ("legalRepresentativeMotelId") REFERENCES "LegalRepresentativeMotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
