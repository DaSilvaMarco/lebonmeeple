-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "gameId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Games" (
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

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;
