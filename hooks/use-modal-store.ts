import { PositionColumn } from "@/components/layouts/position/column";
import { Department, Employee, Payroll } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createDepartment" | "editDepartment" | "deleteDepartment" | "createPosition" | "editPosition"| "deletePosition";

interface ModalData {
  department?: Department | null
  departments?: Department[]
  postion?: PositionColumn
  employee?: Employee
  payroll?: Payroll
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
