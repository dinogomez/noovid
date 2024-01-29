import prisma from "@/commons/lib/db";
import { orderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function updateOrderStatus({
  newStatus,
  orderNumber,
}: {
  newStatus: orderStatus;
  orderNumber: string;
}) {
  const updateOrder = await prisma.order
    .update({
      where: {
        orderNumber: orderNumber,
      },
      data: {
        orderStatus: newStatus,
      },
    })
    .finally(() => {
      revalidatePath("/courier");
      prisma.$disconnect();
    });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { newStatus, orderNumber } = body;

  await updateOrderStatus({ newStatus, orderNumber });

  return NextResponse.json({ response: body });
}
