/*
  Warnings:

  - Added the required column `freeService` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motel" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "freeService" BOOLEAN NOT NULL;
