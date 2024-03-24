import { Department, Employee, Payroll, Position } from "@prisma/client";
import { date } from "zod";
import { create } from "zustand";

export type ModalType = "createDepartment" | "editDepartment" | "deleteDepartment" | "createPosition" | "editPosition"| "deletePosition" | "createEmployee";

interface ModalData {
  department?: Department | null
  departments?: Department[]
  positions?: Position[]
  position?: Position
  employee?: Employee
  payroll?: Payroll
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  setData: (data: ModalData) => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  setData: (data = {}) =>  set({data})
}));
