/*
  Warnings:

  - You are about to drop the `_allowancetopayrolllist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_deductiontopayrolllist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `allowances` to the `PayrollList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductions` to the `PayrollList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_allowancetopayrolllist` DROP FOREIGN KEY `_AllowanceToPayrollList_A_fkey`;

-- DropForeignKey
ALTER TABLE `_allowancetopayrolllist` DROP FOREIGN KEY `_AllowanceToPayrollList_B_fkey`;

-- DropForeignKey
ALTER TABLE `_deductiontopayrolllist` DROP FOREIGN KEY `_DeductionToPayrollList_A_fkey`;

-- DropForeignKey
ALTER TABLE `_deductiontopayrolllist` DROP FOREIGN KEY `_DeductionToPayrollList_B_fkey`;

-- AlterTable
ALTER TABLE `payrolllist` ADD COLUMN `allowances` VARCHAR(191) NOT NULL,
    ADD COLUMN `deductions` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_allowancetopayrolllist`;

-- DropTable
DROP TABLE `_deductiontopayrolllist`;
