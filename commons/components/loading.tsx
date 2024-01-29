import { Skeleton } from "@/commons/components/ui/skeleton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Skeleton className="h-72 w-full items-center justify-center flex">
      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3 " />
      Loading Orders
    </Skeleton>
  );
}
