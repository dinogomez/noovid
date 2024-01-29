import { updateOrderStatus } from "@/commons/lib/actions/order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { newStatus, orderNumber } = body;

  await updateOrderStatus({ newStatus, orderNumber });

  return NextResponse.json({ response: body });
}
