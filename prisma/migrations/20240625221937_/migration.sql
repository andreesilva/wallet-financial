/*
  Warnings:

  - A unique constraint covering the columns `[partnerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Account_partnerId_key` ON `Account`(`partnerId`);
