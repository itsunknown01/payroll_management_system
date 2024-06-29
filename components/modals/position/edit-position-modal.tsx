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
import { PositionSchema } from "@/schemas";
import { editPosition } from "@/actions/position/edit-position";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditPositionModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type == "editPosition";
  const { position, departments } = data;
  
  const form = useForm<z.infer<typeof PositionSchema>>({
    resolver: zodResolver(PositionSchema),
    defaultValues: {
      name: "",
      departmentId: "",
    },
  });

  useEffect(() => {
    if (position) {
      form.setValue("departmentId", JSON.stringify(position.departmentId));
      form.setValue("name", position.name);
    }
  }, [position, form]);

  const OnSubmit = async (values: z.infer<typeof PositionSchema>) => {
    form.reset();
    startTransition(() => {
      editPosition(values, position?.id).then((data) => {
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
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Create Position">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
          <div className="px-6 flex flex-col gap-y-2">
            <FormField
              name="departmentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departments</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your position name"
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
            <Button type="button" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default EditPositionModal;
