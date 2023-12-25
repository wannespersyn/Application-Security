/*
  Warnings:

  - You are about to drop the column `lightSourcesId` on the `Scene` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Scene" DROP CONSTRAINT "Scene_lightSourcesId_fkey";

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "lightSourcesId";

-- CreateTable
CREATE TABLE "_LightSourcesToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LightSourcesToScene_AB_unique" ON "_LightSourcesToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_LightSourcesToScene_B_index" ON "_LightSourcesToScene"("B");

-- AddForeignKey
ALTER TABLE "_LightSourcesToScene" ADD CONSTRAINT "_LightSourcesToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "LightSources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LightSourcesToScene" ADD CONSTRAINT "_LightSourcesToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;
