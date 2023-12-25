-- DropForeignKey
ALTER TABLE "ControlCenter" DROP CONSTRAINT "ControlCenter_lightSourceId_fkey";

-- DropForeignKey
ALTER TABLE "ControlCenter" DROP CONSTRAINT "ControlCenter_sceneId_fkey";

-- DropForeignKey
ALTER TABLE "ControlCenter" DROP CONSTRAINT "ControlCenter_userId_fkey";

-- AlterTable
ALTER TABLE "ControlCenter" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "sceneId" DROP NOT NULL,
ALTER COLUMN "lightSourceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ControlCenter" ADD CONSTRAINT "ControlCenter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlCenter" ADD CONSTRAINT "ControlCenter_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlCenter" ADD CONSTRAINT "ControlCenter_lightSourceId_fkey" FOREIGN KEY ("lightSourceId") REFERENCES "LightSources"("id") ON DELETE SET NULL ON UPDATE CASCADE;
