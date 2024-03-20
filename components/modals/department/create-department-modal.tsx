"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useModal } from "@/hooks/use-modal-store";
import Modal from "../../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { DepartmentSchema } from "@/schemas";
import { Input } from "../../ui/input";
import { DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useTransition } from "react";
import { newDepartment } from "@/actions/department/new-department";

const CreateDepartmentModal = () => {
  const [loading, startTransition] = useTransition();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type == "createDepartment";

  const form = useForm<z.infer<typeof DepartmentSchema>>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: "",
    },
  });

  const OnSubmit = async (values: z.infer<typeof DepartmentSchema>) => {
    form.reset()
    startTransition(() => {
      newDepartment(values);
      onClose();
    })
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Create Department">
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
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default CreateDepartmentModal;
