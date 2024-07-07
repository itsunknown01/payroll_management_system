import { AttendanceColumn } from "@/components/layouts/attendance/column";
import { EmployeeColumn } from "@/components/layouts/employee/column";
import { PayrollColumn } from "@/components/layouts/payroll/column";
import { PayrollListColumn } from "@/components/layouts/payroll/payroll_list/columns";
import { UserColumn } from "@/components/layouts/users/columns";
import {
  Allowance,
  Deduction,
  Department,
  Employee,
  Payroll,
  Position
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
  | "createPayroll"
  | "editPayroll"
  | "deletePayroll"
  | "viewPayroll"
  | "createAttendance"
  |"createUser"
  | "editUser"
  | "deleteUser"
  ;

interface ModalData {
  department?: Department | null;
  departments?: Department[];
  positions?: Position[];
  position?: Position;
  employee?: EmployeeColumn;
  employees?: Employee[]
  allowance?: Allowance;
  allowances?: Allowance[];
  deduction?: Deduction;
  deductions?: Deduction[];
  payroll?: Payroll | null ;
  payrollList?: PayrollListColumn;
  attendance?: AttendanceColumn
  user?: UserColumn
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
