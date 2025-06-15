-- CreateTable
CREATE TABLE "BedroomImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "bedroomId" TEXT NOT NULL,

    CONSTRAINT "BedroomImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BedroomImage" ADD CONSTRAINT "BedroomImage_bedroomId_fkey" FOREIGN KEY ("bedroomId") REFERENCES "Bedroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
