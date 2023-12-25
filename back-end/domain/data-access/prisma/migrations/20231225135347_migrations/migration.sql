/*
  Warnings:

  - You are about to drop the column `sceneId` on the `ControlCenter` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ControlCenter` table. All the data in the column will be lost.
  - Added the required column `controlCenterId` to the `Scene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `controlCenterId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ControlCenter" DROP CONSTRAINT "ControlCenter_sceneId_fkey";

-- DropForeignKey
ALTER TABLE "ControlCenter" DROP CONSTRAINT "ControlCenter_userId_fkey";

-- AlterTable
ALTER TABLE "ControlCenter" DROP COLUMN "sceneId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "controlCenterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "controlCenterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_controlCenterId_fkey" FOREIGN KEY ("controlCenterId") REFERENCES "ControlCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_controlCenterId_fkey" FOREIGN KEY ("controlCenterId") REFERENCES "ControlCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
