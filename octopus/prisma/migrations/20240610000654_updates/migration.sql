-- DropForeignKey
ALTER TABLE "ProductSupport" DROP CONSTRAINT "ProductSupport_support_comments_id_fkey";

-- AlterTable
ALTER TABLE "ProductSupport" ALTER COLUMN "voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "support_comments_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductSupport" ADD CONSTRAINT "ProductSupport_support_comments_id_fkey" FOREIGN KEY ("support_comments_id") REFERENCES "SupportComments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
