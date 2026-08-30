/*
  Warnings:

  - You are about to drop the `_friendRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_friendRequests" DROP CONSTRAINT "_friendRequests_A_fkey";

-- DropForeignKey
ALTER TABLE "_friendRequests" DROP CONSTRAINT "_friendRequests_B_fkey";

-- DropTable
DROP TABLE "_friendRequests";

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
