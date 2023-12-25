/*
  Warnings:

  - You are about to drop the column `sceneId` on the `LightSources` table. All the data in the column will be lost.
  - Added the required column `lightSourceId` to the `Scene` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LightSources" DROP CONSTRAINT "LightSources_sceneId_fkey";

-- AlterTable
ALTER TABLE "LightSources" DROP COLUMN "sceneId";

-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "lightSourceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_lightSourceId_fkey" FOREIGN KEY ("lightSourceId") REFERENCES "LightSources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
