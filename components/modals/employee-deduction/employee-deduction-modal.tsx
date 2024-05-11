"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Deduction, EmployPayType } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { getDeductionById } from "@/lib/utils";
import { EmployeeDeductionSchema } from "@/schemas";
import CellAction from "./cell-action";
import { columns } from "./column";
import { newEmployeeDeduction } from "@/actions/employee-deduction/new-employee-deduction";

export type EmployeDeductionData = {
  deductionId: string;
  deductionName: string;
  salaryType: EmployPayType;
  amount: string;
};

const EmployeeDeductionModal = () => {
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState<EmployeDeductionData[]>([]);
  const [loading, startTransition] = useTransition();

  const { isOpen, type, onClose, data } = useModal();
  const { deductions, employee } = data;

  const isModalOpen = isOpen && type == "employeeDeduction";

  const form = useForm<z.infer<typeof EmployeeDeductionSchema>>({
    resolver: zodResolver(EmployeeDeductionSchema),
    defaultValues: {
      deductionId: "",
      salaryType: EmployPayType.Once,
      amount: "",
    },
  });

  const handleDelete = (rowIndex: number) => {
    const newArr = [...employeeData];
    newArr.splice(rowIndex, 1);
    setEmployeeData(newArr);
  };

  const newColumns: ColumnDef<EmployeDeductionData>[] = [
    ...columns,
    {
      id: "action",
      cell: ({ row }) => (
        <CellAction
          data={row.original}
          onDelete={() => handleDelete(row.index)}
        />
      ),
      header: "Action",
    },
  ];

  const onSubmit = (values: z.infer<typeof EmployeeDeductionSchema>) => {
    form.reset();
    const deduction = getDeductionById(values.deductionId, deductions);
    const newData: EmployeDeductionData = {
      deductionId: JSON.stringify(deduction?.id),
      deductionName: deduction?.deduction as string,
      salaryType: values.salaryType,
      amount: values.amount,
    };
    setEmployeeData([newData, ...employeeData]);
  };

  const submitData = async () => {
    form.reset();
    setEmployeeData([]);

    startTransition(() => {
      newEmployeeDeduction(employeeData, employee?.id as number)
        .then((data) => {
          toast.error(data.error);
          if (data.success) {
            toast.success(data.success);
            onClose();
            router.refresh();
          }
        })
        .catch((err) => console.log(err));
    });
  };

  let name =
    `${data.employee?.employee_no} - ${data.employee?.firstName} ${data.employee?.lastName}` ||
    "";

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={`New Deduction for ${name}`}
      className="max-w-3xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 px-6">
            <div className="flex items-center gap-x-20">
              <FormField
                name="deductionId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deductions</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Deduction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deductions?.map((deduction: Deduction) => (
                          <SelectItem
                            key={deduction.id}
                            value={JSON.stringify(deduction.id)}
                          >
                            {deduction.deduction}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="salaryType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(EmployPayType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-8">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="w-96"
                        type="text"
                        placeholder="Enter amount"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-8">
                <Button type="submit">Add to List</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Separator />
      <div className="px-6 w-[720px]">
        <DataTable
          data={employeeData}
          searchkey="deduction"
          columns={newColumns}
        />
      </div>
      <DialogFooter className="bg-zinc-300 px-6 py-4">
        <Button disabled={loading} onClick={submitData}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogFooter>
    </Modal>
  );
};

export default EmployeeDeductionModal;
