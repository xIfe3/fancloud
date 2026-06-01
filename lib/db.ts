import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local (see .env.example).",
  );
}

declare global {
  var __fancloudPool: Pool | undefined;
}

// Reuse the connection pool across hot reloads in development.
const pool =
  globalThis.__fancloudPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalThis.__fancloudPool = pool;
}

export const db = drizzle(pool, { schema });
