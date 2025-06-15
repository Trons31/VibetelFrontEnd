-- CreateTable
CREATE TABLE "CategoryRooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bedroom" (
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
    "categoryId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "amenitiesId" TEXT NOT NULL,

    CONSTRAINT "Bedroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryRooms_name_key" ON "CategoryRooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_name_key" ON "Amenities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_name_key" ON "Garage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bedroom_slug_key" ON "Bedroom"("slug");

-- CreateIndex
CREATE INDEX "Bedroom_categoryId_idx" ON "Bedroom"("categoryId");

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedroom" ADD CONSTRAINT "Bedroom_amenitiesId_fkey" FOREIGN KEY ("amenitiesId") REFERENCES "Amenities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
