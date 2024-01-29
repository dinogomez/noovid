"use server";
import prisma from "@/commons/lib/db";
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "@/commons/lib/session";
import { LoginSchema, RegisterSchema } from "@/commons/schema";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function getSession(search = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
    session.email = defaultSession.email;
  }

  return session;
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields 😓" };
  }
  const { email, password } = validatedFields.data;
  try {
    const existingUser = await prisma.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });
    if (!existingUser) {
      return { error: "User not found 🧐" };
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return { error: "Invalid Credentials 😥" };
    }

    const session = await getSession();

    session.username = existingUser.username;
    session.email = existingUser.email;
    session.isLoggedIn = true;

    await session.save();

    return { success: "Login Successful 🫡" };
  } catch (e) {
    return { error: "Something went wrong 🤔" };
  }
};
export async function logout() {
  const session = await getSession(false);
  session.destroy();
  redirect("/");
}
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields 😣" };
  }

  const { username, password, email } = validatedFields.data;

  try {
    const existingUser = await prisma.user
      .findFirst({
        where: {
          OR: [{ username: username }, { email: email }],
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });

    if (existingUser) {
      if (existingUser.username === username) {
        return { error: "Username is already taken 🧐" };
      } else {
        return { error: "Email is already taken 🧐" };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user
      .create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });

    return { success: "User Added 🫡" };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: "PRISMA ERROR 🤖" };
    }
    return { error: "Something went wrong 😥" };
  }
};
