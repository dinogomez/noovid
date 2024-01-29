"use client";

import { CardWrapper } from "@/commons/components/auth/auth-card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormError } from "@/commons/components/form/form-error";
import { FormSuccess } from "@/commons/components/form/form-success";
import { Button } from "@/commons/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/commons/components/ui/form";
import { Input } from "@/commons/components/ui/input";
import { loginFormConfig, registerConfig, siteConfig } from "@/commons/config";
import { login } from "@/commons/lib/actions/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/commons/lib/routes";
import { LoginSchema } from "@/commons/schema";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
          if (data.success !== undefined) {
            setTimeout(() => {
              router.push(DEFAULT_LOGIN_REDIRECT);
            }, 500);
          }
        }
      });
    });
  };

  return (
    <CardWrapper
      headerTitle={siteConfig.title}
      headerLabel={siteConfig.desc}
      backButtonLabel={registerConfig.buttonLabel}
      backButtonHref={registerConfig.route}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{loginFormConfig.emailFormLabel}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={loginFormConfig.emailFormPlaceholder}
                      type={loginFormConfig.emailFormType}
                      autoComplete="nope"
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
                  <FormLabel>{loginFormConfig.passFormLabel}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="leading-tight text-2xl"
                      disabled={isPending}
                      placeholder={loginFormConfig.passFormPlaceholder}
                      type={loginFormConfig.passFormType}
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
                Processing
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
