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
import { PositionSchema } from "@/schemas";
import { Input } from "../../ui/input";
import { DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useTransition } from "react";
// import { newPosition } from "@/actions/position/new-position";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreatePositionModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, type,data } = useModal();

  const isModalOpen = isOpen && type == "createPosition";
  const {departments} = data

  const form = useForm<z.infer<typeof PositionSchema>>({
    resolver: zodResolver(PositionSchema),
    defaultValues: {
      name: "",
      departmentId: ""
    },
  });

  const OnSubmit = async (values: z.infer<typeof PositionSchema>) => {
    form.reset();
    startTransition(() => {
      // newPosition(values).then((data)=> {
      //   toast.error(data.error)
      //   toast.success(data.success)
      // });
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
                        <SelectItem key={department.id} value={JSON.stringify(department.id)}>
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
            <Button onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default CreatePositionModal;
