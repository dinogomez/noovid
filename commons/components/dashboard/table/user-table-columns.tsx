"use client";

import ToggleCell from "@/commons/components/dashboard/table/user-toggle-cell";
import { Badge } from "@/commons/components/ui/badge";
import { DataTableColumnHeader } from "@/commons/components/ui/data-table/data-table-column-header";
import { getBgColorStatus } from "@/commons/lib/utils";
import { OrderSchema } from "@/commons/schema";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";
import { Button } from "../../ui/button";

export const columns: ColumnDef<z.infer<typeof OrderSchema>>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "sender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-medium">
          {row.getValue("sender")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderContent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="ml-4"
        column={column}
        title="Order Status"
      />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("orderStatus");
      const sanitized = value.replace(/_/g, " ");
      return (
        <Badge
          className={`${getBgColorStatus(sanitized)} hover:${getBgColorStatus(
            sanitized
          )}/80 inline-block p-0  text-center min-w-8`}
        >
          {sanitized}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateCreated"));
      const formatted = date.toLocaleString();
      return (
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-3 w-3" />
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "isDelivered",
    header: "Recieved",
    cell: ({ row }) => {
      const value: "Yes" | "No" = row.getValue("isDelivered");
      if (value === "Yes") {
        return (
          <Button className="p-0" variant="ghost" disabled>
            <Badge className="inline-block p-0 min-w-4">{value}</Badge>
          </Button>
        );
      }
      return (
        <Button className="p-0" variant="ghost">
          <Badge className="inline-block p-0 min-w-4">{value}</Badge>
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ToggleCell,
  },
];
