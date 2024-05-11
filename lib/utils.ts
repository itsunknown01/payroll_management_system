import { Allowance, Deduction } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAllowanceName = (
  allowanceId: string,
  allowances: Allowance[] | undefined
) => {
  const name = allowances?.find(
    (allowance) => allowance.id == parseInt(allowanceId)
  );
  return name ? name.allowance : "";
};

export const getAllowanceById = (
  allowanceId: string,
  allowances: Allowance[] | undefined
) => {
  return allowances?.find((allowance) => allowance.id == parseInt(allowanceId));
};

export const getDeductionById = (
  deductionId: string,
  deductions: Deduction[] | undefined
) => {
  return deductions?.find((deduction) => deduction.id == parseInt(deductionId));
};