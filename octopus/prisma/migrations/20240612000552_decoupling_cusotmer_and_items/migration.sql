/*
  Warnings:

  - You are about to drop the column `productSupportId` on the `SupportComments` table. All the data in the column will be lost.
  - You are about to drop the `ProductSupport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticketId` to the `SupportComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SupportComments" DROP CONSTRAINT "SupportComments_productSupportId_fkey";

-- AlterTable
ALTER TABLE "SupportComments" DROP COLUMN "productSupportId",
ADD COLUMN     "ticketId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductSupport";

-- CreateTable
CREATE TABLE "ProductSupportTicket" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "dropoff_date" TIMESTAMP(3) NOT NULL,
    "isWholesale" BOOLEAN NOT NULL,
    "phone_number" TEXT,

    CONSTRAINT "ProductSupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSupportItems" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "supportType" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "status" TEXT,
    "age" TEXT,
    "cca" INTEGER,
    "voltage" DOUBLE PRECISION,
    "hasLoaner" BOOLEAN NOT NULL DEFAULT false,
    "isResolved" BOOLEAN NOT NULL,
    "resolveDate" TIMESTAMP(3),
    "resolution" TEXT,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "ProductSupportItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSupportItems" ADD CONSTRAINT "ProductSupportItems_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ProductSupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportComments" ADD CONSTRAINT "SupportComments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ProductSupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
