"use client";

import AllowanceCard from "@/components/cards/allowance-card";
import DeductionCard from "@/components/cards/deduction-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Modal from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";

export const EmployeeDetailsModal = () => {
  const { type, isOpen, onClose, data } = useModal();

  const isModalOpen = isOpen && type == "employeeDetail";

  const fullName =
    `${data.employee?.firstName} ${data.employee?.middleName} ${data.employee?.lastName}` ||
    "";

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title="Employee Details" className="max-w-4xl">
      <Card className="w-full rounded-none shadow-none">
        <CardHeader className="space-y-2">
          <h1>
            Employee ID:
            <span className=" font-bold ml-2">
              {data.employee?.employee_no}
            </span>
          </h1>
          <h1 className="text-xl">
            Name:
            <span className=" font-bold ml-2">{fullName}</span>
          </h1>
          <h1 className="text-md font-bold">
            Department:
            <span className=" font-bold ml-2">
              {data.employee?.departmentName}
            </span>
          </h1>
          <h1 className="text-md font-bold">
            Position:
            <span className=" font-bold ml-2">
              {data.employee?.positionName}
            </span>
          </h1>
        </CardHeader>
        <Separator />
        <CardContent className="flex items-center justify-between gap-x-8 py-4">
          <AllowanceCard />
          <DeductionCard />
        </CardContent>
      </Card>
    </Modal>
  );
};
