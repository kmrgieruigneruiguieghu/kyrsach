"use server"

import { db } from "@/db/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { deleteUser } from "@/db/queries"

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Заполните имя и email" };
  }

  // const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
  const existingUser = await db.select().from(users).where(eq(users.email, email));

  if (existingUser) {
    return { error: "Этот email уже зарегистрирован" };
  }

  await db.insert(users).values({ name, email });

  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}

export async function deleteUserAction(formData: FormData) {
  
  const id = Number(formData.get("id"));
  
  if (!id) {
    return { error: "ID пользователя не указан" };
  }
  
  await deleteUser(id);
  revalidatePath("/admin");
  
  return { success: true };
}