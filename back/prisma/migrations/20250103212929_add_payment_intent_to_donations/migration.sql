/*
  Warnings:

  - A unique constraint covering the columns `[paymentIntent]` on the table `Donations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentIntent` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Pqr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `Pqr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donations" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "paymentIntent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pqr" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Donations_paymentIntent_key" ON "Donations"("paymentIntent");
