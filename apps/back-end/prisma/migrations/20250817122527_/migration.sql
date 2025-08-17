/*
  Warnings:

  - You are about to drop the column `gameId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_gameId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "gameId" INTEGER,
ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "gameId";

-- DropTable
DROP TABLE "public"."Games";

-- CreateTable
CREATE TABLE "public"."Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "mechanics" TEXT[],
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minPlayers" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PostsOnGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostsOnGames_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostsOnGames_B_index" ON "public"."_PostsOnGames"("B");

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PostsOnGames" ADD CONSTRAINT "_PostsOnGames_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PostsOnGames" ADD CONSTRAINT "_PostsOnGames_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
