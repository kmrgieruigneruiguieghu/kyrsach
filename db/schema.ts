import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  registeredAt: integer("registered_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Таблица бонусов (промокоды)
export const bonuses = sqliteTable("bonuses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  code: text("code").notNull().unique(),
  isUsed: integer("is_used").default(0),
});

// Таблица уведомлений
export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(), // welcome, launch, reminder
  sentAt: text("sent_at").default("CURRENT_TIMESTAMP"),
  status: text("status").default("pending"),
});