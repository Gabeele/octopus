/*
  Warnings:

  - You are about to drop the column `support_comments_id` on the `ProductSupport` table. All the data in the column will be lost.
  - Added the required column `productSupportId` to the `SupportComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductSupport" DROP CONSTRAINT "ProductSupport_support_comments_id_fkey";

-- AlterTable
ALTER TABLE "ProductSupport" DROP COLUMN "support_comments_id";

-- AlterTable
ALTER TABLE "SupportComments" ADD COLUMN     "productSupportId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SupportComments" ADD CONSTRAINT "SupportComments_productSupportId_fkey" FOREIGN KEY ("productSupportId") REFERENCES "ProductSupport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
