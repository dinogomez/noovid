"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { ORDERSTATUS, OrderSchema } from "@/commons/schema";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/commons/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/commons/components/ui/select";
import { addOrder } from "@/commons/lib/actions/order";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRedo } from "react-icons/fa";
interface CourierRegistrationFormProps {
  triggerButtonLabel: string;
}

export const CourierRegisterForm = ({
  triggerButtonLabel,
}: CourierRegistrationFormProps) => {
  const [orderNumber, setOrderNumber] = useState("");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      orderNumber: orderNumber,
      orderContent: "",
      sender: "",
      recipient: "",
      isDelivered: false,
      orderStatus: "Order_Placed",
    },
  });

  function generateOrderNumber() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    setOrderNumber(result);
    form.setValue("orderNumber", result);
  }

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addOrder(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            onClick={() => {
              generateOrderNumber();
            }}
            variant="outline"
          >
            <PlusCircledIcon className="mr-2 h-4 w-4" />

            {triggerButtonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              ORDER <span className="text-primary">{orderNumber}</span>
            </DialogTitle>
            <DialogDescription>
              Add a new shipment order here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="orderNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="items-center">
                          Order #{" "}
                          <span className="text-xs bg-red-500 text-white rounded-lg p-1">
                            generated
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-row">
                            <Input
                              {...field}
                              className="rounded-r-none"
                              placeholder=""
                              disabled
                              type="text"
                            />
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                generateOrderNumber();
                              }}
                              className="rounded-l-none"
                            >
                              <FaRedo />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipient"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Recipient <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Recipient@email.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sender"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Sender <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Brand"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orderContent"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Content <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder=". . ."
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="orderStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {ORDERSTATUS.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace(/_/g, " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

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
                      Creating Shipment Order
                    </div>
                  ) : (
                    "Generate Shipment Order"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
