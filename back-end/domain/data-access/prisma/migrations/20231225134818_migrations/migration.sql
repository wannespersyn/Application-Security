/*
  Warnings:

  - You are about to drop the column `lightSourceId` on the `ControlCenter` table. All the data in the column will be lost.
  - Added the required column `controlCenterId` to the `LightSources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ControlCenter" DROP CONSTRAINT "ControlCenter_lightSourceId_fkey";

-- AlterTable
ALTER TABLE "ControlCenter" DROP COLUMN "lightSourceId";

-- AlterTable
ALTER TABLE "LightSources" ADD COLUMN     "controlCenterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LightSources" ADD CONSTRAINT "LightSources_controlCenterId_fkey" FOREIGN KEY ("controlCenterId") REFERENCES "ControlCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
