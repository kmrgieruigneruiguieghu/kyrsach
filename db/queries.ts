import { db } from "./db"
import { users } from "./schema"
import { eq, desc } from "drizzle-orm"

export async function createUser(name: string, email: string) {
  return db.insert(users).values({ name, email }).returning();
}

export async function deleteUser(userId: number) {
  return db.delete(users).where(eq(users.id, userId));
}

export async function getAllUsers() {
  const result = await db.select().from(users).orderBy(desc(users.registeredAt));
  return result;
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
}

// export async function getUserByEmail(email: string) {
//   const result = await db.select().from(users).where(eq(users.email, email));
//   return result[0];
// }