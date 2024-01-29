"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "@/commons/components/auth/auth-card-wrapper";
import { RegisterSchema } from "@/commons/schema";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormError } from "@/commons/components/form/form-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/commons/components/ui/form";

import { FormSuccess } from "@/commons/components/form/form-success";
import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";

import { loginConfig, registerFormConfig } from "@/commons/config";
import { register } from "@/commons/lib/actions/auth";

import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper
      headerTitle={registerFormConfig.headerTitle}
      headerLabel={registerFormConfig.headerLabel}
      backButtonLabel={loginConfig.buttonLabel}
      backButtonHref={loginConfig.route}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {registerFormConfig.usernameFormLabel}{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={registerFormConfig.usernameFormPlaceholder}
                      type={registerFormConfig.usernameFormType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {registerFormConfig.emailFormLabel}{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={registerFormConfig.emailFormPlaceholder}
                      type={registerFormConfig.emailFormType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {registerFormConfig.passFormLabel}{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={registerFormConfig.passFormPlaceholder}
                      type={registerFormConfig.passFormType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <div className="flex items-center">
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3 " />
                Creating User
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
