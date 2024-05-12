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

export const formatDate = (dateString: Date) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};