/*
  Warnings:

  - You are about to drop the column `address` on the `Motel` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Motel` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Amenities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bedroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BedroomImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[motelPartnerId]` on the table `Motel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amenitiesMotelId` to the `Motel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `Motel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Motel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Motel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Motel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motelPartnerId` to the `Motel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Motel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_garageId_fkey";

-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_motelId_fkey";

-- DropForeignKey
ALTER TABLE "BedroomImage" DROP CONSTRAINT "BedroomImage_bedroomId_fkey";

-- AlterTable
ALTER TABLE "Motel" DROP COLUMN "address",
DROP COLUMN "location",
ADD COLUMN     "amenitiesMotelId" TEXT NOT NULL,
ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "countryId" TEXT NOT NULL,
ADD COLUMN     "departmentId" TEXT NOT NULL,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "motelPartnerId" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Amenities";

-- DropTable
DROP TABLE "Bedroom";

-- DropTable
DROP TABLE "BedroomImage";

-- CreateTable
CREATE TABLE "AmenitiesMotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AmenitiesMotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "promoActive" BOOLEAN NOT NULL DEFAULT false,
    "promoPrice" DOUBLE PRECISION,
    "slug" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "inAvailable" BOOLEAN NOT NULL DEFAULT true,
    "timeLimit" INTEGER NOT NULL DEFAULT 0,
    "roomNumber" INTEGER NOT NULL,
    "extraServices" DOUBLE PRECISION NOT NULL DEFAULT 2000,
    "amenities" TEXT[],
    "categoryId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "motelId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "bedroomId" TEXT NOT NULL,

    CONSTRAINT "RoomImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotelPartner" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "emailResponsible" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "MotelPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "nickName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "extraServices" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmenitiesMotel_name_key" ON "AmenitiesMotel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Room_slug_key" ON "Room"("slug");

-- CreateIndex
CREATE INDEX "Room_categoryId_idx" ON "Room"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_key" ON "OrderItem"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Motel_motelPartnerId_key" ON "Motel"("motelPartnerId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "Motel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomImage" ADD CONSTRAINT "RoomImage_bedroomId_fkey" FOREIGN KEY ("bedroomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_amenitiesMotelId_fkey" FOREIGN KEY ("amenitiesMotelId") REFERENCES "AmenitiesMotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motel" ADD CONSTRAINT "Motel_motelPartnerId_fkey" FOREIGN KEY ("motelPartnerId") REFERENCES "MotelPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
