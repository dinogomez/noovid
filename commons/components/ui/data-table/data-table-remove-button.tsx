"use client";
import { Button } from "@/commons/components/ui/button";
import { deleteOrders } from "@/commons/lib/actions/order";
import { TrashIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

interface DataTableRemoveButtonProps {
  rows: Row<any>[];
}

export default function DataTableRemoveButton({
  rows,
}: DataTableRemoveButtonProps) {
  const [isPending, startTransition] = useTransition();
  const orderNumbersArray = rows.map((row) => row.original.orderNumber);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      if (orderNumbersArray.length > 0) {
        deleteOrders(formData).then((data) => {
          if (data.success) {
            toast.info(data.success);
          }
          if (data.error) {
            toast.error(data.error);
          }
        });
      } else {
        toast.error("No Rows Selected");
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="hidden"
        name="rowData"
        value={JSON.stringify(orderNumbersArray)}
      />
      {isPending ? (
        <Button size="sm" variant="outline" disabled>
          <AiOutlineLoading3Quarters className="animate-spin h-3 w-3 mr-2" />
          Removing
        </Button>
      ) : (
        <Button size="sm" variant="outline">
          <TrashIcon className="mr-2 h-4 w-4" />
          Remove
        </Button>
      )}
    </form>
  );
}
