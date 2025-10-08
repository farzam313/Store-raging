/*
  Warnings:

  - You are about to drop the column `content` on the `review` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `content`,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL;
