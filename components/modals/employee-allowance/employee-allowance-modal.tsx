"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Allowance, EmployPayType } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";

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
import { getAllowanceById } from "@/lib/utils";
import { EmployeeAllowanceSchema } from "@/schemas";
import CellAction from "./cell-action";
import { columns } from "./column";
import { newEmployeeAllowance } from "@/actions/employee-allowance/new-employee-allowance";

export type EmployeAllowanceData = {
  allowanceId: string;
  allowanceName: string;
  salaryType: EmployPayType;
  amount: string;
};

const EmployeeAllowanceModal = () => {
  const [employeeData, setEmployeeData] = useState<EmployeAllowanceData[]>([]);
  const [loading, startTransition] = useTransition();

  const { isOpen, type, onClose, data } = useModal();
  const { allowances, employee } = data;

  const isModalOpen = isOpen && type == "employeeAllowance";

  const form = useForm<z.infer<typeof EmployeeAllowanceSchema>>({
    resolver: zodResolver(EmployeeAllowanceSchema),
    defaultValues: {
      allowanceId: "",
      salaryType: EmployPayType.Once,
      amount: "",
    },
  });

  const handleDelete = (rowIndex: number) => {
    const newArr = [...employeeData];
    newArr.splice(rowIndex, 1);
    setEmployeeData(newArr);
  };

  const newColumns: ColumnDef<EmployeAllowanceData>[] = [
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

  const onSubmit = (values: z.infer<typeof EmployeeAllowanceSchema>) => {
    form.reset();
    const allowance = getAllowanceById(values.allowanceId, allowances);
    const newData: EmployeAllowanceData = {
      allowanceId: JSON.stringify(allowance?.id),
      allowanceName: allowance?.allowance as string,
      salaryType: values.salaryType,
      amount: values.amount,
    };
    setEmployeeData([newData, ...employeeData]);
  };

  const submitData = async () => {
    form.reset();

    startTransition(() => {
      newEmployeeAllowance(employeeData, employee?.id as number)
        .then((data) => {
          toast.error(data.error);
          if(data.success) {
            toast.success(data.success);
            onClose();
          }
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={`New Allowance for`}
      className="max-w-3xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 px-6">
            <div className="flex items-center gap-x-20">
              <FormField
                name="allowanceId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowances</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Allowance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allowances?.map((allowance: Allowance) => (
                          <SelectItem
                            key={allowance.id}
                            value={JSON.stringify(allowance.id)}
                          >
                            {allowance.allowance}
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
          searchkey="allowance"
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

export default EmployeeAllowanceModal;
