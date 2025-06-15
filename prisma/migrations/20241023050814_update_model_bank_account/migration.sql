/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "accountNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_accountNumber_key" ON "BankAccount"("accountNumber");
