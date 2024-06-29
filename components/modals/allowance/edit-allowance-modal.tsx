"use client";

import { editAllowance } from "@/actions/allowance/edit-allowance";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal-store";
import { AllowanceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const EditAllowanceModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, type, onClose,data } = useModal();

  const isModalOpen = isOpen && type == "editAllowance";
  const {allowance} = data

  const form = useForm<z.infer<typeof AllowanceSchema>>({
    resolver: zodResolver(AllowanceSchema),
    defaultValues: {
      allowance: "",
      description: ""
    },
  });

  useEffect(()=>{
    if(allowance) {
      form.setValue("allowance", allowance.allowance)
      form.setValue("description", allowance.description)
    }
  },[form,allowance])

  const OnSubmit = async (values: z.infer<typeof AllowanceSchema>) => {
    form.reset();
    startTransition(() => {
        editAllowance(values,allowance?.id).then((data)=> {
          toast.error(data.error)
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
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Edit Allowance">
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
              Update
            </Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default EditAllowanceModal;
