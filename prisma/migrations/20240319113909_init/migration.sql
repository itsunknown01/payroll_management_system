-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `employee_no` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,
    `positionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_id_key`(`id`),
    UNIQUE INDEX `Employee_employee_no_key`(`employee_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll` (
    `id` VARCHAR(191) NOT NULL,
    `refNo` VARCHAR(191) NOT NULL,
    `From` DATETIME(3) NOT NULL,
    `To` DATETIME(3) NOT NULL,
    `type` ENUM('Monthly', 'Semi_Monthly') NOT NULL DEFAULT 'Monthly',
    `status` ENUM('New', 'Computed') NOT NULL DEFAULT 'New',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payroll_id_key`(`id`),
    UNIQUE INDEX `Payroll_refNo_key`(`refNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deduction` (
    `id` VARCHAR(191) NOT NULL,
    `deduction` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Deduction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Allowance` (
    `id` VARCHAR(191) NOT NULL,
    `allowance` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Allowance_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayrollList` (
    `id` VARCHAR(191) NOT NULL,
    `payrollId` VARCHAR(191) NOT NULL,
    `present` INTEGER NOT NULL,
    `absent` INTEGER NOT NULL,
    `late` VARCHAR(191) NOT NULL,
    `salary` DOUBLE NOT NULL,
    `allowanceAmount` DOUBLE NOT NULL,
    `deductionAmount` DOUBLE NOT NULL,
    `net` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PayrollList_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeAllowance` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `allowanceId` VARCHAR(191) NOT NULL,
    `salaryType` ENUM('Monthly', 'Semi_Monthly', 'Once') NOT NULL DEFAULT 'Once',
    `allowanceDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EmployeeAllowance_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeDeduction` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `deductionId` VARCHAR(191) NOT NULL,
    `salaryType` ENUM('Monthly', 'Semi_Monthly', 'Once') NOT NULL DEFAULT 'Once',
    `deductionDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EmployeeDeduction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `logType` ENUM('AM_IN', 'AM_OUT', 'PM_IN', 'PM_OUT') NOT NULL DEFAULT 'AM_IN',
    `datetimeLog` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Attendance_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DeductionToPayrollList` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DeductionToPayrollList_AB_unique`(`A`, `B`),
    INDEX `_DeductionToPayrollList_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AllowanceToPayrollList` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AllowanceToPayrollList_AB_unique`(`A`, `B`),
    INDEX `_AllowanceToPayrollList_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PayrollList` ADD CONSTRAINT `PayrollList_payrollId_fkey` FOREIGN KEY (`payrollId`) REFERENCES `Payroll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeAllowance` ADD CONSTRAINT `EmployeeAllowance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeAllowance` ADD CONSTRAINT `EmployeeAllowance_allowanceId_fkey` FOREIGN KEY (`allowanceId`) REFERENCES `Allowance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeDeduction` ADD CONSTRAINT `EmployeeDeduction_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeDeduction` ADD CONSTRAINT `EmployeeDeduction_deductionId_fkey` FOREIGN KEY (`deductionId`) REFERENCES `Deduction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DeductionToPayrollList` ADD CONSTRAINT `_DeductionToPayrollList_A_fkey` FOREIGN KEY (`A`) REFERENCES `Deduction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DeductionToPayrollList` ADD CONSTRAINT `_DeductionToPayrollList_B_fkey` FOREIGN KEY (`B`) REFERENCES `PayrollList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AllowanceToPayrollList` ADD CONSTRAINT `_AllowanceToPayrollList_A_fkey` FOREIGN KEY (`A`) REFERENCES `Allowance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AllowanceToPayrollList` ADD CONSTRAINT `_AllowanceToPayrollList_B_fkey` FOREIGN KEY (`B`) REFERENCES `PayrollList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
