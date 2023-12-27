/*
  Warnings:

  - A unique constraint covering the columns `[name,location]` on the table `LightSources` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LightSources_name_location_key" ON "LightSources"("name", "location");
