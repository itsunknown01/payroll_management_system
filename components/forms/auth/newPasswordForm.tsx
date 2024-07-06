"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";

import { reset } from '@/actions/auth/reset';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/schemas';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
    const [loading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      },
    });
  
    const LoginSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
      startTransition(() => {
        reset(values,token).then((data) => {
          toast.error(data.error)
          toast.success(data.success)
        });
      });
    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(LoginSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    );
}

export default NewPasswordForm
