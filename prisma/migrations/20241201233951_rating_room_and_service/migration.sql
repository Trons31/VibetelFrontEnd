-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0;

-- CreateTable
CREATE TABLE "RoomRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoomRating_roomId_idx" ON "RoomRating"("roomId");

-- AddForeignKey
ALTER TABLE "RoomRating" ADD CONSTRAINT "RoomRating_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRating" ADD CONSTRAINT "ServiceRating_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
