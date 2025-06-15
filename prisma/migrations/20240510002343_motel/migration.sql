/*
  Warnings:

  - You are about to drop the column `direccion` on the `Motel` table. All the data in the column will be lost.
  - Added the required column `address` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motel" DROP COLUMN "direccion",
ADD COLUMN     "address" TEXT NOT NULL;
