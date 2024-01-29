"use server";
import prisma from "@/commons/lib/db";
import { OrderSchema } from "@/commons/schema";
import { Prisma, orderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

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
      prisma.$disconnect();
    });
  revalidatePath("/courier");
}

export const addOrder = async (values: z.infer<typeof OrderSchema>) => {
  const validatedFields = OrderSchema.safeParse(values);

  let existingUser: Prisma.UserCreateInput;

  if (!validatedFields.success) {
    return { error: "Invalid Fields 😵‍💫" };
  }

  const {
    orderNumber,
    recipient,
    sender,
    orderContent,
    orderStatus,
    isDelivered,
  } = validatedFields.data;

  try {
    const existingOrder = await prisma.order
      .findFirst({
        where: {
          orderNumber: orderNumber,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });

    if (existingOrder) {
      return { error: "Order # already exist 😥" };
    }

    existingUser = await prisma.user
      .findFirst({
        where: {
          email: recipient,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });

    if (!existingUser) {
      return { error: `Recipient does not exist, Try again. 🧐` };
    }

    await prisma.order
      .create({
        data: {
          orderNumber: orderNumber,
          recepient: existingUser.id,
          sender: sender,
          orderContent: orderContent,
          orderStatus: orderStatus,
          isDelivered: false,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });
    revalidatePath("/courier");
    return { success: `Order ${orderNumber} Created 👌` };
  } catch (e) {
    return { error: `Something went wrong 🤔` };
  }
};

export async function updateIsDelivered(formData: FormData) {
  const orderNumber = formData.get("orderNumber") as string;
  try {
    const updateOrder = await prisma.order
      .update({
        where: {
          orderNumber: orderNumber,
          orderStatus: "Delivered",
        },
        data: {
          isDelivered: true,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });
    revalidatePath("/courier");
    return { success: `Recieved ORDER ${orderNumber} 🫡` };
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2025") {
        return { error: `ORDER ${orderNumber}, hasn't been delivered yet 🤔 ` };
      }
    }
    return {
      error: `Failed to recieve ORDER ${orderNumber} 🤔 `,
    };
  }
}

export const getOrders = async (username?: string) => {
  try {
    const orders = await prisma.order
      .findMany({
        include: {
          User: true,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });
    let filteredOrders = orders;
    if (username) {
      filteredOrders = orders.filter(
        (order: { User: { username: string } }) =>
          order.User.username === username
      );
    }
    const formattedOrders = filteredOrders.map((order: any) => {
      return {
        id: order.id,
        created_at: order.created_at,
        orderNumber: order.orderNumber,
        sender: order.sender,
        isDelivered: order.isDelivered ? "Yes" : "No",
        recepient: order.recepient,
        orderStatus: order.orderStatus,
        orderContent: order.orderContent,
        dateCreated: order.created_at,
        username: order.User.username,
      };
    });
    revalidatePath("/courier");
    return formattedOrders;
  } catch (e) {
    return { error: `DEBUG: ${e}` };
  }
};
