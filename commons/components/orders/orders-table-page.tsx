import { Payment, columns } from "./orders-columns";
import { DataTable } from "./orders-data-tables";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function OrdersTable() {
  const data = await getData();

  return (
    <div className=" w-full mx-auto ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
