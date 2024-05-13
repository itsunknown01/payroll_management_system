"use client";

import { AttendanceData } from "@/components/modals/attendance/columns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/hooks/use-modal-store";
import { getEmployeeName } from "@/lib/utils";
import { AttendanceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logs } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AttendanceFormModalProps {
  attendanceData: any;
  setAttendanceData: any;
  loading: boolean
}

const AttendanceFormModal = ({
  attendanceData,
  setAttendanceData,
  loading
}: AttendanceFormModalProps) => {
  const { data } = useModal();
  const { employees } = data;

  const form = useForm<z.infer<typeof AttendanceSchema>>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: {
      employeeId: "",
      type: Logs.AM_IN,
      date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AttendanceSchema>) => {
    form.reset();
    const employeeName = getEmployeeName(values.employeeId, employees)
    let newData: AttendanceData = {
      employeeId: values.employeeId,
      name: employeeName,
      type: values.type,
      date: values.date,
    };

    setAttendanceData([newData, ...attendanceData]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 px-6">
          <div className="flex items-center gap-x-20">
            <FormField
              name="employeeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees?.map((employee) => {
                        let name = `${employee.lastName}, ${employee.firstName} ${employee.middleName}`;
                        return (
                          <SelectItem
                            key={employee.id}
                            value={JSON.stringify(employee.id)}
                          >
                            {`${name} | ${employee.employee_no}`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Logs).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Enter your date"
                      {...field}
                      disabled={loading}
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
  );
};

export default AttendanceFormModal;
