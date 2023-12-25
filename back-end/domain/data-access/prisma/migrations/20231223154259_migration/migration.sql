/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ControlCenter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ControlCenter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `LightSources` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `LightSources` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ControlCenter" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "LightSources" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
