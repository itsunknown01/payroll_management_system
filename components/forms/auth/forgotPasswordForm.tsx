"use client"

import React, { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ForgotPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { forgot } from '@/actions/auth/forgot';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
    const [loading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
      resolver: zodResolver(ForgotPasswordSchema),
      defaultValues: {
        email: "",
      },
    });
  
    const LoginSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
      startTransition(() => {
        forgot(values).then((data) => {
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
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
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
            Find Account
          </Button>
        </form>
      </Form>
    );
}

export default ForgotPasswordForm
