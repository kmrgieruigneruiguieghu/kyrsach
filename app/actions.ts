"use server"

import { revalidatePath } from "next/cache"
import { createUser, getUserByEmail, deleteUser } from "@/db/queries"

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  if (!name || !email) {
    return { error: "Заполните имя и email" };
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Этот email уже зарегистрирован" };
  }
  await createUser(name, email);
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  }).catch(() => {});
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