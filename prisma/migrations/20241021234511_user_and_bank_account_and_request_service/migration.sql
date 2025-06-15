/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Added the required column `accountTypeId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BankAccount_accountNumber_key";

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "accountNumber",
DROP COLUMN "accountType",
DROP COLUMN "bankName",
ADD COLUMN     "accountTypeId" TEXT NOT NULL,
ADD COLUMN     "bankId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "resetPasswordTokenExpiration" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountType" (
    "id" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestServiceInCity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "RequestServiceInCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_name_key" ON "Bank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AccountType_typeName_key" ON "AccountType"("typeName");

-- CreateIndex
CREATE INDEX "RequestServiceInCity_userId_cityId_idx" ON "RequestServiceInCity"("userId", "cityId");

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "AccountType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestServiceInCity" ADD CONSTRAINT "RequestServiceInCity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestServiceInCity" ADD CONSTRAINT "RequestServiceInCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
