/*
  Warnings:

  - You are about to drop the column `lightSourceId` on the `Scene` table. All the data in the column will be lost.
  - Added the required column `lightSourcesId` to the `Scene` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Scene" DROP CONSTRAINT "Scene_lightSourceId_fkey";

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "lightSourceId",
ADD COLUMN     "lightSourcesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_lightSourcesId_fkey" FOREIGN KEY ("lightSourcesId") REFERENCES "LightSources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
