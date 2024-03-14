/*
  Warnings:

  - You are about to drop the column `retweetby` on the `Retweet` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Retweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_retweetby_fkey";

-- AlterTable
ALTER TABLE "Retweet" DROP COLUMN "retweetby",
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
