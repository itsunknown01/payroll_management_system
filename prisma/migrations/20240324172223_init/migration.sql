/*
  Warnings:

  - Added the required column `salary` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `salary` INTEGER NOT NULL;
