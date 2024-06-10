/*
  Warnings:

  - You are about to drop the column `condition` on the `ProductSupport` table. All the data in the column will be lost.
  - You are about to drop the column `outcome` on the `ProductSupport` table. All the data in the column will be lost.
  - Added the required column `process` to the `ProductSupport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSupport" DROP COLUMN "condition",
DROP COLUMN "outcome",
ADD COLUMN     "process" TEXT NOT NULL,
ADD COLUMN     "resolution" TEXT,
ALTER COLUMN "status" DROP NOT NULL;
