/*
  Warnings:

  - You are about to drop the column `emailResponsible` on the `MotelPartner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `MotelPartner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `MotelPartner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MotelPartner_emailResponsible_key";

-- AlterTable
ALTER TABLE "MotelPartner" DROP COLUMN "emailResponsible",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MotelPartner_email_key" ON "MotelPartner"("email");
