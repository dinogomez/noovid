import { Badge } from "@/commons/components/ui/badge";
import { Button } from "@/commons/components/ui/button";
import { updateIsDelivered } from "@/commons/lib/actions/order";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

const ToggleCell = ({ row }: any) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      updateIsDelivered(formData).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  const value: "Yes" | "No" = row.getValue("isDelivered");
  if (value === "Yes") {
    return (
      <Button className="p-0 " variant="ghost" disabled>
        <Badge variant="success" className=" inline-block py-1 min-w-6">
          Recieved
        </Badge>
      </Button>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="hidden"
        name="orderNumber"
        value={row.original.orderNumber}
      />
      <Button className="p-0 w-24" variant="ghost" disabled={isPending}>
        <Badge
          variant="warn"
          className="py-1 min-w-5 w-full flex items-center justify-center shadow-lg"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin h-3 w-3" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              Recieve Order
            </div>
          )}
        </Badge>
      </Button>
    </form>
  );
};

export default ToggleCell;
