import EmployeeClient from "@/components/layouts/employee/client";
import { EmployeeColumn } from "@/components/layouts/employee/column";
import { db } from "@/lib/db";
import { auth } from "@/services/next-auth/auth";
import React from "react";

const EmployeePage = async () => {
  const departments = await db.department.findMany();

  const positions = await db.position.findMany();

  const employees = await db.employee.findMany({
    include: {
      department: true,
      position: true,
    },
  });

  const allowances = await db.allowance.findMany();
  const deductions = await db.deduction.findMany();
  const formattedData: EmployeeColumn[] = employees.map((item) => ({
    id: item.id,
    userId: item.userId,
    employee_no: item.employee_no,
    firstName: item.firstName,
    middleName: item.middleName,
    lastName: item.lastName,
    departmentId: item.departmentId,
    departmentName: item.department.name,
    positionId: item.positionId,
    positionName: item.position.name,
    salary: item.salary,
  }));

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <EmployeeClient
          data={formattedData}
          departments={departments}
          positions={positions}
          allowances={allowances}
          deductions={deductions}
        />
      </div>
    </div>
  );
};

export default EmployeePage;
