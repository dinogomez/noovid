import CourierOrderTable from "@/commons/components/courier/table/courier-order-table";
import Loading from "@/commons/components/loading";
import { Suspense } from "react";

export default async function CourierLandingPage() {
  return (
    <main className="w-full flex flex-col mt-3">
      <div className="flex  w-full">
        <Suspense fallback={<Loading />}>
          <CourierOrderTable />
        </Suspense>
      </div>
    </main>
  );
}
