"use client";

import { useEffect, useState } from "react";
import { Plus, Trash } from "lucide-react";

import { getEmployeeAllowance } from "@/actions/employee-allowance/get-employee-allowance";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface AllowanceCardData {
  id: number
  allowance: string;
  description: string
}

const AllowanceCard = () => {
  const { onOpen, data } = useModal();
  const { allowances, employee } = data;

  const [allowanceData, setAllowanceData] = useState<AllowanceCardData[]>([]);

  useEffect(() => {
    getEmployeeAllowance(employee?.id as number)
      .then((data) => setAllowanceData(data as AllowanceCardData[]))
      .catch((err) => console.log(err));
  }, [employee?.id]);

  const handleDelete = (id: number) => {

  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between bg-zinc-100">
        <CardTitle className="text-md">Allowances</CardTitle>
        <CardDescription>
          <Button
            className="p-0 px-4 w-full"
            onClick={() =>
              onOpen("employeeAllowance", {
                allowances,
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
          {allowanceData.map((item, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between gap-y-4 border-b-2 pb-2"
            >
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-md font-semibold">
                  {item.allowance}
                </h1>
                <p className=" text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <Button className="p-4" 
              onClick={() => handleDelete(item.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </Card>
      </CardContent>
    </Card>
  );
};

export default AllowanceCard;
