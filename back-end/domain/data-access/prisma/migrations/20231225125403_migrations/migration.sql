/*
  Warnings:

  - A unique constraint covering the columns `[name,location]` on the table `LightSources` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LightSources" ALTER COLUMN "brightness" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "admin" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "LightSources_name_location_key" ON "LightSources"("name", "location");
