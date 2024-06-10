/*
  Warnings:

  - You are about to drop the `DailyCashFlow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DamagedGood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductWarranty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Return` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VacationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyCashFlow" DROP CONSTRAINT "DailyCashFlow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_adminId_fkey";

-- DropForeignKey
ALTER TABLE "TimeCard" DROP CONSTRAINT "TimeCard_userId_fkey";

-- DropForeignKey
ALTER TABLE "VacationRequest" DROP CONSTRAINT "VacationRequest_userId_fkey";

-- DropTable
DROP TABLE "DailyCashFlow";

-- DropTable
DROP TABLE "DamagedGood";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "ProductWarranty";

-- DropTable
DROP TABLE "Return";

-- DropTable
DROP TABLE "TimeCard";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VacationRequest";

-- CreateTable
CREATE TABLE "ProductSupport" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "outcome" TEXT,
    "dropoff_date" TIMESTAMP(3) NOT NULL,
    "isWholesale" BOOLEAN NOT NULL,
    "phone_number" TEXT,
    "age" TEXT,
    "cca" INTEGER,
    "voltage" INTEGER,
    "hasLoaner" BOOLEAN DEFAULT false,
    "isResolved" BOOLEAN NOT NULL,
    "resolveDate" TIMESTAMP(3),
    "support_comments_id" INTEGER NOT NULL,

    CONSTRAINT "ProductSupport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportComments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "comment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSupport" ADD CONSTRAINT "ProductSupport_support_comments_id_fkey" FOREIGN KEY ("support_comments_id") REFERENCES "SupportComments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
