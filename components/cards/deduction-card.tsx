"use client";

import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { getEmployeeDeduction } from "@/actions/employee-deduction/get-employee-deduction";

const data = [
  {
    name: "John Doe",
    email: "john@example.com",
  },
  {
    name: "Rohan Doe",
    email: "rohan@example.com",
  },
];

export interface DeductionCardData {
  id: number;
  deduction: string;
  description: string;
}

const DeductionCard = () => {
  const { onOpen, data } = useModal();
  const { employee, deductions } = data;

  const [deductionData, setDeductionData] = useState<DeductionCardData[]>([]);

  useEffect(() => {
    getEmployeeDeduction(employee?.id as number)
      .then((data) => setDeductionData(data as DeductionCardData[]))
      .catch((err) => console.log(err));
  }, [employee?.id]);

  const handleDelete = (id: number) => {};
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between bg-zinc-100">
        <CardTitle className="text-md">Deductions</CardTitle>
        <CardDescription>
          <Button
            className="p-0 px-4 w-full"
            onClick={() =>
              onOpen("employeeDeduction", {
                deductions,
                employee,
              })
            }
          >
            <Plus className="w-4 h-4" />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="mt-4 w-full flex flex-col items-center justify-center px-6 py-4 gap-y-4">
          {deductionData.map((item, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between gap-y-4 border-b-2 pb-2"
            >
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-md font-semibold">{item.deduction}</h1>
                <p className=" text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <Button className="p-4" onClick={() => handleDelete(item.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </Card>
      </CardContent>
    </Card>
  );
};

export default DeductionCard;
