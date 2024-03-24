"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { editEmployee } from "@/actions/employee/edit-employee";
import { Button } from "@/components/ui/button";
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
import { useModal } from "@/hooks/use-modal-store";
import { EmployeeSchema } from "@/schemas";

const EditEmployeeModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const { departments, positions, employee } = data;

  const isModalOpen = isOpen && type == "editEmployee";

  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      departmentId: "",
      positionId: "",
      salary: "",
    },
  });

  useEffect(() => {
    if (employee) {
      form.setValue("firstname", employee.firstName);
      form.setValue("middlename", employee.middleName);
      form.setValue("lastname", employee.lastName);
      form.setValue("departmentId", String(employee.departmentId));
      form.setValue("positionId", String(employee.positionId));
      form.setValue("salary", employee.salary.toString());
    }
  }, [employee, form]);

  const OnSubmit = async (values: z.infer<typeof EmployeeSchema>) => {
    form.reset();
    startTransition(() => {
      editEmployee(values, employee?.id).then((data) => {
        toast.error(data.error);
        toast.success(data.success);
      });
    });

    router.refresh();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Create Employee">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
          <div className="px-6 space-y-4">
            <FormField
              name="firstname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="middlename"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your middle name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="departmentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departments</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select department"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments?.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={JSON.stringify(department.id)}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="positionId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Positions</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select position"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positions?.map((position) => (
                        <SelectItem
                          key={position.id}
                          value={JSON.stringify(position.id)}
                          // disabled={position.departmentId === selectedDepartment}
                        >
                          {position.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="salary"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your salary"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="bg-zinc-300 px-6 py-4">
            <Button type="submit" disabled={loading}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;
