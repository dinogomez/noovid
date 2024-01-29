import { columns } from "@/commons/components/dashboard/table//user-table-columns";
import { UserDataTable } from "@/commons/components/dashboard/table/user-data-table";
import ErrorBoundary from "@/commons/components/error";
import { getSession } from "@/commons/lib/actions";
import { getOrders } from "@/commons/lib/actions/order";

export default async function UserOrderTable() {
  const session = await getSession();

  let orders = await getOrders(session.username);
  if (orders.error) {
    return <ErrorBoundary error={orders.error} />;
  }

  return (
    <>
      <div className="w-full space-y-2">
        <UserDataTable columns={columns} data={orders} />
      </div>
    </>
  );
}
