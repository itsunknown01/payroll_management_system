"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useModal } from "@/hooks/use-modal-store";
import { DepartmentSchema } from "@/schemas";
import { editDepartment } from "@/actions/department/edit-department";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditDepartmentModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type == "editDepartment";
  const { department } = data;

  const form = useForm<z.infer<typeof DepartmentSchema>>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (department) {
      form.setValue("name", department.name);
    }
  }, [department, form]);

  const OnSubmit = async (values: z.infer<typeof DepartmentSchema>) => {
    form.reset();
    startTransition(() => {
      editDepartment(values, department?.id).then((data) => {
        toast.error(data.error)
        toast.success(data.success)
      });
    });
    router.refresh()
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Edit Department">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
          <div className="px-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your department name"
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

export default EditDepartmentModal;
