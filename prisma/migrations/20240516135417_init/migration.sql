-- AlterTable
ALTER TABLE "Motel" ALTER COLUMN "amenities" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
