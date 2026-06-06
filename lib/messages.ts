import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { contactMessages } from "./schema";
import type { ContactMessage } from "./types";

type MessageRow = typeof contactMessages.$inferSelect;

function mapRow(row: MessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString()
        : String(row.createdAt),
  };
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  const rows = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
  return rows.map(mapRow);
}

export async function deleteContactMessage(id: number): Promise<boolean> {
  const rows = await db
    .delete(contactMessages)
    .where(eq(contactMessages.id, id))
    .returning({ id: contactMessages.id });
  return rows.length > 0;
}
