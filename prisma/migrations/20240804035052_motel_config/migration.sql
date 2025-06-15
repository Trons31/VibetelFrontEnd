/*
  Warnings:

  - A unique constraint covering the columns `[motelId]` on the table `MotelConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MotelConfig_motelId_key" ON "MotelConfig"("motelId");
