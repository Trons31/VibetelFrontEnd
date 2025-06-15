/*
  Warnings:

  - You are about to drop the column `apellido` on the `MotelPartner` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `MotelPartner` table. All the data in the column will be lost.
  - Added the required column `lastname` to the `MotelPartner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MotelPartner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MotelPartner" DROP COLUMN "apellido",
DROP COLUMN "nombre",
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
