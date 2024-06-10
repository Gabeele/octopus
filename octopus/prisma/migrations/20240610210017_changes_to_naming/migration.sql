/*
  Warnings:

  - You are about to drop the column `type` on the `ProductSupport` table. All the data in the column will be lost.
  - Added the required column `supportType` to the `ProductSupport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSupport" DROP COLUMN "type",
ADD COLUMN     "condition" TEXT,
ADD COLUMN     "supportType" TEXT NOT NULL;
