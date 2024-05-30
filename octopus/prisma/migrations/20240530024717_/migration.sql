/*
  Warnings:

  - You are about to drop the column `batteryDate` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `batteryDetails` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `currentVoltage` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `customerType` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Return` table. All the data in the column will be lost.
  - Added the required column `battery` to the `Return` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Return` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Return` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voltage` to the `Return` table without a default value. This is not possible if the table is not empty.
  - Made the column `cca` on table `Return` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Return" DROP COLUMN "batteryDate",
DROP COLUMN "batteryDetails",
DROP COLUMN "currentVoltage",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
DROP COLUMN "customerType",
DROP COLUMN "returnDate",
ADD COLUMN     "archivedDate" TIMESTAMP(3),
ADD COLUMN     "battery" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "voltage" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "cca" SET NOT NULL;
