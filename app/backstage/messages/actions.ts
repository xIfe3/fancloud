"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteContactMessage } from "@/lib/messages";

export async function deleteMessageAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (id) {
    await deleteContactMessage(id);
    revalidatePath("/backstage/messages");
  }
  redirect("/backstage/messages");
}
