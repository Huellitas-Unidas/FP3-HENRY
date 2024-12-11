-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "petType" TEXT NOT NULL,
    "dateLost" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "photoUrl" TEXT,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);
