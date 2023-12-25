/*
  Warnings:

  - Added the required column `name` to the `ControlCenter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ControlCenter" ADD COLUMN     "name" TEXT NOT NULL;
