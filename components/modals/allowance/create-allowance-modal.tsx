"use client";

import { newAllowance } from "@/actions/allowance/new-allowance";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal-store";
import { AllowanceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const CreateAllowanceModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type == "createAllowance";

  const form = useForm<z.infer<typeof AllowanceSchema>>({
    resolver: zodResolver(AllowanceSchema),
    defaultValues: {
      allowance: "",
      description: ""
    },
  });

  const OnSubmit = async (values: z.infer<typeof AllowanceSchema>) => {
    form.reset();
    startTransition(() => {
        newAllowance(values).then((data)=> {
          toast.error(data?.error)
          toast.success(data.success)
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
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Create Allowance">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
          <div className="px-6 space-y-4">
            <FormField
              name="allowance"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowance</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your allowance"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your description"
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

export default CreateAllowanceModal;
