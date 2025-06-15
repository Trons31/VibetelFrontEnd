-- CreateTable
CREATE TABLE "amenitiesRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "amenitiesRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "amenitiesRoom" ADD CONSTRAINT "amenitiesRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
