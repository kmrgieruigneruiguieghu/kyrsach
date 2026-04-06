// import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
// import { sql } from "drizzle-orm"

// export const users = sqliteTable("users", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   registeredAt: integer("registered_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
// });

import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  registeredAt: timestamp("registered_at").defaultNow(),
});