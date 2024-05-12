import { EmployeeColumn } from "@/components/layouts/employee/column";
import {
  Allowance,
  Deduction,
  Department,
  Payroll,
  Position,
} from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createDepartment"
  | "editDepartment"
  | "deleteDepartment"
  | "createPosition"
  | "editPosition"
  | "deletePosition"
  | "createEmployee"
  | "editEmployee"
  | "deleteEmployee"
  | "employeeDetail"
  | "createAllowance"
  | "editAllowance"
  | "deleteAllowance"
  | "createDeduction"
  | "editDeduction"
  | "deleteDeduction"
  | "employeeAllowance"
  | "employeeDeduction"
  | "createPayroll";

interface ModalData {
  department?: Department | null;
  departments?: Department[];
  positions?: Position[];
  position?: Position;
  employee?: EmployeeColumn;
  allowance?: Allowance;
  allowances?: Allowance[];
  deduction?: Deduction;
  deductions?: Deduction[];
  payroll?: Payroll;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  setData: (data: ModalData) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  setData: (data = {}) => set({ data }),
}));
