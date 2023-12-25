/*
  Warnings:

  - Added the required column `sceneId` to the `LightSources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LightSources" ADD COLUMN     "sceneId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LightSources" ADD CONSTRAINT "LightSources_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
