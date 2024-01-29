import UserOrderTable from "@/commons/components/dashboard/table/user-order-table";
import Loading from "@/commons/components/loading";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main className="w-full flex flex-col mt-3">
      <div className="flex flex-col space-y-2  w-full">
        <Suspense fallback={<Loading />}>
          <UserOrderTable />
        </Suspense>
      </div>
    </main>
  );
}
