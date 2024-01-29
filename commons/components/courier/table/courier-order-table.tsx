import ErrorBoundary from "@/commons/components/error";
import { getOrders } from "@/commons/lib/actions/order";
import { CourierDataTable } from "./courier-data-table";
import { columns } from "./courier-table-columns";

export default async function CourierOrderTable() {
  let orders = await getOrders();
  if (orders.error) {
    return <ErrorBoundary error={orders.error} />;
  }

  return (
    <>
      <div className="w-full space-y-2">
        <CourierDataTable columns={columns} data={orders} />
      </div>
    </>
  );
}
