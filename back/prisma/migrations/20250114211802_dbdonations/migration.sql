/*
  Warnings:

  - You are about to drop the column `userId` on the `Donations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Donations" DROP CONSTRAINT "Donations_userId_fkey";

-- AlterTable
ALTER TABLE "Donations" DROP COLUMN "userId";
