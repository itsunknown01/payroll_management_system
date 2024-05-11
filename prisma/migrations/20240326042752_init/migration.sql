/*
  Warnings:

  - Added the required column `amount` to the `EmployeeAllowance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employeeallowance` ADD COLUMN `amount` DOUBLE NOT NULL;
