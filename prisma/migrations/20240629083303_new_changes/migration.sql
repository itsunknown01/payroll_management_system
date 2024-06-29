/*
  Warnings:

  - Added the required column `userId` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `EmployeeDeduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `PayrollList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `employeededuction` ADD COLUMN `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `payrolllist` ADD COLUMN `employeeId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `EmployeeAllowance_employeeId_allowanceId_idx` ON `EmployeeAllowance`(`employeeId`, `allowanceId`);

-- AddForeignKey
ALTER TABLE `PayrollList` ADD CONSTRAINT `PayrollList_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
