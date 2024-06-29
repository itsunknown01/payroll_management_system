"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PayType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { newPayroll } from "@/actions/payroll/new-payroll";
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
import { PayrollSchema } from "@/schemas";
import { editPayroll } from "@/actions/payroll/edit-payroll";

const EditPayrollModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const { payroll } = data;

  const isModalOpen = isOpen && type == "editPayroll";

  const form = useForm<z.infer<typeof PayrollSchema>>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {
      dateFrom: payroll?.From || "",
      dateTo: payroll?.To || "",
      type: payroll?.type || PayType.Monthly,
    },
  });

  useEffect(() => {
    if (payroll) {
      form.setValue("dateFrom", payroll.From);
      form.setValue("dateTo", payroll.To);
      form.setValue("type", payroll.type);
    }
  }, [form, payroll]);

  const OnSubmit = async (values: z.infer<typeof PayrollSchema>) => {
    form.reset();
    startTransition(() => {
      editPayroll(values,payroll?.id).then((data) => {
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
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Edit Payroll">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
          <div className="px-6 space-y-4">
            <FormField
              name="dateFrom"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date From</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Enter your date from"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dateTo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date To</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      placeholder="Enter your date To"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
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
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(PayType).map((type) => (
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
          <DialogFooter className="bg-zinc-300 px-6 py-4">
            <Button type="submit" disabled={loading}>
              Save
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default EditPayrollModal;
