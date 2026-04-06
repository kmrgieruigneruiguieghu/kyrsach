// import Database from "better-sqlite3"
// import { drizzle } from "drizzle-orm/better-sqlite3"

// const sqlite = new Database("sqlite.db");

// export const db = drizzle(sqlite);

import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);