"use server";

import { db } from "@/lib/db";
import { Allowance, Deduction, Logs, StatusType } from "@prisma/client";

const PayTypeDays: Record<"Monthly" | "Semi_Monthly", number> = {
  Monthly: 22,
  Semi_Monthly: 11,
};

export const calculatePayroll = async (id: number) => {
  const payroll = await db.payroll.findUnique({
    where: { id },
  });

  if (!payroll) {
    return { error: "Payroll not found" };
  }

  await db.payrollList.deleteMany({
    where: { payrollId: id },
  });

  const employees = await db.employee.findMany();

  const dateFrom = new Date(payroll.From);
  const dateTo = new Date(payroll.To);
  const calDays =
    Math.floor(
      (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  for (const employee of employees) {
    const salary = employee.salary;
    const dailyRate = salary / 22;
    const min = dailyRate / 8 / 60;

    let absent = 0;
    let late = 0;
    let present = 0;
    let net = 0;
    let allowAmount = 0;
    let dedAmount = 0;
    const allArr: any[] = [];
    const dedArr: any[] = [];

    for (let i = 0; i < calDays; i++) {
      const date = new Date(dateFrom);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      const attendances = await db.attendance.findMany({
        where: {
          employeeId: employee.id,
          datetimeLog: {
            gte: new Date(dateString + "T00:00:00"),
            lte: new Date(dateString + "T23:59:59"),
          },
        },
        orderBy: {
          datetimeLog: "asc",
        },
      });

      const logs: { [key: string]: Date } = {};

      attendances.forEach((attendance) => {
        logs[attendance.logType] = attendance.datetimeLog;
      });

      if (logs[Logs.AM_IN] && logs[Logs.AM_OUT]) {
        const attmn =
          (logs[Logs.AM_OUT].getTime() - logs[Logs.AM_IN].getTime()) / 6000;
        net += attmn * min;
        late += 240 - attmn;
        present += 0.5;
      }

      if (logs[Logs.PM_IN] && logs[Logs.PM_OUT]) {
        const attmn =
          (logs[Logs.PM_IN].getTime() - logs[Logs.PM_OUT].getTime()) / 6000;
        net += attmn * min;
        late += 240 - attmn;
        present += 0.5;
      }
    }

    const deductions = await db.employeeDeduction.findMany({
      where: {
        employeeId: employee.id,
        OR: [
          {
            salaryType: payroll.type,
          },
          {
            deductionDate: {
              gte: dateFrom,
              lte: dateTo,
            },
          },
        ],
      },
    });

    const allowances = await db.employeeAllowance.findMany({
      where: {
        employeeId: employee.id,
        OR: [
          {
            salaryType: payroll.type,
          },
          {
            allowanceDate: {
              gte: dateFrom,
              lte: dateTo,
            },
          },
        ],
      },
    });

    deductions.forEach((ded) => {
      dedArr.push({
        did: ded.deductionId,
        amount: ded.amount,
      });
      dedAmount += ded.amount;
      net -= ded.amount;
    });

    allowances.forEach((aed) => {
      allArr.push({
        aid: aed.allowanceId,
        amount: aed.amount,
      });
      allowAmount += aed.amount;
      net -= aed.amount;
    });

    const typeDays = PayTypeDays[payroll.type as keyof typeof PayTypeDays];
    absent = typeDays - present;

    await db.payrollList.create({
      data: {
        payrollId: id,
        employeeId: employee.id,
        present,
        absent,
        late: late.toString(),
        salary,
        net,
        allowanceAmount: allowAmount,
        allowances: JSON.stringify(allArr),
        deductionAmount: dedAmount,
        deductions: JSON.stringify(dedArr),
      },
    });
  }

  await db.payroll.update({
    where: { id },
    data: { status: StatusType.Computed },
  });

  return { success: "Payroll Calculated successfully" };
};