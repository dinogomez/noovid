import { Badge } from "@/commons/components/ui/badge";
import { Button } from "@/commons/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/commons/components/ui/select";
import { Separator } from "@/commons/components/ui/separator";
import { getBgColorStatus } from "@/commons/lib/utils";
import { ORDERSTATUS } from "@/commons/schema";
import { orderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SelectCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const orderNumber = row.getValue("orderNumber");
  const router = useRouter();

  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (initialValue === "Delivered") {
    const sanitized = initialValue.replace(/_/g, " ");
    return (
      <Button variant="ghost" className="p-0" disabled>
        <Badge
          className={`${getBgColorStatus(
            initialValue
          )} hover:${getBgColorStatus(
            sanitized
          )}/80 inline-block p-0  text-center min-w-8`}
        >
          {sanitized}
        </Badge>
      </Button>
    );
  }

  return (
    <div className="">
      <Select
        value={value}
        onValueChange={async (newStatus: orderStatus) => {
          setValue(newStatus);
          table.options.meta?.updateData(row.index, column.id, newStatus);

          const res = await fetch("/api/order/webhook", {
            method: "POST",
            body: JSON.stringify({ newStatus, orderNumber }),
          }).then(() => {
            router.refresh;
          });
        }}
      >
        <SelectTrigger className="focus:outline-none focus:ring-0 border-0 outline-none shadow-none p-0 pr-0 justify-start">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-center">Update Status</SelectLabel>
            <Separator className="my-1" />

            {ORDERSTATUS.map((type) => (
              <SelectItem key={type} value={type}>
                <Badge
                  className={`${getBgColorStatus(
                    type.replace(/_/g, " ")
                  )} hover:${getBgColorStatus(
                    type.replace(/_/g, " ")
                  )}/80 inline-block p-0 w-full text-center min-w-8`}
                >
                  {type.replace(/_/g, " ")}
                </Badge>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCell;
