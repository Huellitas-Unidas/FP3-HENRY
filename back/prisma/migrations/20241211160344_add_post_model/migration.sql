/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.
  - Added the required column `contactInfo` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateLost` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imgUrl",
DROP COLUMN "status",
ADD COLUMN     "contactInfo" TEXT NOT NULL,
ADD COLUMN     "dateLost" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT NOT NULL;
