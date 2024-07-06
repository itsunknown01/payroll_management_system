"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { newDepartment } from "@/actions/department/new-department";
import { useModal } from "@/hooks/use-modal-store";
import { UserSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { DialogFooter } from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import Modal from "../../ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/actions/user/create-user";

const CreateUserModal = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type == "createUser";

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: UserRole.USER,
    },
  });

  const OnSubmit = async (values: z.infer<typeof UserSchema>) => {
    form.reset();
    startTransition(() => {
      createUser(values).then((data) => {
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
    <Modal isOpen={isModalOpen} onClose={handleClose} title="Create User">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
          <div className="px-6 space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(UserRole).map((type) => (
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

export default CreateUserModal;
